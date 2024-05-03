import { 
    getAllDebates, 
    getDebate, 
    createDebate, 
    updateDebate, 
    deleteDebate, 
    addComment
} from "../controllers/debatesController.js";
import express from "express";

const debatesRouter = express.Router();

debatesRouter.get('/', getAllDebates);

debatesRouter.get('/:id', getDebate);

debatesRouter.post('/', createDebate);

debatesRouter.delete('/:id', deleteDebate);

debatesRouter.patch('/:id', updateDebate);

debatesRouter.patch('/:id/comments', addComment);

export default debatesRouter;