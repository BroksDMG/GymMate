import { useEffect, useState } from "react";
import axios from "axios";
import EventListElement from "./EventListElement";

function UserEventsList() {
  const [userEvents, setUserEvents] = useState([]);
  useEffect(() => {
    axios.get("/user-events").then((response) => {
      setUserEvents(response.data);
    });
  }, []);
  return (
    <>
      {userEvents.length > 0 &&
        userEvents.map((event, key) => (
          <EventListElement key={key} event={event} />
        ))}
      ;
    </>
  );
}

export default UserEventsList;
