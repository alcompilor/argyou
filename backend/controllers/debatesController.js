import ErrorResponse from "../classes/ErrorResponse.js";
import ResponseData from "../classes/ResponseData.js";
import Debate from "../models/debatesModel.js";

export const getAllDebates = async (_, res, next) => {
    try {
        const debates = await Debate.find({});

        if (debates.length === 0) {
            return res
                .status(404)
                .json(new ResponseData("No debates were found", 404));
        }
        res.status(200).json(new ResponseData("Debates fetched", 200, debates));
    } catch (error) {
        next(new ErrorResponse(error.message, 500));
    }
};

export const createDebate = async (req, res, next) => {
    try {
        const { title, startTime, questions } = req.body;
        const creatorUsername = req.decodedToken.username;

        const newDebate = new Debate({
            title,
            creatorUsername,
            startTime,
            questions,
        });

        if (req.file) {
            newDebate.thumbnail = {
                buffer: req.file.buffer,
                mime: req.file.mimetype,
            };
        }

        await newDebate.save();

        res.status(200).json(
            new ResponseData("Debate created", 200, newDebate),
        );
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const getDebate = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const debate = await Debate.findById(_id);

        if (!debate) {
            return res
                .status(404)
                .json(new ResponseData("Debate not found", 404));
        }

        res.status(200).json(new ResponseData("Debate fetched", 200, debate));
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const deleteDebate = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const result = await Debate.deleteOne({ _id: _id });

        if (result.deletedCount === 0) {
            return res
                .status(404)
                .json(new ResponseData("Debate not found", 404));
        }

        res.status(200).json(new ResponseData("Debate deleted", 200));
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const updateDebate = async (req, res, next) => {
    try {
        const {
            title,
            creatorUsername,
            startTime,
            questions,
            status,
            messages,
            comments,
        } = req.body;
        const { _id } = req.params;

        const debate = await Debate.findOneAndUpdate(
            { _id: _id },
            {
                title,
                creatorUsername,
                startTime,
                thumbnail: req.file
                    ? {
                          buffer: req.file.buffer,
                          mime: req.file.mimetype,
                      }
                    : undefined,
                questions,
                status,
                messages,
                comments,
            },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!debate) {
            return res
                .status(404)
                .json(
                    new ResponseData("Debate update failed (not found)", 404),
                );
        }
        res.status(200).json(new ResponseData("Debate updated", 200, debate));
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const addOpponent = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const username = req.decodedToken.username;

        const debate = await Debate.findById(_id);
        if (!debate) {
            return res
                .status(404)
                .json(new ResponseData("Debate not found", 404));
        }

        debate.opponentUsername = username;
        debate = await debate.save();

        res.status(200).json(
            new ResponseData(
                "New opponent has successfully joined the debate",
                200,
            ),
        );
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

export const addComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        const { _id } = req.params;

        const username = req.decodedToken.username;

        let debate = await Debate.findById(_id);
        if (!debate) {
            return res
                .status(404)
                .json(new ResponseData("Debate not found", 404));
        }

        debate.comments.push({ content, username });
        debate = await debate.save();

        res.status(200).json(new ResponseData("Comment added", 200, content));
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};
