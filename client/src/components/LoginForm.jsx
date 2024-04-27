import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "./InputField";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import graphicGymRoomLogin from "../assets/graphicGymRoomLogin.svg";
import Button from "./Button";
import { RiArrowRightSFill } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsBell } from "react-icons/bs";

import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import PropsTypes from "prop-types";

function LoginForm({ toggleForm }) {
  const [redirect, setRedirect] = useState(false);
  const { setUser, user } = useContext(UserContext);
  const location = useLocation();
  const handleSubmit = async (values) => {
    await axios
      .post("/user/login", { ...values })
      .then(({ data }) => {
        setUser(data);
        toast.success("Login succesful");
        setRedirect(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed, incorrect email or password");
      });
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  if (redirect || (user && location.pathname !== "/login")) {
    return <Navigate to={"/events"} />;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors }) => (
          <Form
            className="w-full bg-white h-full rounded-t-3xl min-w-min
lg:rounded-tl-none lg:rounded-r-[2rem]"
            onKeyDown={(e) => {
              // Check if the Enter key was pressed
              if (e.key === "Enter") {
                // Prevent the default action
                e.preventDefault();
                // Submit the form
                handleSubmit(values);
              }
            }}
          >
            <div className="w-full h-full px-8 flex flex-col justify-center items-center">
              <label className="text-3xl w-full sm:mt-16 md:mt-32 lg:mt-0 flex relative md:w-3/4  lg:w-full lg:text-6xl">
                <div
                  style={{ filter: "drop-shadow(0px 3px 0px  gray)" }}
                  className="z-10 mt-10 flex font-bold  "
                >
                  <p>Login</p>
                  <div
                    style={{ filter: "drop-shadow(0px 3px 0px  gray)" }}
                    className="relative -translate-y-1 text-5xl translate-x-3 lg:text-7xl"
                  >
                    <TbSquareRoundedArrowRightFilled className="z-10 top-0 left-0" />
                    {/* <TbSquareRoundedArrowRightFilled className="z-0 absolute top-[2px] text-gray-600 left-0 lg:top-1" /> */}
                  </div>
                </div>
                <div className=" hidden sm:flex w-full lg:flex justify-center text-3xl text-white ml-2 first-letter:">
                  <div className=" w-96 h-40 rounded-3xl bg-darkBluePrimary relative px-3">
                    <div className="flex justify-center items-center rounded-full border-[4px] border-white h-16 w-16  bg-darkBluePrimary absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <BsBell />
                    </div>
                    <article>
                      <p className=" uppercase tracking-widest font-semibold mt-8 text-center text-base">
                        attention
                      </p>
                      <p className="text-center  text-sm">
                        If you are a recruiter, use a ready-made test account or
                        create your own account ;)
                      </p>
                      <p className="text-base flex flex-col text-center font-semibold">
                        <span>email: GymMate@email.com</span>{" "}
                        <span>passowrd: GymMatePassword#1</span>
                      </p>
                    </article>
                  </div>
                </div>
              </label>
              <label className="w-full h-full flex flex-col justify-center sm:gap-2 lg:gap-0 min-w-min  md:w-3/4 lg:w-full lg:pr-[30%] lg:h-1/2 lg:pb-10">
                <InputField
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                  error={errors.email}
                  value={values["email"]}
                  required
                  autoFocus
                >
                  Email
                </InputField>
                <InputField
                  name="password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  error={errors.password}
                  required
                  value={values["password"]}
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
                        textSize="text-[10px] sm:text-xs lg:text-base"
                        onClick={() => toggleForm()}
                      >
                        Create Account
                        <AiFillCheckCircle className="text-xs sm:text-base relative translate-x-1 lg:text-xl" />
                      </Button>
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    textSize="text-[10px] sm:text-xs lg:text-base"
                  >
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
          </Form>
        )}
      </Formik>
    </>
  );
}

LoginForm.propTypes = {
  toggleForm: PropsTypes.func,
};

export default LoginForm;
