import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteUnfollowUserCtrl,
  getFollowedUsers,
  postFollowUserCtrl,
} from "./followers.controller.js";

export const followerRouter = Router()
  .get("/", doUserAuth, getFollowedUsers)
  .post("/", doUserAuth, postFollowUserCtrl)
  .delete("/", doUserAuth, deleteUnfollowUserCtrl);
