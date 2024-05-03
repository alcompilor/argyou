import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/usersController.js';
import isAuth from "../middlewares/isAuth.js";
import hasPermission from "../middlewares/hasPermission.js";

const usersRouter = express.Router();

usersRouter.route("/:username")
    .get(isAuth, hasPermission, getUser)
    .patch(isAuth, hasPermission, updateUser)
    .delete(isAuth, hasPermission, deleteUser);

usersRouter.post('/', createUser);

export default usersRouter;
