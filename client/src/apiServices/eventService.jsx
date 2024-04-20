import axios from "axios";

export const getEventOwner = (event) =>
  axios.get("/event-owner/" + event?.owner);

export const joinEvent = (user, event) =>
  axios.post("/join-event", { guestId: user._id, eventId: event._id });
