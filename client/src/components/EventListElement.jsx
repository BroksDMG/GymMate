import { Link } from "react-router-dom";
import Stars from "../components/Stars";
import { PiMapPinFill } from "react-icons/pi";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import { FaHeart } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { BiSolidCalendarPlus } from "react-icons/bi";
import Button from "./Button";
function EventListElement({ event, user }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  let starSize;
  useEffect(() => {
    const hanldeResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", hanldeResize);
    return () => {
      window.removeEventListener("resize", hanldeResize);
    };
  }, []);
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
  return (
    <Link
      to={"/events/" + event._id}
      className="flex flex-col cursor-pointer mt-5 bg-gray-100  rounded-xl shadow-md shadow-gray-400"
    >
      <div className="h-24 sm:h-32 w-full bg-gray-300 flex rounded-t-xl">
        {event.photos?.length > 0 && (
          <img
            className="w-full object-cover  rounded-t-xl"
            src={"http://127.0.0.1:4000/uploads/" + event.photos[0]}
            alt=""
          />
        )}
      </div>
      <div className=" relative flex flex-col  px-4 pb-1  gap-3  md:px-10 ">
        <div className="flex flex-col w-full  h-full ">
          <div className="flex">
            <div className="absolute -translate-y-10 sm:-translate-y-14 flex justify-center items-center w-[89px] h-[89px] sm:w-[105px] sm:h-[105px] bg-white rounded-full  ">
              {event.avatar?.length > 0 ? (
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center top-4"
                  src={"http://127.0.0.1:4000/uploads/" + event.avatar[0]}
                  alt="defaultProfileImg"
                />
              ) : (
                <img
                  src="https://img.freepik.com/free-photo/elf-woman-forest_71767-117.jpg?w=826&t=st=1699015819~exp=1699016419~hmac=74e1f2bd99b8e2de4489799ab8476301c1747e33fbb6fb1d6da863b5c6230ca6"
                  alt="profileImg"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center top-4 "
                />
              )}
            </div>
            <div className="w-[120px]  sm:w-[105px]  "></div>
            <h2 className="text-4xl sm:text-5xl font-bold uppercase w-full flex justify-center">
              push-ups
            </h2>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold capitalize mt-2">
            {user?.name} {user?.surname}
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
              {event.guests?.length || "0"}/{event.maxGuests}
            </div>
            <div className="w-full bg-gray-200 h-1 sm:h-2 rounded-md">
              <div
                style={{
                  width: `${(event.guests?.length / event.maxGuests) * 100}%`,
                }}
                className=" bg-darkBluePrimary h-2 rounded-md"
              ></div>
            </div>
          </div>
        </div>
        <div className="flex mr-1 gap-1">
          <Button
            bgColor="bg-red-500"
            boxShadowColor="rgb(127 29 29)"
            padding="px-3 py-1"
            textSize="text-sm sm:text-lg"
            style="h-9"
          >
            <FaHeart />
          </Button>
          <Button
            bgColor="bg-darkBluePrimary"
            padding="px-3 py-1"
            textSize="text-sm sm:text-lg"
            style="h-9"
          >
            <AiFillLike />
          </Button>
          <Button
            bgColor="bg-darkBluePrimary"
            padding="px-3 py-1"
            textSize="text-sm sm:text-lg"
            style="h-9"
          >
            join event <BiSolidCalendarPlus />
          </Button>
        </div>
      </div>
    </Link>
  );
}
EventListElement.propTypes = {
  event: PropTypes.object,
  user: PropTypes.object,
};

export default EventListElement;
