import jwt from "jsonwebtoken";

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
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: expiresIn * 1000, // ms
    };

    return { token, cookieOpts };
}