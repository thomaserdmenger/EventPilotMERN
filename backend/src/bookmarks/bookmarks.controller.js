import { Event } from "../events/events.model.js";
import { User } from "../users/users.model.js";
import { Bookmark } from "./bookmarks.model.js";

export const getUserBookmarksCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json("User not found. Please register.");

    const bookmarks = await Bookmark.find({ userId }).populate("eventId");
    res.json({ userId, bookmarks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not get bookmarks." });
  }
};

export const postBookmarkCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    const { eventId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json("User not found. Please register.");

    const event = await Event.findById(eventId);
    if (!event) return res.status(400).json("Event not found.");

    const alreadybookmarked = await Bookmark.findOne({ userId, eventId });
    if (alreadybookmarked) return res.status(400).json("Event already bookmarked");

    const bookmarked = await Bookmark.create({ userId, eventId });
    res.json({ bookmarks: bookmarked });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not bookmark event." });
  }
};

export const deleteBookmarkCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    const { eventId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json("User not found. Please register.");

    const event = await Event.findById(eventId);
    if (!event) return res.status(400).json("Event not found.");

    const notbookmarkedyet = await Bookmark.findOne({ userId, eventId });
    if (!notbookmarkedyet) return res.status(400).json("Event already unbookmarked");

    await Bookmark.deleteOne({ userId, eventId });

    res.json({ message: "Bookmark successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not unbookmark event." });
  }
};
