import express from "express";
import http from "http";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { mountDB, unmountDB } from "./utils/dbConnection.js";
import { Server } from "socket.io";
import usersRouter from './routers/users.js';
import authRouter from "./routers/authRouter.js";
dotenv.config();

const app = express();

const EXPRESS_PORT = 3000;
const server = http.createServer(express());
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
mountDB();

// Assign middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// Here should routers be used:
// ex: server.use("/debates", debatesRouter);
app.use("/api/v1/users", usersRouter);
app.use('/api/v1/auth', authRouter);

server.listen(EXPRESS_PORT, (err) => {
    err
        ? console.error("Failed to run server..")
        : console.log(`Server running at port ${EXPRESS_PORT}..`);
});

process.on('SIGINT', async () => {
    await unmountDB();
    process.exit(0);
});