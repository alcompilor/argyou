import express from "express";
import { 
    getAllDebates, 
    getDebate, 
    createDebate, 
    updateDebate, 
    deleteDebate, 
    addComment
} from "../controllers/debatesController.js";

const debatesRouter = express.Router();

debatesRouter.route('/')
    .get(getAllDebates)
    .post(createDebate);

debatesRouter.route('/:id')
    .get(getDebate)
    .delete(deleteDebate)
    .patch(updateDebate);

debatesRouter.route('/:id/comments')
    .patch(addComment);

export default debatesRouter;