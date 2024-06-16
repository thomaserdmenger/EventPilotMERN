import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import { postBookmarkCtrl } from "./bookmarks.controller.js";

export const bookmarkRouter = Router().post("/", doUserAuth, postBookmarkCtrl);
