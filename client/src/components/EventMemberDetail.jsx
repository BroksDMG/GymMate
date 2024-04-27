import { Link, useNavigate } from "react-router-dom";
import Stars from "../components/Stars";
import { PiMapPinFill } from "react-icons/pi";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { BiSolidCalendarPlus } from "react-icons/bi";
import Button from "./Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWindowResize } from "./hooks/useWindowResize";
import defaultUserAvatar from "../assets/defaultUser.png";
import defaultBacgroudImage from "../assets/show_a_default_image.png";
import useAvatarImg from "./hooks/useAvatarImg";
import { getEventOwner, joinEvent } from "../apiServices/eventService";
function EventMemberDetail({ event, user }) {
  const [eventOwner, setEventOwner] = useState({});
  const [guests, setGuests] = useState(event?.guests || []);
  const navigate = useNavigate();
  const screenWidth = useWindowResize();
  const userAvatar = useAvatarImg(event?.avatar, defaultUserAvatar);
  const bacgroundImage = useAvatarImg(event?.photos, defaultBacgroudImage);
  let starSize;

  useEffect(() => {
    if (event.owner) {
      getEventOwner(event).then(({ data }) => {
        setEventOwner(data);
      });
    }
  }, [event, event.owner]);
  starSize = screenWidth > 640 ? "50" : "30";
  const parsedDate = Date.parse(event.time);
  const monthNames = [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień",
  ];
  let day = "";
  let month = "";
  let year = "";
  if (!isNaN(parsedDate)) {
    day = format(new Date(parsedDate), "dd");
    month = monthNames[format(new Date(parsedDate), "M") - 1];
    year = format(new Date(parsedDate), "yyyy");
  }
  function joinEventHandler() {
    if (event.owner === user._id) return;
    joinEvent(user, event)
      .then(({ data }) => {
        if (data === "joined") {
          toast.success("You joined the event");
          setGuests((prev) => [...prev, user._id]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <div
      onClick={() =>
        navigate(
          event?.owner === user?._id
            ? "/events/" + event._id
            : "/event-detail/" + event._id
        )
      }
      className="flex flex-col max-w-3xl cursor-pointer mt-5 bg-gray-100  rounded-xl shadow-md shadow-gray-400"
    >
      <div className="h-24 sm:h-32 w-full bg-gray-300 flex rounded-t-xl">
        <img
          className="w-full object-cover  rounded-t-xl"
          src={bacgroundImage}
          alt="bacgroundImage"
        />
      </div>
      <div className=" relative flex flex-col  px-4 pb-1  gap-3  md:px-10 ">
        <div className="flex flex-col w-full  h-full ">
          <div className="flex">
            <Link
              to={"/account/" + event.owner}
              className="absolute -translate-y-10 hover:-translate-y-12 sm:hover:-translate-y-16  sm:-translate-y-14 flex justify-center items-center w-[89px] h-[89px] sm:w-[105px] sm:h-[105px] bg-white rounded-full  "
            >
              <img
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center top-4"
                src={userAvatar}
                alt="defaultProfileImg"
              />
            </Link>
            <div className="w-[120px]  sm:w-[105px]  "></div>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase w-full flex justify-center">
              push-ups
            </h2>
          </div>
          <h2 className="flex gap-2 text-lg sm:text-2xl font-bold capitalize mt-2">
            {eventOwner.name && eventOwner.surname ? (
              <>
                <p>{eventOwner.name}</p> <p>{eventOwner.surname}</p>
              </>
            ) : (
              <p>Name Surname</p>
            )}
          </h2>
          <p className="text-xs sm:text-base text-gray-600 mt-2">
            {event.description?.length > 200
              ? event.description.substring(0, 200) + "..."
              : event.description}
          </p>
        </div>
      </div>
      <div className="flex h-full w-full items-end  justify-between px-4 md:px-10 lg:px-1 xl:px-10">
        <Stars
          quantity={3}
          high={starSize}
          defaultRating={Number(event.experience) || 1}
          onlyShow={true}
        />
        <div className="flex sm:gap-4">
          <div className="flex text-sm sm:text-xl w-min font-bold capitalize items-end">
            <p className=" w-min flex items-end">{event.address}</p>
            <PiMapPinFill className="text-red-500 text-xl sm:text-3xl " />
          </div>

          <div className="flex items-end leading-none">
            <div className="text-[2.05rem] sm:text-[2.8rem] scale-105 mr-1 tracking-[-0.2rem] font-semibold text-red-500">
              {day}
            </div>
            <div className="flex flex-col justify-end    ">
              <p className="text-[0.6rem] sm:text-[0.85rem] uppercase font-semibold leading-[0.5] sm:leading-[0.2] ">
                {month}
              </p>
              <p className="text-[1.25rem] sm:text-[1.9rem] font-semibold leading-none pb-[0.1rem]">
                {year}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-200 w-full flex items-center justify-between px-1 pb-2">
        <div className="">
          <div className=" text-xs sm:text-base font-bold uppercase ">
            members
          </div>
          <div
            style={{ boxShadow: "0px 5px 0px rgb(53 71 125)" }}
            className=" bg-lightBlue rounded-lg p-1 pb-2 flex flex-col items-center"
          >
            <div className="text-xl sm:text-2xl font-bold">
              {guests?.length || "0"}/{event.maxGuests}
            </div>
            <div className="w-full bg-gray-200 h-1 sm:h-2 rounded-md">
              <div
                style={{
                  width: `${(guests?.length / event.maxGuests) * 100}%`,
                }}
                className=" bg-darkBluePrimary h-2 rounded-md"
              ></div>
            </div>
          </div>
        </div>
        <div className="flex mr-1 gap-1">
          <Button
            bgColor="bg-darkBluePrimary"
            padding="px-3 py-1"
            textSize="text-sm sm:text-lg"
            style="h-9 hover:-translate-y-1"
            onClick={() => joinEventHandler()}
          >
            join event <BiSolidCalendarPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}
EventMemberDetail.propTypes = {
  event: PropTypes.object,
  user: PropTypes.object,
};

export default EventMemberDetail;
