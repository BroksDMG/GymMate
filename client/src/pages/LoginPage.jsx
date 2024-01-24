import LoginForm from "../components/LoginForm";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";
import graphicGymRoomRegisterDesk from "../assets/graphicGymRoomRegisterDesk.svg";
import TextRegister from "../components/TextRegister";
import TextLogin from "../components/TextLogin";
import graphicGymRoomLogin from "../assets/graphicGymRoomLogin.svg";
function LoginPage() {
  const [isRegistrationForm, setISRegistrationForm] = useState(true);
  const toggleForm = () => {
    setISRegistrationForm(!isRegistrationForm);
  };
  return (
    <div
      className={`flex flex-col items-center relative h-screen  bg-cover bg-center bg-no-repeat
        ${
          isRegistrationForm
            ? "lg:flex-row-reverse  bg-profil-background-right"
            : "lg:flex-row  bg-profil-background-left"
        }`}
    >
      {isRegistrationForm ? (
        <>
          <div className="my-3 flex w-full justify-around lg:w-1/2 lg:flex-col lg:h-full lg:justify-start lg:pt-10">
            <a href="#" className="flex justify-center">
              <img
                src={logo}
                alt="logo"
                className="w-48  object-center block lg:w-64"
              />
            </a>
            <TextLogin style="flex lg:hidden" />
          </div>

          <motion.div
            className="w-full flex h-screen items-center "
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginForm toggleForm={toggleForm} />
          </motion.div>
          <div className="hidden overflow-hidden z-10 pointer-events-none absolute lg:block translate-y-32  lg:right-1/4 lg:translate-x-64 xl:right-1/3 xl:translate-x-96 ">
            <a href="#" className="relative block overflow-hidden">
              <TextLogin style="absolute right-3 -top-1 hidden lg:flex " />
              <img
                src={graphicGymRoomLogin}
                alt="logo"
                className="w-[41rem] overflow-hidden"
              />
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="my-3 flex w-full justify-around lg:w-1/2 lg:flex-col lg:h-full lg:justify-start lg:pt-10">
            <a href="#" className="flex justify-center">
              <img
                src={logo}
                alt="logo"
                className=" w-48  object-center block lg:w-64"
              />
            </a>
            <TextRegister style={"flex lg:hidden"} />
          </div>
          <div className="hidden overflow-hidden z-10 pointer-events-none absolute lg:block lg:left-1/4 lg:-translate-x-72 translate-y-32 xl:left-1/3 xl:-translate-x-96">
            <a href="#" className="relative tr">
              <TextRegister style="absolute left-1 top-5 hidden lg:flex" />
              <img
                src={graphicGymRoomRegisterDesk}
                alt="logo"
                className="w-[42rem]"
              />
            </a>
          </div>
          <motion.div
            className="w-full flex h-screen items-center"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RegisterForm toggleForm={toggleForm} />
          </motion.div>
        </>
      )}
    </div>
  );
}

export default LoginPage;
