import express from "express";
import {
    getAllDebates,
    getDebate,
    createDebate,
    updateDebate,
    deleteDebate,
    addComment,
    addOpponent,
} from "../controllers/debatesController.js";
import hasPermission from "../middlewares/hasPermission.js";
import isAuth from "../middlewares/isAuth.js";
import multer from "multer";
import { validateImage } from "../middlewares/validateImage.js";

const debatesRouter = express.Router();
const upload = multer();

const DEBATES_COLLECTION = "debates";
const FIELD_NAME = "_id";

const IMAGE_NAME = "thumbnail";
const IMAGE_SIZE = 2;

debatesRouter
    .route("/")
    .get(isAuth, getAllDebates)
    .post(
        isAuth,
        upload.single(IMAGE_NAME),
        validateImage(IMAGE_SIZE),
        createDebate,
    );

debatesRouter
    .route("/:_id")
    .get(isAuth, getDebate)
    .delete(isAuth, hasPermission(DEBATES_COLLECTION, FIELD_NAME), deleteDebate)
    .patch(
        isAuth,
        hasPermission(DEBATES_COLLECTION, FIELD_NAME),
        upload.single(IMAGE_NAME),
        validateImage(IMAGE_SIZE),
        updateDebate,
    );

debatesRouter.route("/:_id/comments").patch(isAuth, addComment);
debatesRouter.route("/:_id/opponent").patch(isAuth, addOpponent);

export default debatesRouter;
