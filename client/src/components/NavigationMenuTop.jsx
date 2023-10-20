import { useState } from "react";
import { BiSolidMessageDots } from "react-icons/bi";
import { BsHouseDoorFill, BsFillPersonFill } from "react-icons/bs";
import { RiSettings4Fill } from "react-icons/ri";
import { FaFileExport } from "react-icons/fa6";
export default function NavigationMenuTop() {
  const [isActive, setIsActive] = useState(0);
  const [value, setValue] = useState(null);
  function onClikHandle(num) {
    setIsActive(num);
    switch (true) {
      case num === 1:
        setValue(-8);
        break;
      case num === 2:
        setValue(48);
        break;
      case num === 3:
        setValue(104);
        break;
      case num === 4:
        setValue(160);
        break;
      case num === 5:
        setValue(216);
        break;
      default:
        break;
    }
  }
  return (
    <div className="fixed bg-orange-400 h-[65px] top-0 ">
      <div className="fixed left-1/2 transform -translate-x-1/2 top-0 flex justify-center items-center w-96 shadow-md shadow-gray-700 rounded-b-md">
        <div className="fixed left-1/2 transform -translate-x-1/2 top-0 flex justify-center items-center w-96 h-10 z-10 bg-white text-white rounded-b-md ">
          {"s"}
        </div>
        <ul className="flex text-2xl items">
          <li
            className="relative flex justify-center z-30"
            onClick={() => onClikHandle(1)}
          >
            <a href="#" className="relative">
              <span
                className={`text-xl relative flex dropRadiousTop justify-center items-end pb-[10px] rounded-full w-14 h-10
            ${
              isActive === 1
                ? " bg-white text-black duration-300 transform ease-linear translate-y-5 shadow-md shadow-gray-700"
                : "text-darkBluePrimary"
            }`}
              >
                <BsHouseDoorFill className="z-10" />
                <BsHouseDoorFill className="absolute text-gray-300 translate-y-[2px]" />
              </span>
            </a>
          </li>
          <li
            className="relative flex justify-center z-30"
            onClick={() => onClikHandle(2)}
          >
            <a href="#" className="relative ">
              <span
                className={` relative flex dropRadiousTop justify-center items-end pb-2 rounded-full w-14 h-10
            ${
              isActive === 2
                ? "  bg-white text-black duration-300 transform ease-linear translate-y-5 shadow-md shadow-gray-700"
                : "text-darkBluePrimary"
            }`}
              >
                <BsFillPersonFill className="z-10" />
                <BsFillPersonFill className="absolute text-gray-300 translate-y-[2px]" />
              </span>
            </a>
          </li>
          <li
            className="relative  flex justify-center z-30"
            onClick={() => onClikHandle(3)}
          >
            <a href="#" className="relative">
              <span
                className={` relative flex dropRadiousTop justify-center items-end pb-2 rounded-full w-14 h-10 
            ${
              isActive === 3
                ? " bg-white text-black duration-300 transform ease-linear translate-y-5 shadow-md shadow-gray-700"
                : "text-darkBluePrimary"
            }`}
              >
                <BiSolidMessageDots className="z-10" />
                <BiSolidMessageDots className="absolute text-gray-300 translate-y-[2px]" />
              </span>
            </a>
          </li>
          <li
            className="relative  flex justify-center z-30"
            onClick={() => onClikHandle(4)}
          >
            <a href="#" className="relative">
              <span
                className={` relative flex dropRadiousTop justify-center items-end pb-2 rounded-full w-14 h-10 
            ${
              isActive === 4
                ? " bg-white text-black duration-300 transform ease-linear translate-y-5 shadow-md shadow-gray-700"
                : "text-darkBluePrimary"
            }`}
              >
                <RiSettings4Fill className="z-10" />
                <RiSettings4Fill className="absolute text-gray-300 translate-y-[2px]" />
              </span>
            </a>
          </li>
          <li
            className="relative  flex justify-center z-30"
            onClick={() => onClikHandle(5)}
          >
            <a href="#" className="relative">
              <span
                className={` relative flex dropRadiousTop justify-center items-end pb-2 rounded-full w-14 h-10 
            ${
              isActive === 5
                ? " bg-white text-black duration-300 transform ease-linear translate-y-5 shadow-md shadow-gray-700"
                : "text-darkBluePrimary"
            }`}
              >
                <FaFileExport className="z-10" />
                <FaFileExport className="absolute text-gray-300 translate-y-[2px]" />
              </span>
            </a>
          </li>
          <div
            className={`top-3 ${
              value
                ? `indicatorTop z-20 absolute w-[72px] h-14 translate-x-[${value}px] duration-300 transform ease-linear bg-darkBluePrimary  to-80% dropRadiousTop`
                : " "
            }
          
        `}
          ></div>
          <div
            className={`-top-3 ${
              value
                ? `z-0 absolute w-[108px] h-20 translate-x-[${
                    value - 18
                  }px] duration-300 transform ease-linear bg-darkBluePrimary  to-80% dropRadiousTop`
                : " "
            } `}
          ></div>
        </ul>
      </div>
    </div>
  );
}
