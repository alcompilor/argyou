import url from "url";
import { WebSocketServer } from "ws";
import { verifyJwt } from "./utils/ws/verifyJwt.js";
import { isDebater } from "./utils/ws/isDebater.js";
import { broadcastMessage } from "./utils/ws/broadcastMessage.js";
import { sendAndClose } from "./utils/ws/sendAndClose.js";
import { saveMessageInDB } from "./utils/ws/saveMessageInDB.js";
import Debate from "./models/debatesModel.js";
import { mountDB, unmountDB } from "./utils/dbConnection.js";
import { UpdateTurn } from "./utils/ws/updateTurn.js";
import { EndDebate, StartDebate } from "./utils/ws/startAndEndDebate.js";

const PORT = 3001;
const wss = new WebSocketServer({ port: PORT });

const activeConnections = new Map();
const debateLocks = new Set();
let debateStarted = false;
mountDB();

wss.on("connection", async (ws, req) => {
  const parsedUrl = url.parse(req.url, true);
  const token = parsedUrl.query.token;
  const roomId = parsedUrl.query.room;

  if (!token || !roomId) {
    return sendAndClose(ws, "No token or room ID provided", true);
  }

  const payload = verifyJwt(token);
  if (!payload) {
    return sendAndClose(ws, "Not authenticated", true);
  }

  let debate;
  try {
    debate = await Debate.findOne({ _id: roomId });
    if (!debate) {
      return sendAndClose(
        ws,
        "The debate you're trying to join does not exist",
        true
      );
    }
  } catch (error) {
    return sendAndClose(ws, `Error finding debate: ${error.message}`, true);
  }

  const startDefaultTime = new Date(debate.startTime);
  startDefaultTime.setHours(startDefaultTime.getHours() - 2);
  const startTime = startDefaultTime.getTime();

  const questions = debate.questions;
  let questionIndex = 0;

  const endTime = new Date(debate.endTime).getTime();
  const now = Date.now();

  if (startTime > now) {
    return sendAndClose(
      ws,
      JSON.stringify("The debate has not started yet"),
      true
    );
  }

  if (endTime < now) {
    return sendAndClose(
      ws,
      JSON.stringify("The debate has already ended"),
      true
    );
  }

  if (debate.status === "Ended") {
    return sendAndClose(ws, JSON.stringify("Debate Ended"), true);
  }

  const getReady = async () => {
    try {
      debate = await Debate.findOne({ _id: roomId });
      if (
        !debate.readyDebaters.includes(debate.creatorUsername) ||
        !debate.readyDebaters.includes(debate.opponentUsername)
      ) {
        setTimeout(getReady, 100);
        return;
      }
      startDebate();
    } catch (error) {
      console.error(error);
    }
  };

  getReady();

  if (!activeConnections.has(roomId)) {
    activeConnections.set(roomId, new Set());
  }
  activeConnections.get(roomId).add(ws);

  const startDebate = () => {
    if (debateLocks.has(roomId)) {
      return;
    }
    debateLocks.add(roomId);
    if (!debateStarted) {
      StartDebate(debate);
      debateStarted = true;
    }

    const getTurn = async () => {
      if (!debateStarted) {
        return;
      }

      const currentTime = Date.now();
      const timeElapsed = currentTime - startTime;
      const phaseDuration = 10000;
      const totalPhaseTime = phaseDuration * 3;
      const phaseIndex = Math.floor(timeElapsed / totalPhaseTime);
  
      let creator = false;
      let opponent = false;
      let openChat = false;
  
      console.log("Question index: ", questionIndex);
      console.log("Question: ", questions.length);
      if (questionIndex >= questions.length) {
        EndDebate(debate);
        debateLocks.delete(roomId);
        return;
      }
  
      try {
        if (phaseIndex % 3 === 0) {
          if (!creator) {
            creator = true;
            opponent = false;
            openChat = false;
            await UpdateTurn("creator", questions[questionIndex], debate);
          }
        } else if (phaseIndex % 3 === 1) {
          if (!opponent) {
            creator = false;
            opponent = true;
            openChat = false;
            await UpdateTurn("opponent", questions[questionIndex], debate);
          }
        } else {
          if (!openChat) {
            creator = false;
            opponent = false;
            openChat = true;
            await UpdateTurn("Open Chat", questions[questionIndex], debate);
            questionIndex++;
          }
        }
      } catch (error) {
        console.error(`Error during turn update: ${error}`);
      }
  
      const nextTurnTime = startTime + (phaseIndex + 1) * totalPhaseTime;
      const delay = nextTurnTime - currentTime;
      setTimeout(getTurn, delay);
    };
  
    setTimeout(getTurn, 0);
  }

  ws.on("message", async (message, isBinary) => {
    console.log(`Received message: ${message}`);

    try {
      if (isDebater(payload.username, debate)) {
        broadcastMessage(ws, roomId, message, isBinary, activeConnections);
        saveMessageInDB(payload.username, message, isBinary, debate);
      } else {
        ws.send("You are not allowed to participate in the debate", true);
      }
    } catch (error) {
      console.error(`Error handling message: ${error}`);
    }
  });

  ws.on("close", () => {
    const connections = activeConnections.get(roomId);
    if (connections) {
      connections.delete(ws);
      if (connections.size === 0) {
        activeConnections.delete(roomId);
      }
    }
  });
});

process.on("SIGINT", async () => {
  await unmountDB();
  process.exit(0);
});
