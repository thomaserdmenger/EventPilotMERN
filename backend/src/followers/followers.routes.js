import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import { postFollowUserCtrl } from "./followers.controller.js";

export const followerRouter = Router().post("/", doUserAuth, postFollowUserCtrl);
