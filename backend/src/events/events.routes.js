import { Router } from "express";
import {
  getUpcomingEventsCtrl,
  postAddEventCtrl,
} from "./events.controller.js";
import multer from "multer";
import { doUserAuth } from "../middleware/doUserAuth.js";

const upload = multer({ storage: multer.memoryStorage() });
export const eventRouter = Router()
  .get("/upcoming", getUpcomingEventsCtrl)
  .get("/trending")
  .post("/", doUserAuth, upload.single("eventImage"), postAddEventCtrl)
  .get("/:eventId")
  .patch("/:eventId")
  .delete("/:eventId");
