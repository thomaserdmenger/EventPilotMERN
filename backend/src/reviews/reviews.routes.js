import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import { deleteReviewCtrl, postAddReviewCtrl } from "./reviews.controller.js";

export const reviewsRouter = Router()
  .post("/", doUserAuth, postAddReviewCtrl)
  .delete("/", doUserAuth, deleteReviewCtrl);
