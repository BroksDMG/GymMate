import { useContext, useState } from "react";
import InputField from "./InputField";
import { motion } from "framer-motion";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import graphicGymRoomLogin from "../assets/graphicGymRoomLogin.svg";
import Button from "./Button";
import { RiArrowRightSFill } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";
function LoginForm({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const handelLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      console.log(data);
      setUser(data);
      alert("Login succefsul");
      setRedirect(true);
    } catch {
      alert("something went wrong");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <motion.form
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white h-full rounded-t-3xl min-w-min
        lg:rounded-tl-none lg:rounded-r-[2rem]"
        onSubmit={handelLoginSubmit}
      >
        <div className="w-full h-full px-8 flex flex-col justify-center items-center">
          <label className="text-3xl w-full  mt-12 h-1/6 flex relative md:w-3/4  lg:w-full lg:text-6xl">
            <span className="z-10  flex font-bold absolute top-0 left-0 lg:left-24 le lg:top-10">
              Login
              <div className="relative -translate-y-1 text-5xl translate-x-3 lg:text-7xl">
                <TbSquareRoundedArrowRightFilled className="z-10 absolute top-0 left-0" />
                <TbSquareRoundedArrowRightFilled className="z-0 absolute top-[2px] text-gray-600 left-0 lg:top-1" />
              </div>
            </span>
            <span className="z-0 block font-bold absolute top-[2px] text-gray-600 left-0 lg:left-24 lg:top-11">
              Login
            </span>
          </label>
          <label className="w-full h-full flex flex-col justify-center min-w-min max-h-max md:w-3/4 lg:w-full lg:pr-[30%] lg:h-1/2 lg:pb-10">
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
              Hasło
            </InputField>
            <div className="flex w-full gap-5 items-end  mt-5">
              <div className="w-full">
                <span className=" text-darkBluePrimary text-[10px] font-semibold lg:text-sm">
                  New here?
                </span>
                <Link to={"/register"} className="w-full">
                  <Button
                    style="bg-darkBluePrimary text-[10px] lg:text-base"
                    onClick={() => toggleForm()}
                  >
                    Create Account
                    <AiFillCheckCircle className="text-base relative translate-x-1 lg:text-xl" />
                  </Button>
                </Link>
              </div>
              <Button style="bg-darkBluePrimary text-[10px] lg:text-base">
                Log in
                <RiArrowRightSFill className="text-base relative lg:text-2xl" />
              </Button>
            </div>
          </label>
          <label className=" w-full flex justify-center -translate-x-4 lg:hidden">
            <a href="#" className="">
              <img
                src={graphicGymRoomLogin}
                alt="gym"
                className="w-80 object-cover object-center"
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
            <div className=" text-3xl mt-5 ">Nie masz konta?</div>
            <div className=" text-3xl my-5 ">Kliknij poniżej</div>
            <Link to={"/register"} className="w-full">
              <button
                onClick={toggleForm}
                className=" bg-darkBluePrimary w-full"
              >
                Zarejestruj się
              </button>
            </Link>
          </label>
          <label className="h-1/3 "></label>
        </div>
      </motion.form> */}
    </>
  );
}

export default LoginForm;
