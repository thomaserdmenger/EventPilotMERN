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
    // const authenticatedUserId = req.authenticatedUser._id;
    const {
      userId,
      title,
      startDate,
      endDate,
      location,
      categories,
      description,
    } = req.body;
    const eventImage = req.file;

    const startDateTimestamp = new Date(startDate).getTime();
    const endDateTimestamp = new Date(endDate).getTime();

    // Error Handling
    if (
      !title ||
      !startDate ||
      !endDate ||
      !location ||
      !categories ||
      !description ||
      !eventImage
    )
      return res.status(422).json({
        // 422 Unprocessable Entity
        message: "Please fill in all input fields and add an image.",
      });

    if (startDateTimestamp > endDateTimestamp)
      return res.status(422).json({
        message: "Enddate must be later than startdate.",
      });

    if (startDateTimestamp < Date.now())
      return res.status(422).json({
        message: "Startdate must be in the future.",
      });

    // -> Weitere Fehlerabfragen:
    // Titel, Description sollen eine gewisse Länge nicht über- und unterschreiten

    // if (!authenticatedUserId)
    //   return res.status(400).json({
    //     message: "You are not authorized.",
    //   });

    // const authenticatedUser = await User.findById(authenticatedUserId);
    // if (!authenticatedUser)
    //   return res.status(404).json({ message: "This user does not exist." });

    // upload event-image to cloudinary-folder EventPilot/eventImages
    const uploadResult = await uploadImage(eventImage.buffer, "eventImages");

    // finally create new Event ...
    const result = await Event.create({
      // userId: authenticatedUserId,
      userId,
      title,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
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
