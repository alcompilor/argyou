import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { mountDB, unmountDB } from "./utils/dbConnection.js";
import usersRouter from "./routers/usersRouter.js";
import authRouter from "./routers/authRouter.js";
import debateRouter from "./routers/debatesRouter.js";
dotenv.config();

const EXPRESS_PORT = 3000;
const server = express();
mountDB();

// Assign middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(helmet());

// Here should routers be used:
// ex: server.use("/debates", debatesRouter);
server.use("/api/v1/users", usersRouter);
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/debates", debateRouter);

server.listen(EXPRESS_PORT, (err) => {
    err
        ? console.error("Failed to run server..")
        : console.log(`Server running at port ${EXPRESS_PORT}..`);
});

process.on('SIGINT', async () => {
    await unmountDB();
    process.exit(0);
});