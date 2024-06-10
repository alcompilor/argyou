import ErrorResponse from "../classes/ErrorResponse.js";
import ResponseData from "../classes/ResponseData.js";
import dotenv from "dotenv";

const logout = (_, res, next) => {
    try {
        res.clearCookie("access_token", {
            sameSite: "none",
            secure: true,
            partitioned: true,
            domain: process.env.COOKIE_DOMAIN
        });

        res.clearCookie("auth", {
            sameSite: "none",
            secure: true,
            partitioned: true,
            domain: process.env.COOKIE_DOMAIN
        });

        res.status(200).json(new ResponseData("Logged out successfully", 200));
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
};

export default logout;
