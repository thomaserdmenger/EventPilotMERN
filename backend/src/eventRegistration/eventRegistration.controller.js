import { Event } from "../events/events.model.js";
import { User } from "../users/users.model.js";
import { Participant } from "./eventRegistration.model.js";

export const postRegisterForAnEventCtrl = async (req, res) => {
  try {
    const userId = req.authenticatedUser._id;
    const { eventId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json("User not found. Please register.");

    const event = await Event.findById(eventId);
    if (!event) return res.status(400).json("Event not found.");

    const alreadyregistered = await Participant.findOne({ userId, eventId });
    if (alreadyregistered) return res.status(400).json("You are already registered for this event");

    const registered = await Participant.create({ userId, eventId });
    res.json({ participations: registered });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Could not register for event." });
  }
};
