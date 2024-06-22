import { Bookmark } from "../bookmarks/bookmarks.model.js";
import { Participant } from "../eventRegistration/eventRegistration.model.js";
import { deleteImage } from "../utils/deleteImage.js";
import { uploadImage } from "../utils/uploadImage.js";
import { Event } from "./events.model.js";
import { User } from "../users/users.model.js";

export const postAddEventCtrl = async (req, res) => {
  try {
    const authenticatedUserId = req.authenticatedUser._id;
    const { title, startDate, endDate, locationObj, categories, description } =
      req.body;
    const eventImage = req.file;

    const location = JSON.parse(locationObj);
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
        errorMessage: "Please fill in all input fields and add an image.",
      });

    if (startDateTimestamp > endDateTimestamp)
      return res.status(422).json({
        errorMessage: "Enddate must be later than startdate.",
      });

    if (startDateTimestamp < Date.now())
      return res.status(422).json({
        errorMessage: "Startdate must be in the future.",
      });
    if (title < 5 || title > 20)
      return res.status(422).json({
        errorMessage: "Title must be between 5 and 20 characters.",
      });
    if (description < 20 || description > 500)
      return res.status(422).json({
        errorMessage: "Description must be between 20 and 500 characters.",
      });

    if (!authenticatedUserId)
      return res.status(400).json({
        errorMessage: "You are not authorized.",
      });

    const authenticatedUser = await User.findById(authenticatedUserId);
    if (!authenticatedUser)
      return res
        .status(404)
        .json({ errorMessage: "This user does not exist." });

    // upload event-image to cloudinary-folder EventPilot/eventImages
    const uploadResult = await uploadImage(eventImage.buffer, "eventImages");

    // finally create new Event ...
    const newEvent = await Event.create({
      // userId: authenticatedUserId,
      userId: authenticatedUserId,
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
        errorMessage: "No upcoming events.",
      });

    res.json({ upcomingEvents });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Could not find upcoming events." });
  }
};

export const getTrendingEventsCtrl = async (req, res) => {
  try {
    // trending => (bookmarks per event + participants per event) / lifespan of event => for all events of the last week
    const recentEvents = await Event.find({
      createdAt: { $gte: Date.now() - 7 * 24 * 60 * 60 * 1000 },
      startDate: {
        $gte: Date.now(),
      },
    }).sort({ startDate: 1 });

    const bookmarksPerEvent = await Promise.all(
      recentEvents.map((event) =>
        Bookmark.find({ eventId: event._id }, { _id: 1 }).countDocuments()
      )
    );

    const registrationsPerEvent = await Promise.all(
      recentEvents.map((event) =>
        Participant.find({ eventId: event._id }, { _id: 1 }).countDocuments()
      )
    );

    function getLifeSpanInHours(createdAt) {
      const ageMs = Date.now() - new Date(createdAt).getTime();
      return ageMs / 1000 / 60 / 60;
    }

    const trendingEvents = recentEvents
      .map((event, eventIndex) => ({
        ...event.toObject(),
        score:
          (bookmarksPerEvent[eventIndex] + registrationsPerEvent[eventIndex]) /
          getLifeSpanInHours(event.createdAt),
      }))
      .sort((t1, t2) => t2.score - t1.score)
      .slice(0, 30);

    if (!trendingEvents)
      return res.status(404).json({
        errorMessage: "No trending events yet.",
      });

    res.json({ trendingEvents });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Could not find any trending events.",
    });
  }
};

export const getSingleEventCtrl = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const [event, bookmarks, participants] = await Promise.all([
      Event.findById(eventId).populate({
        path: "userId",
        select: "_id username profileImage",
      }),
      Bookmark.find({ eventId }),
      Participant.find({ eventId }).populate({
        path: "userId",
        select: "_id username profileImage",
      }),
    ]);

    if (!event)
      return res.status(404).json({
        errorMessage: `The event with the id ${eventId} does not exist.`,
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
    console.log(eventId);

    // delete event with all referenced bookmarks and registrations
    const [deletedEvent, deletedBookmarks, deletedParticipants] =
      await Promise.all([
        Event.findByIdAndDelete(eventId),
        Bookmark.deleteMany({ eventId }),
        Participant.deleteMany({ eventId }),
      ]);
    console.log(deletedEvent);

    if (!deletedEvent)
      return res.status(404).json({
        errorMessage: `The event with the id ${eventId} does not exist.`,
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
    const authenticatedUserId = req.authenticatedUser._id;
    const eventId = req.params.eventId;

    const eventToEdit = await Event.findById(eventId);

    // check if event exists
    if (!eventToEdit)
      return res.json({
        errorMessage: `Could not find event with the id ${eventId}`,
      });

    // check if user is allowed to change the event
    if (authenticatedUserId.toString() !== eventToEdit.userId.toString())
      return res.status(401).json({
        errorMessage: "You are not authorized to edit this event.",
      });

    // get formData content
    const { title, startDate, endDate, locationObj, categories, description } =
      req.body;

    // parse location JSON string
    const location = JSON.parse(locationObj);

    // if there is a req.file: upload event-image to cloudinary-folder EventPilot/eventImages and delete the old event-image
    // else: take the old event-image infos and save them anew
    const eventImage = req.file ? req.file : null;
    let public_id;
    let secure_url;
    if (eventImage) {
      deleteImage(eventToEdit.eventImage.public_id);
      const uploadResult = await uploadImage(eventImage.buffer, "eventImages");
      public_id = uploadResult.public_id;
      secure_url = uploadResult.secure_url;
    } else {
      public_id = eventToEdit.eventImage.public_id;
      secure_url = eventToEdit.eventImage.secure_url;
    }

    // convert timestamps
    const startDateTimestamp = startDate
      ? new Date(startDate).getTime()
      : eventToEdit.startDate;
    const endDateTimestamp = endDate
      ? new Date(endDate).getTime()
      : eventToEdit.endDate;

    // Error Handling
    if (startDateTimestamp > endDateTimestamp)
      return res.status(422).json({
        errorMessage: "Enddate must be later than startdate.",
      });
    if (startDateTimestamp < Date.now())
      return res.status(422).json({
        errorMessage: "Startdate must be in the future.",
      });
    if (title < 5 || title > 20)
      return res.status(422).json({
        errorMessage: "Title must be between 5 and 20 characters.",
      });
    if (description < 20 || description > 500)
      return res.status(422).json({
        errorMessage: "Description must be between 20 and 500 characters.",
      });

    if (!authenticatedUserId)
      return res.status(400).json({
        errorMessage: "You are not authorized.",
      });
    const authenticatedUser = await User.findById(authenticatedUserId);
    if (!authenticatedUser)
      return res
        .status(404)
        .json({ errorMessage: "This user does not exist." });

    // update event
    const updateInfo = {
      title: title,
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
      location: location ? location : eventToEdit.location,
      categories: categories.split(","),
      description: description,
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
