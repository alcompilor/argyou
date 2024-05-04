import express from "express";
import { 
    getAllDebates, 
    getDebate, 
    createDebate, 
    updateDebate, 
    deleteDebate, 
    addComment
} from "../controllers/debatesController.js";
import hasPermission from "../middlewares/hasPermission.js";
import isAuth from "../middlewares/isAuth.js";

const debatesRouter = express.Router();

debatesRouter.route('/')
    .get(isAuth, getAllDebates)
    .post(isAuth, createDebate);

debatesRouter.route('/:id')
    .get(isAuth, hasPermission, getDebate)
    .delete(isAuth, hasPermission, deleteDebate)
    .patch(isAuth, hasPermission, updateDebate);

debatesRouter.route('/:id/comments')
    .patch(isAuth, addComment);

export default debatesRouter;