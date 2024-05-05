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

const debatesRouter = express.Router();
const DEBATES_COLLECTION = "debates";
const FIELD_NAME = "_id";

debatesRouter.route("/").get(isAuth, getAllDebates).post(isAuth, createDebate);

debatesRouter
  .route("/:_id")
  .get(isAuth, hasPermission(DEBATES_COLLECTION, FIELD_NAME), getDebate)
  .delete(isAuth, hasPermission(DEBATES_COLLECTION, FIELD_NAME), deleteDebate)
  .patch(isAuth, hasPermission(DEBATES_COLLECTION, FIELD_NAME), updateDebate);

debatesRouter.route("/:_id/comments").patch(isAuth, addComment);
debatesRouter.route("/:_id/opponent").patch(isAuth, addOpponent);

export default debatesRouter;