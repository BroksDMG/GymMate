import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { BiSolidMessageDots } from "react-icons/bi";
import { BsHouseDoorFill, BsFillPersonFill } from "react-icons/bs";
import { RiSettings4Fill } from "react-icons/ri";
import { FaFileExport } from "react-icons/fa6";
import { Navigate } from "react-router-dom";
import axios from "axios";
export default function NavigationMenuTop() {
  const [isActive, setIsActive] = useState(0);
  const [value, setValue] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (redirect === "/login") {
      setUser(null);
    }
  }, [redirect, setUser]);
  async function logout() {
    onClikHandle(5);
    await axios.post("/logout");
    setRedirect("/login");
  }
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  function onClikHandle(num) {
    setIsActive(num);
    const valueMap = {
      1: -8,
      2: 48,
      3: 104,
      4: 160,
      5: 216,
    };

    if (valueMap[num] !== undefined) {
      setValue(valueMap[num]);
    }
  }

  return (
    <div className="fixed bg-orange-400 h-[65px] top-0 z-50 ">
      <div className="fixed left-1/2 transform -translate-x-1/2 top-0 flex justify-center items-center w-96 shadow-md shadow-gray-700 rounded-b-md">
        <div className="fixed left-1/2 transform -translate-x-1/2 top-0 flex justify-center items-center w-96 h-10 z-10 bg-white text-white rounded-b-md ">
          {"s"}
        </div>
        <ul className="flex text-2xl items">
          <li
            className="relative flex justify-center z-30"
            onClick={() => onClikHandle(1)}
          >
            <div href="#" className="relative">
              <Link
                to={"/events"}
                className={`text-xl relative flex dropRadiousTop justify-center items-end pb-[10px] rounded-full w-14 h-10
            ${
              isActive === 1
                ? " bg-white text-black duration-300 transform ease-linear translate-y-5 shadow-md shadow-gray-700"
                : "text-darkBluePrimary"
            }`}
              >
                <BsHouseDoorFill className="z-10" />
                <BsHouseDoorFill className="absolute text-gray-300 translate-y-[2px]" />
              </Link>
            </div>
          </li>
          <li
            className="relative flex justify-center z-30"
            onClick={() => onClikHandle(2)}
          >
            <div href="#" className="relative ">
              <Link
                to={"/account"}
                className={` relative flex dropRadiousTop justify-center items-end pb-2 rounded-full w-14 h-10
            ${
              isActive === 2
                ? "  bg-white text-black duration-300 transform ease-linear translate-y-5 shadow-md shadow-gray-700"
                : "text-darkBluePrimary"
            }`}
              >
                <BsFillPersonFill className="z-10" />
                <BsFillPersonFill className="absolute text-gray-300 translate-y-[2px]" />
              </Link>
            </div>
          </li>
          <li
            className="relative  flex justify-center z-30"
            onClick={() => onClikHandle(3)}
          >
            <div href="#" className="relative">
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
            </div>
          </li>
          <li
            className="relative  flex justify-center z-30"
            onClick={() => onClikHandle(4)}
          >
            <div href="#" className="relative">
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
            </div>
          </li>
          <li className="relative  flex justify-center z-30">
            <div href="#" className="relative">
              <button
                onClick={() => logout()}
                className={` relative flex dropRadiousTop justify-center items-end pb-2 rounded-full w-14 h-10 
            ${
              isActive === 5
                ? " bg-white text-black duration-300 transform ease-linear translate-y-5 shadow-md shadow-gray-700"
                : "text-darkBluePrimary"
            }`}
              >
                <FaFileExport className="z-10" />
                <FaFileExport className="absolute text-gray-300 translate-y-[2px]" />
              </button>
            </div>
          </li>
          <div
            style={{ transform: value ? `translateX(${value}px)` : "" }}
            className={`top-3 ${
              value
                ? `indicatorTop z-20 absolute w-[72px] h-14 duration-300 transform ease-linear bg-darkBluePrimary  to-80% dropRadiousTop`
                : " "
            }
          
        `}
          ></div>
          <div
            style={{ transform: value ? `translateX(${value - 18}px)` : "" }}
            className={`-top-3  ${
              value
                ? `z-0 absolute w-[108px] h-20  duration-300 transform ease-linear bg-darkBluePrimary  to-80% dropRadiousTop`
                : " "
            } `}
          ></div>
        </ul>
      </div>
    </div>
  );
}
