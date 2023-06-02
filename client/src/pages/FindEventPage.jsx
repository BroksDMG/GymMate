import React, { useEffect, useState } from "react";
import axios from "axios";
export default function FindEventPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get("/events").then((response) => {
      setEvents([...response.data, ...response.data, ...response.data]);
    });
  }, []);
  return (
    <div className=" mt-7 grid gap-6 gap-y-8 grid-cols-1 max-w-[1000px] self-center ">
      {events.length > 0 &&
        events.map((event) => (
          <div className=" bg-gray-200 rounded-xl">
            <div className="bg-gray-500 mb-2 flex rounded-xl">
              {event.photos?.[0] && (
                <img
                  className="w-full rounded-t-xl rounded-b-sm object-cover"
                  src={"http://127.0.0.1:4000/uploads/" + event.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <div className="ml-2">
              <h3 className="font-bold leading-4">{event.address}</h3>
              <h2 className="text-sm  leading-4">{event.title}</h2>
              <div className="mt-2">{"Max osób: " + event.maxGuests}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
