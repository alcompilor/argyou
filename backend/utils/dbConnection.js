import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mountDB = async () => {
    try {
        const { MONGODB_URL } = process.env;

        if (mongoose.connection.readyState !== 1) {
            const connection = await mongoose.connect(MONGODB_URL);
            console.log("MongoDB connected successfully");
            return connection;
        } else {
            console.log("MongoDB is already connected");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export const unmountDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();

            console.log("MongoDB connection closed successfully");
        } else {
            console.warn(
                "MongoDB connection already closed or not established",
            );
        }
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
    }
};
