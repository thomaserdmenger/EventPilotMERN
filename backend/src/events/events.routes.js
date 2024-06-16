import { Router } from "express";
import {
  getSingleEventCtrl,
  getUpcomingEventsCtrl,
  postAddEventCtrl,
} from "./events.controller.js";
import multer from "multer";
import { doUserAuth } from "../middleware/doUserAuth.js";

const upload = multer({ storage: multer.memoryStorage() });
export const eventRouter = Router()
  .get("/upcoming", getUpcomingEventsCtrl)
  .get("/trending")
  .post("/", upload.single("eventImage"), postAddEventCtrl) // doJwtAuth ergänzen
  .get("/:eventId", getSingleEventCtrl)
  .patch("/:eventId", doUserAuth)
  .delete("/:eventId", doUserAuth);
