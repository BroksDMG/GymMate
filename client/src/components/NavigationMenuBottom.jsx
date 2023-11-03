import { useState } from "react";
import { HiPhoto } from "react-icons/hi2";
import { MdPeopleAlt } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
export default function NavigationMenuBottom() {
  const [isActive, setIsActive] = useState(0);
  const [value, setValue] = useState(null);
  function onClikHandle(num) {
    setIsActive(num);
    const valueMap = {
      1: -8,
      2: 48,
      3: 104,
    };

    if (valueMap[num] !== undefined) {
      setValue(valueMap[num]);
    }
  }
  return (
    <div className="w-screen fixed bg-white shadowTop h-[65px] bottom-0">
      <div className=" bg-darkBluePrimary rounded-t-md fixed left-1/2 transform -translate-x-1/2 bottom-0 flex justify-center items-center w-60">
        <ul className="flex text-2xl items">
          <li
            className="relative flex justify-center z-20"
            onClick={() => onClikHandle(1)}
          >
            <a href="#" className="relative">
              <span
                className={`text-xl relative flex dropRadious justify-center items-end pb-3 rounded-full w-14 h-10 
            ${
              isActive === 1
                ? " bg-darkBluePrimary text-black duration-300 transform ease-linear -translate-y-5"
                : "text-white"
            }`}
              >
                <FaCalendarDays className="z-10" />
                <FaCalendarDays className="text-gray-400 translate-y-[2px] absolute" />
              </span>
            </a>
          </li>
          <li
            className="relative flex justify-center z-20"
            onClick={() => onClikHandle(2)}
          >
            <a href="#" className="relative ">
              <span
                className={` relative flex dropRadious justify-center items-end pb-2 rounded-full w-14 h-10 
            ${
              isActive === 2
                ? "  bg-darkBluePrimary text-black duration-300 transform ease-liner -translate-y-5"
                : "text-white"
            }`}
              >
                <MdPeopleAlt className="z-10" />
                <MdPeopleAlt className="text-gray-400 translate-y-[2px] absolute" />
              </span>
            </a>
          </li>
          <li
            className="relative  flex justify-center z-20"
            onClick={() => onClikHandle(3)}
          >
            <a href="#" className="relative">
              <span
                className={` relative flex dropRadious justify-center items-end pb-2 rounded-full w-14 h-10 
            ${
              isActive === 3
                ? " bg-darkBluePrimary text-black duration-300 transform ease-linear -translate-y-5"
                : "text-white"
            }`}
              >
                <HiPhoto className="z-10" />
                <HiPhoto className="text-gray-400 translate-y-[2px] absolute" />
              </span>
            </a>
          </li>
          <div
            style={{ transform: value ? `translateX(${value}px)` : "" }}
            className={`bottom-3${
              value
                ? ` indicator z-10 absolute w-[72px] h-14 duration-300 transform ease-linear bg-gradient-to-t from-white from-60%  to-80% dropRadious `
                : ""
            }
          
        `}
          ></div>
        </ul>
      </div>
    </div>
  );
}
