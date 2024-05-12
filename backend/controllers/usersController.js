import ErrorResponse from "../classes/ErrorResponse.js";
import ResponseData from "../classes/ResponseData.js";
import User from "../models/usersModel.js";

export const createUser = async (req, res, next) => {
    try {
        const { fullName, username, email, birthDate, password, gender } =
            req.body;
        const newUser = new User({
            fullName,
            username,
            email,
            birthDate,
            password,
            gender,
        });

        if (req.file) {
            newUser.avatar = {
                buffer: req.file.buffer,
                mime: req.file.mimetype,
            };
        }

        await newUser.save();

        res.status(201).json(new ResponseData("User created", 201, newUser));
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        let user;

        if (req.decodedToken.username === username) {
            user = await User.findOne({ username }).select("-password");
        } else {
            user = await User.findOne({ username }).select(
                "-password -email -isAdmin -notifications -owner",
            );
        }

        if (!user) {
            return res
                .status(404)
                .json(new ResponseData("User not found", 404));
        }

        res.status(200).json(new ResponseData("User fetched", 200, user));
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { fullName, username, email, birthDate, password, gender } =
            req.body;

        const user = await User.findOneAndUpdate(
            { username: req.params.username },
            {
                fullName,
                username,
                email,
                birthDate,
                password,
                gender,
                avatar: req.file
                    ? {
                          buffer: req.file.buffer,
                          mime: req.file.mimetype,
                      }
                    : undefined,
            },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!user) {
            return res
                .status(404)
                .json(new ResponseData("User not found", 404));
        }
        res.status(200).json(new ResponseData("User updated", 200, user));
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOneAndDelete({ username });

        if (!user) {
            return res
                .status(404)
                .json(new ResponseData("User not found", 404));
        }
        res.status(200).json(new ResponseData("User deleted", 200));
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const getUserDebates = async (req, res, next) => {
    try {
        const { username } = req.params;
        const { debates } = await User.findOne({ username }).select("debates");

        if (!debates.length) {
            return res
                .status(404)
                .json(new ResponseData("No debates were found", 404));
        }

        res.status(200).json(
            new ResponseData("User Debates fetched", 200, debates),
        );
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const pushNotification = async (req, res, next) => {
    try {
        const { title } = req.body;
        const username = req.decodedToken.username;

        let user = await User.findOne({ username });

        user.notifications.push({ title });
        user = await user.save();

        res.status(200).json(
            new ResponseData("Notification pushed", 200, title),
        );
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};
