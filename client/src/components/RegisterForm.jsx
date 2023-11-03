import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsPersonVcardFill } from "react-icons/bs";
import InputField from "./InputField";
import Button from "./Button";
import { RiArrowRightSFill } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import graphicGymRoomRegister from "../assets/graphicGymRoomRegister.svg";
function RegisterForm({ toggleForm }) {
  const [name, setName] = useState("");
  const [surname, SetSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handelRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        surname,
        email,
        password,
      });
      alert("Registration succesful, now you can log i");
    } catch {
      alert("Registration failde. Please try again later");
    }
  };
  return (
    <>
      <motion.form
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white h-full rounded-t-3xl min-w-min
        lg:rounded-tr-none lg:rounded-l-[2rem] "
        onSubmit={handelRegisterSubmit}
      >
        <div className="w-full h-full px-8 flex flex-col justify-center items-center ">
          <label className=" text-3xl w-full  mt-12 h-1/6 flex relative md:w-3/4  lg:w-full lg:text-6xl">
            <span className=" z-10  flex font-bold absolute top-0 left-0 lg:left-24 le lg:top-10">
              Create Account
              <div className="relative -translate-y-1 text-5xl translate-x-8 lg:text-7xl">
                <BsPersonVcardFill className=" z-10 absolute top-0 left-0 " />
                <BsPersonVcardFill className=" z-0 absolute top-[2px] text-gray-600 left-0 lg:top-1" />
              </div>
            </span>
            <span className=" z-0 block font-bold absolute top-[2px] text-gray-600 left-0 lg:left-24 lg:top-11">
              Create Account
            </span>
          </label>
          <label className="w-full h-full flex flex-col justify-center min-w-min max-h-max md:w-3/4 lg:w-full lg:pl-[30%] lg:h-1/2 lg:pb-10">
            <div className="flex gap-4">
              <InputField
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              >
                Name
              </InputField>
              <InputField
                value={surname}
                onChange={(ev) => SetSurname(ev.target.value)}
              >
                Surname
              </InputField>
            </div>
            <InputField
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            >
              Email
            </InputField>
            <InputField
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            >
              Password
            </InputField>
            <div className="flex w-full gap-5 items-end  mt-5">
              <Button style="bg-darkBluePrimary text-[10px] lg:text-base">
                Create Account
                <AiFillCheckCircle className="text-base relative translate-x-1 lg:text-xl" />
              </Button>
              <div className="w-full">
                <span className=" text-darkBluePrimary text-[10px] font-semibold lg:text-sm">
                  Already have an account?
                </span>
                <Link to={"/login"} className="w-full">
                  <Button
                    style="bg-darkBluePrimary text-[10px] lg:text-base"
                    onClick={() => toggleForm()}
                  >
                    Log in
                    <RiArrowRightSFill className="text-base relative lg:text-2xl" />
                  </Button>
                </Link>
              </div>
            </div>
          </label>
          <label className="w-full lg:hidden">
            <a
              href="#"
              className=" w-full h-full flex justify-center -translate-x-4"
            >
              <img
                src={graphicGymRoomRegister}
                alt="gym"
                className="w-64 object-cover object-center"
              />
            </a>
          </label>
        </div>
      </motion.form>
      {/* <motion.form
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-stone-700 h-full flex flex-col items-center justify-center rounded-r-3xl"
      >
        <div className="w-full h-full px-32 flex flex-col justify-center items-center">
          <label className="w-full h-1/3 pt-10"></label>
          <label className="h-1/3 w-full flex flex-col items-center justify-center min-w-min">
            <div className=" text-3xl mt-5 ">Masz już konto?</div>
            <div className=" text-3xl my-5 ">Kliknij poniżej</div>
            <Link to={"/login"} className="w-full">
              <button
                onClick={toggleForm}
                className=" bg-darkBluePrimary w-full"
              >
                Zaloguj się
              </button>
            </Link>
          </label>
          <label className="h-1/3 "></label>
        </div>
      </motion.form> */}
    </>
  );
}

export default RegisterForm;
