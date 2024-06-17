import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import { postAddReviewCtrl } from "./reviews.controller.js";

export const reviewsRouter = Router().post("/", doUserAuth, postAddReviewCtrl);
