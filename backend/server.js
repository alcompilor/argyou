// Import necessary libraries and modules
import express from "express";
import mongoose from 'mongoose';
import helmet from "helmet";
import dotenv from "dotenv";
import userRoutes from './routers/users';
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
server.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

server.listen(EXPRESS_PORT, (err) => {
    err
        ? console.error("Failed to run server..")
        : console.log(`Server running at port ${EXPRESS_PORT}..`);
});

process.on('SIGINT', async () => {
    await unmountDB();
    process.exit(0);
});

server.use(express.json()); // Middleware for parsing JSON 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));
