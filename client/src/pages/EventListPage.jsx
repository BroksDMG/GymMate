import React, { useEffect, useState } from "react";
import grafika from "../assets/GRAFIKA.svg";
import axios from "axios";

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setEvents(data);
    });
  });
  return (
    <div>
      <img src={grafika} alt="" />
    </div>
  );
}
