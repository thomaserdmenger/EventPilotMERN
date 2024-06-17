import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteReviewCtrl,
  patchUpdateReviewCtrl,
  postAddReviewCtrl,
} from "./reviews.controller.js";

export const reviewsRouter = Router()
  .post("/", doUserAuth, postAddReviewCtrl)
  .patch("/", doUserAuth, patchUpdateReviewCtrl)
  .delete("/", doUserAuth, deleteReviewCtrl);
