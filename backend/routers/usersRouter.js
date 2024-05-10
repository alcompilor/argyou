import express from 'express';
import { createUser, getUser, updateUser, deleteUser, pushNotification } from '../controllers/usersController.js';
import isAuth from "../middlewares/isAuth.js";
import hasPermission from "../middlewares/hasPermission.js";
import multer from "multer";
import { validateImage } from '../middlewares/validateImage.js';

const usersRouter = express.Router();
const upload = multer();

const USERS_COLLECTION = "users";
const FIELD_NAME = "username";

const IMAGE_NAME = "avatar";
const IMAGE_SIZE = 2;

usersRouter.route("/:username")
    .get(isAuth, getUser)
    .patch(isAuth, hasPermission(USERS_COLLECTION, FIELD_NAME), upload.single(IMAGE_NAME), validateImage(IMAGE_SIZE), updateUser)
    .delete(isAuth, hasPermission(USERS_COLLECTION, FIELD_NAME), deleteUser);

usersRouter.post('/', upload.single(IMAGE_NAME), validateImage(IMAGE_SIZE), createUser);
usersRouter.route('/notifications').post(pushNotification);

export default usersRouter;
