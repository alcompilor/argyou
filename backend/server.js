import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { mountDB, unmountDB } from "./utils/dbConnection.js";
import usersRouter from "./routers/usersRouter.js";
import signInRouter from "./routers/signInRouter.js";
import debatesRouter from "./routers/debatesRouter.js";
import logoutRouter from "./routers/logoutRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();

const EXPRESS_PORT = 3000;
const server = express();
mountDB();

// Assign middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(helmet());
server.use(
    cors({
        origin: ["https://192.168.0.59:5173", "http://localhost:5173"],
        credentials: true,
    }),
);

// Here should routers be used:
// ex: server.use("/debates", debatesRouter);
server.use("/api/v1/users", usersRouter);
server.use("/api/v1/auth", signInRouter);
server.use("/api/v1/debates", debatesRouter);
server.use("/api/v1/logout", logoutRouter);

server.use(errorHandler);

server.listen(EXPRESS_PORT, (err) => {
    err
        ? console.error("Failed to run server..")
        : console.log(`Server running at port ${EXPRESS_PORT}..`);
});

process.on("SIGINT", async () => {
    await unmountDB();
    process.exit(0);
});
