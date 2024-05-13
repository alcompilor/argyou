import url from "url";
import querystring from "querystring";
import { WebSocketServer } from "ws";
import { verifyJwt } from "./utils/ws/verifyJwt.js";
import { isDebater } from "./utils/ws/isDebater.js";
import { broadcastMessage } from "./utils/ws/broadcastMessage.js";
import { sendAndClose } from "./utils/ws/sendAndClose.js";
import { saveMessageInDB } from "./utils/ws/saveMessageInDB.js";
import Debate from "./models/debatesModel.js";
import { mountDB, unmountDB } from "./utils/dbConnection.js";

const PORT = 3001;
const wss = new WebSocketServer({ port: PORT });

const activeConnections = new Map();
mountDB();

wss.on("connection", async (ws, req) => {
    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);

    const token = parsedQuery.token;
    const roomId = parsedQuery.room;

    const payload = verifyJwt(token);

    if (!payload) {
        return sendAndClose(ws, "Not authenticated");
    }

    if (!roomId) {
        return sendAndClose(ws, "No debate room ID provided");
    }

    let debate;
    try {
        debate = await Debate.findOne({ _id: roomId });

        if (!debate) {
            return sendAndClose(
                ws,
                "The debate you're trying to join does not exist",
            );
        }
    } catch (error) {
        return sendAndClose(ws, "Error finding debate: " + error.message);
    }

    if (debate.startTime > Date.now()) {
        return sendAndClose(ws, "The debate has not started yet");
    }

    if (debate.endTime < Date.now()) {
        return sendAndClose(ws, "The debate has already ended");
    }

    if (!activeConnections.has(roomId)) {
        activeConnections.set(roomId, new Set());
    }
    activeConnections.get(roomId).add(ws);

    ws.on("message", async (message, isBinary) => {
        try {
            if (isDebater(payload.username, debate)) {
                broadcastMessage(
                    ws,
                    roomId,
                    message,
                    isBinary,
                    activeConnections,
                );
                saveMessageInDB(payload.username, message, isBinary, debate);
            } else {
                ws.send("You are not allowed to participate in the debate");
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
