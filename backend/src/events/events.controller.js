import { User } from "../users/users.model.js";
import { uploadImage } from "../utils/uploadImage.js";
import { Event } from "./events.model.js";

export const getUpcomingEventsCtrl = async (_, res) => {
  try {
    // alle Events aus der Zukunft
    // sortiert nach Datum, früheste zuerst
    const result = await Event.find({
      date: {
        start: {
          $gte: Date.now(), // --> is timestamp - works?!
        },
      },
    }).sort({ dates: { start: -1 } });
    //-> funktioniert das Reinnavigieren zum Startdatum so?
    res.json({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not find upcoming events." });
  }
};

export const postAddEventCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUser._id;
    const { userId, title, dates, location, categories, description } =
      req.body;
    // console.log(typeof dates);
    const eventImage = req.file;
    // // Dates umwandeln in Timestamps für spätere Verarbeitung? .getTime()
    //   const startDate = new Date(startDate.$d).getTime(); // timestamp

    if (
      !title ||
      !dates ||
      !location ||
      !categories ||
      !description ||
      !eventImage
    )
      return res.status(422).json({
        // 422 Unprocessable Entity
        message: "Please fill in all input fields and add an image.",
      });

    // -> Weitere Fehlerabfragen:
    // Daten sollen in der Zukunft liegen (> als Date now() sein)
    // Titel, Description sollen eine gewisse Länge nicht über- und unterschreiten

    if (!authenticatedUserId)
      return res.status(400).json({
        message: "You are not authorized.",
      });

    // const authenticatedUser = await User.findById(authenticatedUserId);
    // if (!authenticatedUser)
    //   return res.status(404).json({ message: "This user does not exist." });

    // upload the event-image to cloudinary-folder EventPilot/eventImages
    const uploadResult = await uploadImage(eventImage.buffer, "eventImages");

    const result = await Event.create({
      // userId: authenticatedUserId,
      userId,
      title,
      // dates: {
      //   start: dates.start,
      //   end: dates.end,
      // },  //# weil in Thunderclient als ein string weitergegeben wird - wie läuft es übers Frontend mit Icaros UI?
      dates,
      location,
      categories,
      description,
      eventImage: uploadResult.secure_url,
    });
    res.json({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not post new event." });
  }
};
