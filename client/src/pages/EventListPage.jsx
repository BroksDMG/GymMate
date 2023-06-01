import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get("/events").then(({ data }) => {
      setEvents(data);
    });
  }, []);

  return (
    <div className="mt-4">
      {events.length > 0 &&
        events.map((event) => (
          <Link
            to={"/events/" + event._id}
            className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-xl"
          >
            <div className="w-32 h-32 bg-gray-300  ">
              {event.photos.length > 0 && <img src={event.photos[0]} alt="" />}
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-xl">{event.title}</h2>
              <p className="text-sm mt-2">{event.description}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
