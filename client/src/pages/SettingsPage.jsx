import axios from "axios";
import { useContext } from "react";
import logoWithBorder from "../assets/logoWithBorder.svg";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import { UserContext } from "../components/UserContext";
import * as Yup from "yup";
import { RiArrowRightSFill } from "react-icons/ri";
import { emailRegex, messages } from "../utils/constanst";
function SettingsPage() {
  const { user } = useContext(UserContext);
  async function handleSubmitSettings(values) {
    console.log(values);
    if (!user._id) return;
    const { confirmNewPassword, ...settings } = values;
    await axios.put("/user/settings", {
      userId: user._id,
      settings,
    });
    console.log(settings);
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(messages.fieldRequired),
    surname: Yup.string().required(messages.fieldRequired),
    email: Yup.string()
      .email(messages.invalidEmail)
      .matches(emailRegex, messages.invalidEmail)
      .required(messages.fieldRequired),
    oldPassword: Yup.string().required(messages.fieldRequired),
    newPassword: Yup.string().required(messages.fieldRequired),
    confirmNewPassword: Yup.string()
      .required(messages.fieldRequired)
      .oneOf([Yup.ref("newPassword"), null], messages.passwordsDontMatch),
  });
  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-1 sm:px-10 lg:px-32">
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnMount={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={handleSubmitSettings}
      >
        {({ values, errors, handleChange }) => {
          return (
            <Form className=" flex  items-center flex-col lg:justify-normal lg:flex-col lg:items-start lg:mb-10">
              <a href="#" className="absolute -top-20  lg:-top-32 select-none">
                <img
                  src={logoWithBorder}
                  alt="logoBorder"
                  className="w-52 lg:w-full "
                />
              </a>

              <div className="flex flex-col mt-28 sm:mt-20  lg:mt-32 w-full border-2 rounded-2xl relative px-10 shadow-md shadow-gray-400">
                <label className="w-full h-full flex flex-col justify-center min-w-min max-h-max lg:w-full sm:gap-2 lg:gap-0 ">
                  <span className=" text-center text-3xl font-bold mt-5">
                    SETTINGS
                  </span>
                  <div className="flex gap-4">
                    {console.log(errors)}
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
                    name="oldPassword"
                    type="password"
                    value={values["oldPassword"]}
                    onChange={handleChange}
                    error={errors.oldPassword}
                  >
                    Old Password
                  </InputField>
                  <InputField
                    name="newPassword"
                    type="password"
                    value={values["newPassword"]}
                    onChange={handleChange}
                    error={errors.newPassword}
                  >
                    New Password
                  </InputField>
                  <InputField
                    name="confirmNewPassword"
                    type="password"
                    value={values["confirmNewPassword"]}
                    onChange={handleChange}
                    error={errors.confirmNewPassword}
                  >
                    Confirm New Password
                  </InputField>
                  <div className="flex w-full gap-5 items-end  my-5">
                    <div className="w-full">
                      <div className="w-full">
                        <Button
                          type="submit"
                          textSize="text-[10px] sm:text-base lg:text-lg"
                        >
                          Save Changes
                          <RiArrowRightSFill className="text-base relative lg:text-2xl" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SettingsPage;
