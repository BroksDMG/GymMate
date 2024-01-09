import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailRegex, messages } from "../utils/constanst";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsPersonVcardFill } from "react-icons/bs";
import InputField from "./InputField";
import Button from "./Button";
import { RiArrowRightSFill } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import graphicGymRoomRegister from "../assets/graphicGymRoomRegister.svg";
import PropsTypes from "prop-types";
function RegisterForm({ toggleForm }) {
  const handleSubmit = async (values) => {
    await axios
      .post("/register", {
        ...values,
      })
      .then(() => {
        toast.success("Registration succesful, now you can log in");
      })
      .catch(({ response }) => {
        console.log(response.status);
        if (response.status === 409) toast.error("Email already in use");
        else toast.error("Registration failed");
      });
  };
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(messages.fieldRequired),
    surname: Yup.string().required(messages.fieldRequired),
    email: Yup.string()
      .email(messages.invalidEmail)
      .matches(emailRegex, messages.invalidEmail)
      .required(messages.fieldRequired),
    password: Yup.string().required(messages.fieldRequired),
    confirmPassword: Yup.string()
      .required(messages.fieldRequired)
      .oneOf([Yup.ref("password"), null], messages.passwordsDontMatch),
  });

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
        {({ handleSubmit, values, handleChange, errors }) => (
          <Form
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white h-full rounded-t-3xl min-w-min
        lg:rounded-tr-none lg:rounded-l-[2rem] "
            onSubmit={handleSubmit}
          >
            <div className="w-full h-full px-8 flex flex-col justify-center items-center ">
              <label className=" text-3xl w-full  mt-12 h-1/6 flex relative md:w-3/4  lg:w-full lg:text-6xl">
                <span
                  style={{ filter: "drop-shadow(0px 3px 0px  gray)" }}
                  className=" z-10  flex font-bold gap-2"
                >
                  <p> Create Account</p>
                  <div
                    style={{ filter: "drop-shadow(0px 3px 0px  gray)" }}
                    className="relative -translate-y-1 text-5xl  lg:text-7xl"
                  >
                    <BsPersonVcardFill className=" z-10 absolute top-0 left-0 " />
                  </div>
                </span>
              </label>
              <label className="w-full h-full flex flex-col justify-center min-w-min max-h-max md:w-3/4 lg:w-full lg:pl-[30%] lg:h-1/2 lg:pb-10">
                <div className="flex gap-4">
                  <InputField
                    name="name"
                    error={errors.name}
                    value={values["name"]}
                    onChange={handleChange}
                    autoFocus
                  >
                    Name
                  </InputField>
                  <InputField
                    name="surname"
                    error={errors.surname}
                    value={values["surname"]}
                    onChange={handleChange}
                  >
                    Surname
                  </InputField>
                </div>
                <InputField
                  name="email"
                  type="email"
                  value={values["email"]}
                  onChange={handleChange}
                  error={errors.email}
                >
                  Email
                </InputField>
                <InputField
                  name="password"
                  type="password"
                  value={values["password"]}
                  onChange={handleChange}
                  error={errors.password}
                >
                  Password
                </InputField>
                <InputField
                  name="confirmPassword"
                  type="password"
                  value={values["confirmPassword"]}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                >
                  Confirm Password
                </InputField>
                <div className="flex w-full gap-5 items-end  mt-5">
                  <Button
                    type="submit"
                    textSize="text-[10px] sm:text-xs lg:text-base"
                  >
                    Create Account
                    <AiFillCheckCircle className="text-xs sm:text-base relative translate-x-1 lg:text-xl" />
                  </Button>
                  <div className="w-full">
                    <span className=" text-darkBluePrimary text-[10px] font-semibold lg:text-sm">
                      Already have an account?
                    </span>
                    <Link to={"/login"} className="w-full">
                      <Button
                        textSize="text-[10px] sm:text-xs lg:text-base"
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
          </Form>
        )}
      </Formik>
    </>
  );
}

RegisterForm.propTypes = {
  toggleForm: PropsTypes.func,
};
export default RegisterForm;
