import { Router } from "express";
import { doUserAuth } from "../middleware/doUserAuth.js";
import {
  deleteBookmarkCtrl,
  getUserBookmarksCtrl,
  postBookmarkCtrl,
} from "./bookmarks.controller.js";

export const bookmarkRouter = Router()
  .get("/", doUserAuth, getUserBookmarksCtrl)
  .post("/", doUserAuth, postBookmarkCtrl)
  .delete("/", doUserAuth, deleteBookmarkCtrl);
