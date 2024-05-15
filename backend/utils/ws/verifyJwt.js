import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyJwt = (token) => {
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        return payload;
    } catch {
        return false;
    }
};
