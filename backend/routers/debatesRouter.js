import { 
    getAllDebates, 
    getDebate, 
    createDebate, 
    joinDebate, 
    deleteDebate, 
    addMessage, 
    addComment 
} from "../middlewares/debatesMiddleware.js";
import express from "express";

const debatesRouter = express.Router();

debatesRouter.get('/', getAllDebates);

debatesRouter.get('/:id', getDebate);

debatesRouter.post('/', createDebate);

debatesRouter.delete('/:id', deleteDebate);

debatesRouter.put('/joinDebate/:id', joinDebate);

debatesRouter.put('/addMessage/:id', addMessage);

debatesRouter.put('/addComment/:id', addComment);

export default debatesRouter;