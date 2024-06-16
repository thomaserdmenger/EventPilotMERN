import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import { deleteUnfollowUserCtrl, postFollowUserCtrl } from "./followers.controller.js";

export const followerRouter = Router()
  .post("/", doUserAuth, postFollowUserCtrl)
  .delete("/", doUserAuth, deleteUnfollowUserCtrl);
