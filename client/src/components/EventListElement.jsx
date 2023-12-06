import { Link } from "react-router-dom";
import Stars from "../components/Stars";
import { PiMapPinFill } from "react-icons/pi";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
function EventListElement({ event }) {
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
  starSize = screenWidth > 640 ? "50" : "40";

  const parsedDate = Date.parse(event.time);
  let formattedDate = "";
  if (!isNaN(parsedDate)) {
    formattedDate = format(new Date(parsedDate), "dd/MM/yyyy");
  }

  return (
    <Link
      to={"/events/" + event._id}
      className="flex flex-col cursor-pointer mt-5 bg-gray-100  rounded-xl shadow-md shadow-gray-400"
    >
      <div className=" h-32 w-full bg-gray-300 flex rounded-t-xl">
        {event.photos?.length > 0 && (
          <img
            className="w-full object-cover  rounded-t-xl"
            src={"http://127.0.0.1:4000/uploads/" + event.photos[0]}
            alt=""
          />
        )}
      </div>
      <div className=" relative flex flex-col  px-2 pb-5  gap-3 h-full md:px-10 md:flex-row">
        <div className="flex flex-col w-full  h-full ">
          <div className="pt-14 flex flex-col ">
            <div className="w-full flex sm:justify-normal">
              <div className=" absolute -top-14 flex justify-center items-center w-[105px] h-[105px] bg-white rounded-full  ">
                {event.avatar?.length > 0 ? (
                  <img
                    className="w-24 h-24 rounded-full object-cover object-center top-4"
                    src={"http://127.0.0.1:4000/uploads/" + event.avatar[0]}
                    alt="defaultProfileImg"
                  />
                ) : (
                  <img
                    src="https://img.freepik.com/free-photo/elf-woman-forest_71767-117.jpg?w=826&t=st=1699015819~exp=1699016419~hmac=74e1f2bd99b8e2de4489799ab8476301c1747e33fbb6fb1d6da863b5c6230ca6"
                    alt="profileImg"
                    className="w-24 h-24 rounded-full object-cover object-center top-4 "
                  />
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold ">{event.title}</h2>
            <p className="text-base text-gray-600 mt-2">
              {event.description?.length > 200
                ? event.description.substring(0, 200) + "..."
                : event.description}
            </p>
          </div>
          <div className="flex  w-full items-end justify-between">
            <Stars
              quantity={3}
              high={starSize}
              defaultRating={Number(event.experience) || 1}
              onlyShow={true}
            />
            <div className="flex text-xl w-min font-bold uppercase items-end">
              <p className=" w-min flex items-end">{event.address}</p>
              <PiMapPinFill className="text-red-500 text-3xl" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full relative ">
          <div className="text-4xl font-bold ">PUSH UPS</div>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold ">
              {event.guests?.length}/{event.maxGuests}
            </div>
            <div className="text-xl font-bold ">GUESTS</div>
          </div>

          <div className="text-2xl font-bold ">Date</div>
          <div className="text-xl font-bold ">{formattedDate || "No date"}</div>
        </div>
      </div>
    </Link>
  );
}
EventListElement.propTypes = {
  event: PropTypes.object,
  key: PropTypes.string,
};

export default EventListElement;
