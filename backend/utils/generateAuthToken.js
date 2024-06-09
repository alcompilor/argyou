import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAuthToken = (clientTime, user) => {
    clientTime = new Date(clientTime);
    const now = new Date();
    const diffInSeconds = Math.abs(now - clientTime) / 1000;
    const expiresIn = diffInSeconds + (8 * 60 * 60); // add 8 hours

    const token = jwt.sign(
        { username: user.username, isAdmin: user.isAdmin ? true : false },
        process.env.SECRET_KEY,
        { expiresIn: `${expiresIn}s` },
    );

    const cookieOpts = {
        sameSite: "none",
        secure: true,
        maxAge: expiresIn * 1000, // ms
        partitioned: true,
        domain: `${process.env.COOKIE_DOMAIN}`
    };

    return { token, cookieOpts };
}