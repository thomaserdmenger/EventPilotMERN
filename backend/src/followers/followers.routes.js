import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteUnfollowUserCtrl,
  getFollowedUsers,
  getUserFollowers,
  postFollowUserCtrl,
} from "./followers.controller.js";

export const followerRouter = Router()
  .get("/following", doUserAuth, getFollowedUsers) // User, denen User folgt
  .get("/followed", doUserAuth, getUserFollowers) // User, die User folgen
  .post("/", doUserAuth, postFollowUserCtrl)
  .delete("/", doUserAuth, deleteUnfollowUserCtrl);
