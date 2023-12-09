import { useEffect, useState } from "react";
import axios from "axios";
import EventListElement from "./EventListElement";

function UserEventsList() {
  const [userEvents, setUserEvents] = useState([]);
  useEffect(() => {
    axios.get("/user-events").then((response) => {
      console.log(response.data);
      setUserEvents(response.data);
    });
  }, []);
  return (
    <div>
      {userEvents.length > 0 &&
        userEvents.map((event, key) => (
          <EventListElement key={key} event={event} />
        ))}
      ;
    </div>
  );
}

export default UserEventsList;
