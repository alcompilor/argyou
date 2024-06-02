import User from "../models/usersModel.js";
import bcrypt from "bcrypt";
import ResponseData from "../classes/ResponseData.js";
import ErrorResponse from "../classes/ErrorResponse.js";
import { generateAuthToken } from "../utils/generateAuthToken.js";

export async function signIn(req, res, next) {
    try {
        const { email, password, clientTime } = req.body;
        const user = await User.findOne({ email }).select(
            "password username isAdmin",
        );

        if (!user) {
            return res
                .status(404)
                .json(
                    new ResponseData(
                        "Authentication failed. User not found.",
                        404,
                    ),
                );
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res
                .status(401)
                .json(
                    new ResponseData(
                        "Authentication failed. Invalid password.",
                        401,
                    ),
                );
        }

        const { token, cookieOpts } = generateAuthToken(clientTime, user);

        res.cookie("access_token", token, cookieOpts);
        res.cookie("auth", user.username, cookieOpts);

        res.status(200).json(new ResponseData("Logged in successfully", 200));
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}
