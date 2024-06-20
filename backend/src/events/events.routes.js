import { Router } from "express";
import {
  deleteEventCtrl,
  getSingleEventCtrl,
  getTrendingEventsCtrl,
  getUpcomingEventsCtrl,
  patchEditEventCtrl,
  postAddEventCtrl,
} from "./events.controller.js";
import multer from "multer";
import { doUserAuth } from "../middleware/doUserAuth.js";

const upload = multer({ storage: multer.memoryStorage() });
export const eventRouter = Router()
  .get("/upcoming", getUpcomingEventsCtrl)
  .get("/trending", getTrendingEventsCtrl)
  .post("/", doUserAuth, upload.single("eventImage"), postAddEventCtrl)
  .get("/:eventId", getSingleEventCtrl)
  .patch(
    "/:eventId",
    doUserAuth,
    upload.single("eventImage"),
    patchEditEventCtrl
  )
  .delete("/:eventId", doUserAuth, deleteEventCtrl);
