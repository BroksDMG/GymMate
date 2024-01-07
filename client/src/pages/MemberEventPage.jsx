import { useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logoWithBorder from "../assets/logoWithBorder.svg";
import EventMemberDetail from "../components/EventMemberDetail";
export default function MemberEventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!id) return;

    axios.get("/events/" + id).then((response) => {
      const { data } = response;
      setEvent(data);
      setIsLoading(false);
    });
  }, [id]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-2 sm:px-10 md:px-20 lg:px-10 xl:px-20">
      <div className=" flex  items-center flex-col lg:justify-normal lg:flex-row lg:items-start lg:mb-10">
        <a href="#" className="absolute -top-20  lg:-top-32 select-none ">
          <img
            src={logoWithBorder}
            alt="logoBorder"
            className="w-52 lg:w-full "
          />
        </a>
      </div>

      <div className="mt-16 grid grid-cols-1 ">
        <EventMemberDetail event={event} user={user} />
      </div>
    </div>
  );
}
