import axios from "axios";

export const getEventOwner = (event) =>
  axios.get("/event-owner/" + event?.owner);

export const joinEvent = (user, event) =>
  axios.post("/join-event", { guestId: user._id, eventId: event._id });

export const updateEvent = async (id, values) =>
  await axios.put("/events", {
    id,
    ...values,
  });
export const addEvent = async (values) =>
  await axios.post("/events", { ...values });

export const getEventsById = (id) => axios.get("/events/" + id);
