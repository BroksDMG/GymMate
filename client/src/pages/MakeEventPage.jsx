import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PhotosUploder from "../components/PhotosUploder";
import { Navigate, useParams } from "react-router-dom";
import Stars from "../components/Stars";
import logoWithBorder from "../assets/logoWithBorder.svg";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import { UserContext } from "../components/UserContext";

import * as Yup from "yup";
function MakeEventPage() {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [rating, setRating] = useState(0);
  const [temRating, setTemRating] = useState(0);
  const { user } = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    if (!id) return;

    axios.get("/events/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      4;

      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setExperience(data.experience);
      setDate(data.date);
      setmaxGuests(data.maxGuests);
    });
  }, [id]);

  const messageArr = ["Beginner", "Intermediate", "Proffesional"];
  // const experienceArr = ["junior", "mid", "senior"];

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
  const initialValues = {
    title: "",
    address: "",
    addedPhotos: [],
    description: "",
    experience: "",
    date: "",
    maxGuests: 1,
    avatar: user.avatar ? user.avatar : [],
  };
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
  console.log(user?.avatar);
  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-10 lg:px-32">
      <Formik
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnMount={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={handleSubmitSaveEvent}
      >
        {({ values, errors, handleChange, setFieldValue }) => {
          function handleExpClick(value) {
            setRating(value);
            let experienceLevel;
            if (value === 1) {
              experienceLevel = "junior";
            } else if (value === 2) {
              experienceLevel = "mid";
            } else if (value === 3) {
              experienceLevel = "senior";
            }

            setFieldValue("experience", experienceLevel);
          }
          const handlePhotosChange = (photos) => {
            setFieldValue("addedPhotos", photos);
            console.log(photos);
          };

          return (
            <Form className=" flex  items-center flex-col lg:justify-normal lg:flex-col lg:items-start lg:mb-10">
              {console.log(errors)}
              <a href="#" className="absolute -top-20  lg:-top-32 ">
                <img
                  src={logoWithBorder}
                  alt="logoBorder"
                  className="w-52 lg:w-full "
                />
              </a>
              <div className="flex flex-col mt-20 lg:mt-32 w-full border-2 rounded-2xl relative ">
                {/* <AddingPhotoByLink onChange={setAddedPhotos} /> */}
                <PhotosUploder
                  addedPhotos={values.addedPhotos}
                  onChange={handlePhotosChange}
                />
                <div className="px-16 sm:flex  w-full sm">
                  <div className=" flex-col items-center pt-20 w-1/2">
                    <div className=" absolute top-24 flex justify-center items-center w-[10rem] h-[10rem] bg-white rounded-full  ">
                      {user.avatar?.length > 0 ? (
                        <img
                          className="w-[9rem] h-[9rem] rounded-full object-cover object-center"
                          src={
                            "http://127.0.0.1:4000/uploads/" + user?.avatar[0]
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://img.freepik.com/free-photo/elf-woman-forest_71767-117.jpg?w=826&t=st=1699015819~exp=1699016419~hmac=74e1f2bd99b8e2de4489799ab8476301c1747e33fbb6fb1d6da863b5c6230ca6"
                          alt="profileImg"
                          className="w-[9rem] h-[9rem] rounded-full object-cover object-center  "
                        />
                      )}
                    </div>
                    <p className="font-bold text-3xl">
                      {user?.name} {user?.surname}
                    </p>
                    <InputField
                      name="title"
                      type="text"
                      value={values["title"]}
                      onChange={handleChange}
                    >
                      Title
                    </InputField>
                    <div className="lg:flex ">
                      <div className="flex flex-col w-full">
                        <p className="text-gray-500 text-sm">
                          Zaznacz swoj poziom zaawansowania :{" "}
                          {messageArr[temRating ? temRating - 1 : rating - 1]}
                        </p>
                        <Stars
                          quantity={3}
                          high={"60"}
                          setRatingOutComponent={handleExpClick}
                          setTempRatingOutComponent={setTemRating}
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <p className="text-gray-500 text-sm">
                          Lokacja wydarzenia
                        </p>
                        <InputField
                          name="address"
                          type="text"
                          value={values["address"]}
                          onChange={handleChange}
                        >
                          Address
                        </InputField>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <p className="text-gray-500 text-sm">Opis wydarzenia</p>
                    <InputField
                      name="description"
                      type="text"
                      value={values["description"]}
                      inputHeight="150"
                      onChange={handleChange}
                    >
                      Description
                    </InputField>
                    <div className="lg:flex mt-2 gap-5">
                      <div className="flex flex-col">
                        <h3 className="text-lg ">Kiedy?</h3>
                        <InputField
                          name="date"
                          type="date"
                          placeholder="title, for example: dear GymMate users"
                          className=" border p-4 rounded-lg text-2xl"
                          value={values["date"]}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg ">Ile osób?</h3>
                        <InputField
                          name="maxGuests"
                          type="number"
                          value={values["maxGuests"]}
                          onChange={handleChange}
                        >
                          Number
                        </InputField>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Button type="submit" bgColor={"bg-mediumBlue"}>
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default MakeEventPage;
