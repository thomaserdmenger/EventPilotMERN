import { uploadImage } from "../utils/uploadImage.js";
import { Event } from "./events.model.js";

export const getUpcomingEventsCtrl = async (_, res) => {
  try {
    const result = await Event.find({
      startDate: {
        $gte: Date.now(),
      },
    }).sort({ startDate: 1 });
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
    // # statt userId auf authenticatedUserId umstellen, sobald Icaro das im Frontend implementiert hat
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
    if (title < 5 || title > 20)
      return res.status(422).json({
        message: "Title must be between 5 and 20 characters.",
      });
    if (description < 20 || description > 500)
      return res.status(422).json({
        message: "Description must be between 20 and 500 characters.",
      });

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
      categories: categories.split(","),
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

export const getSingleEventCtrl = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const result = await Event.findById(eventId);
    // # participants populaten
    // # bookmarks auch?
    res.json({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not find this event." });
  }
};
