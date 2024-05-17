import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ResponseData from "../classes/ResponseData.js";
import ErrorResponse from "../classes/ErrorResponse.js";

export async function signIn(req, res, next) {
    try {
        const { email, password } = req.body;
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

        const token = jwt.sign(
            { username: user.username, isAdmin: user.isAdmin ? true : false },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 6 * 60 * 60 * 1000, // 6 hours
        });

        res.cookie("auth", user.username, {
            sameSite: "none",
            secure: true,
            maxAge: 6 * 60 * 60 * 1000,
        });

        res.status(200).json(new ResponseData("Logged in successfully", 200));
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
}
