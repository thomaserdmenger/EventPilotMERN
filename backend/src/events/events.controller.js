import { Bookmark } from "../bookmarks/bookmarks.model.js";
import { Participant } from "../eventRegistration/eventRegistration.model.js";
import { deleteImage } from "../utils/deleteImage.js";
import { uploadImage } from "../utils/uploadImage.js";
import { Event } from "./events.model.js";

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
    const newEvent = await Event.create({
      // userId: authenticatedUserId,
      userId,
      title,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
      location,
      categories: categories.split(","),
      description,
      eventImage: {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      },
    });
    res.json({ newEvent });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not post new event." });
  }
};

export const getUpcomingEventsCtrl = async (_, res) => {
  try {
    const upcomingEvents = await Event.find({
      startDate: {
        $gte: Date.now(),
      },
    }).sort({ startDate: 1 });

    if (!upcomingEvents)
      return res.status(404).json({
        message: "No upcoming events.",
      });

    res.json({ upcomingEvents });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not find upcoming events." });
  }
};

export const getSingleEventCtrl = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const [event, bookmarks, participants] = await Promise.all([
      Event.findById(eventId),
      Bookmark.find({ eventId }),
      Participant.find({ eventId }),
    ]);

    if (!event)
      return res.status(404).json({
        message: `The event with the id ${eventId} does not exist.`,
      });

    res.json({ event, bookmarks, participants });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not find this event." });
  }
};

export const deleteEventCtrl = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // delete event with all referenced bookmarks and registrations
    const [deletedEvent, deletedBookmarks, deletedParticipants] =
      await Promise.all([
        Event.findByIdAndDelete(eventId),
        Bookmark.deleteMany({ eventId }),
        Participant.deleteMany({ eventId }),
      ]);

    if (!deletedEvent)
      return res.status(404).json({
        message: `The event with the id ${eventId} does not exist.`,
      });

    // delete event image from cloudinary
    deleteImage(deletedEvent.eventImage.public_id);

    res.json({ message: "The event was deleted." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not delete this event." });
  }
};

export const patchEditEventCtrl = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const eventToEdit = await Event.findById(eventId);
    if (!eventToEdit)
      return res.json({
        message: `Could not find event with the id ${eventId}`,
      });
    console.log({ bodyCtrl: req.body });
    console.log({ fileCtrl: req.file });

    // if there is a req.file: upload event-image to cloudinary-folder EventPilot/eventImages and delete the old event-image
    // else: take the old event-image infos and save them anew
    const eventImage = req.file ? req.file : null;
    let public_id;
    let secure_url;
    if (eventImage) {
      deleteImage(eventToEdit.eventImage.public_id);
      const uploadResult = await uploadImage(eventImage.buffer, "eventImages");
      console.log({ uploadImageResultCtrl: uploadResult });
      public_id = uploadResult.public_id;
      secure_url = uploadResult.secure_url;
    } else {
      public_id = eventToEdit.eventImage.public_id;
      secure_url = eventToEdit.eventImage.public_id;
    }

    // convert timestamps
    const startDateTimestamp = req.body.startDate
      ? new Date(req.body.startDate).getTime()
      : eventToEdit.startDate;
    const endDateTimestamp = req.body.endDate
      ? new Date(req.body.endDate).getTime()
      : eventToEdit.endDate;
    console.log(startDateTimestamp);

    // #Error Handling noch einfügen
    // authUser exists
    // für die einzelnen Update-Inputs gelten die gleichen Regeln wie für addEvent-Inputs

    const updateInfo = {
      title: req.body.title,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
      location: req.body.location,
      categories: req.body.categories.split(","),
      description: req.body.description,
      "eventImage.public_id": public_id,
      "eventImage.secure_url": secure_url,
    };

    const editedEvent = await Event.findByIdAndUpdate(eventId, updateInfo, {
      new: true,
    });

    res.json({ editedEvent });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not edit this event." });
  }
};
