import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { mountDB, unmountDB } from "./utils/dbConnection.js";
dotenv.config();

const EXPRESS_PORT = 3000;
const server = express();
mountDB();

// Assign middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(helmet());

// Here should routers be used:
// ex: server.use("/debates", debatesRouter);

server.listen(EXPRESS_PORT, (err) => {
    err
        ? console.error("Failed to run server..")
        : console.log(`Server running at port ${EXPRESS_PORT}..`);
});

process.on('SIGINT', async () => {
    await unmountDB();
    process.exit(0);
});