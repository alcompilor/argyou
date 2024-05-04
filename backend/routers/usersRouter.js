import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/usersController.js';
import isAuth from "../middlewares/isAuth.js";
import hasPermission from "../middlewares/hasPermission.js";

const usersRouter = express.Router();

const USERS_COLLECTION = "users";
const FIELD_NAME = "username";

usersRouter.route("/:username")
    .get(isAuth, hasPermission(USERS_COLLECTION, FIELD_NAME), getUser)
    .patch(isAuth, hasPermission(USERS_COLLECTION, FIELD_NAME), updateUser)
    .delete(isAuth, hasPermission(USERS_COLLECTION, FIELD_NAME), deleteUser);

usersRouter.post('/', createUser);

export default usersRouter;
