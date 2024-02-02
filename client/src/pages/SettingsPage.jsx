import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import logoWithBorder from "../assets/logoWithBorder.svg";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import { UserContext } from "../components/UserContext";
import { BiSolidCalendarPlus } from "react-icons/bi";
import * as Yup from "yup";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RiArrowRightSFill } from "react-icons/ri";
function SettingsPage() {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);

  const [existedEvent, setExistedEvent] = useState({
    title: "",
    address: "",
    addedPhotos: [],
    description: "",
    experience: "",
    date: "",
    maxGuests: 1,
    // avatar: user?.avatar ? user?.avatar : [],
  });
  useEffect(() => {
    if (!id) return;

    axios.get("/events/" + id).then((response) => {
      const { data } = response;
      setExistedEvent({
        title: data.title,
        address: data.address,
        addedPhotos: data.photos,
        description: data.description,
        experience: data.experience,
        date: data.date,
        maxGuests: data.maxGuests,
      });
      // setTitle(data.title);
      // 4;
      // setAddress(data.address);
      // setAddedPhotos(data.photos);
      // setDescription(data.description);
      // setExperience(data.experience);
      // setDate(data.date);
      // setmaxGuests(data.maxGuests);
    });
  }, [id, user?.avatar]);
  async function handleSubmitSaveEvent(values) {
    if (id) {
      ///update
      await axios.put("/events", {
        id,
        ...values,
      });
      setRedirect(true);
    } else {
      //new event
      await axios.post("/events", { ...values });
      setRedirect(true);
    }
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    address: Yup.string().required("Address is required"),
    description: Yup.string().required("Description is required"),
    experience: Yup.string().required("Experience is required"),
    date: Yup.date().required("Date is required"),
    maxGuests: Yup.number().required("Max guests is required"),
  });
  if (redirect) {
    return <Navigate to="/events" />;
  }
  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-1 sm:px-10 lg:px-32">
      <Formik
        initialValues={{
          title: existedEvent.title ? existedEvent.title : "",
          address: existedEvent.address || "",
          addedPhotos: existedEvent.addedPhotos || [],
          description: existedEvent.description || "",
          experience: existedEvent.experience || "",
          date: existedEvent.date || "",
          maxGuests: existedEvent.maxGuests || 1,
          avatar: user?.avatar ? user?.avatar : [],
        }}
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnMount={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={handleSubmitSaveEvent}
      >
        {({ values, errors, handleChange, setFieldValue }) => {
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
                  <div className="flex w-full gap-5 items-end  my-5">
                    <div className="w-full">
                      <div className="w-full">
                        <Button textSize="text-[10px] sm:text-base lg:text-lg">
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
