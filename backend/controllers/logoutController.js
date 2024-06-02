import ErrorResponse from "../classes/ErrorResponse.js";
import ResponseData from "../classes/ResponseData.js";

const logout = (_, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            partitioned: true,
        });

        res.clearCookie("auth", {
            sameSite: "none",
            secure: true,
            partitioned: true,
        });

        res.status(200).json(new ResponseData("Logged out successfully", 200));
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
};

export default logout;
