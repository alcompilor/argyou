import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.route("/:username")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

usersRouter.post('/', createUser);

export default usersRouter;