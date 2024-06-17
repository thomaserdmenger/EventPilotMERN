import { Router } from "express";
import {
  deleteEventCtrl,
  getSingleEventCtrl,
  getUpcomingEventsCtrl,
  patchEditEventCtrl,
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
  .patch("/:eventId", upload.single("eventImage"), patchEditEventCtrl) // doJwtAuth ergänzen
  .delete("/:eventId", deleteEventCtrl); // doJwtAuth ergänzen
