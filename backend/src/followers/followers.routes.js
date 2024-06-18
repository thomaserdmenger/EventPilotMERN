import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteUnfollowUserCtrl,
  getFollowedUsers,
  getUserFollowers,
  postFollowUserCtrl,
} from "./followers.controller.js";

export const followerRouter = Router()
  .post("/", doUserAuth, postFollowUserCtrl)
  .post("/following", doUserAuth, getFollowedUsers) // User, denen User folgt
  .post("/followed", doUserAuth, getUserFollowers) // User, die User folgen
  .delete("/", doUserAuth, deleteUnfollowUserCtrl);
