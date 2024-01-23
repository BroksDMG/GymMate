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
import TextAreaField from "../components/TextAreaField";
import DateInputField from "../components/DateInputField";
import { BiSolidCalendarPlus } from "react-icons/bi";
import * as Yup from "yup";
import useGetImagesFromDataBase from "../components/hooks/useGetImagesFromDataBase";
import useImagesFromBinaryArray from "../components/hooks/useBinaryToImage";
function MakeEventPage() {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [rating, setRating] = useState(0);
  const [temRating, setTemRating] = useState(0);
  const { user } = useContext(UserContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [imagesData, setImagesData] = useState([]);
  let starSize;
  useEffect(() => {
    const hanldeResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", hanldeResize);
    return () => {
      window.removeEventListener("resize", hanldeResize);
    };
  }, [screenWidth]);
  starSize = screenWidth > 640 ? "60" : "45";
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
    if (user?.avatar) {
      setImagesData(user.avatar);
    }
  }, [user?.avatar]);
  const [downloadedImagesGallery, errorDownload] =
    useGetImagesFromDataBase(imagesData);
  if (errorDownload) console.error(errorDownload);
  const imageUrlsAvatar = useImagesFromBinaryArray(downloadedImagesGallery);
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
      if (data.experience === "Beginner") {
        setRating(1);
      } else if (data.experience === "Intermediate") {
        setRating(2);
      } else if (data.experience === "Advanced") {
        setRating(3);
      }
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

  const experienceArr = ["Beginner", "Intermediate", "Advanced"];
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
    title: existedEvent.title ? existedEvent.title : "",
    address: existedEvent.address || "",
    addedPhotos: existedEvent.addedPhotos || [],
    description: existedEvent.description || "",
    experience: existedEvent.experience || "",
    date: existedEvent.date || "",
    maxGuests: existedEvent.maxGuests || 1,
    avatar: user?.avatar ? user?.avatar : [],
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

  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-1 sm:px-10 lg:px-32">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnMount={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={handleSubmitSaveEvent}
      >
        {({ values, errors, handleChange, setFieldValue }) => {
          function handleExpClick(value) {
            setRating(value);
            setFieldValue("experience", experienceArr[value - 1]);
            console.log(value);
          }
          const handlePhotosChange = (photos) => {
            // setFieldValue("addedPhotos", photos);
            console.log(photos);
            // setFieldValue("addedPhotos", [
            //   ...values.addedPhotos,
            //   {
            //     imageId: photos[0]?.imageId,
            //   },
            // ]);
            if (
              JSON.stringify(photos[0]?.imageId) !==
              JSON.stringify(values.addedPhotos[0]?.imageId)
            ) {
              console.log("photo", photos);
              console.log("values.addedphotos", values.addedPhotos);
              setFieldValue("addedPhotos", photos);
            }
          };

          return (
            <Form className=" flex  items-center flex-col lg:justify-normal lg:flex-col lg:items-start lg:mb-10">
              <a href="#" className="absolute -top-20  lg:-top-32 select-none">
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
                  backgroundStyles={`h-28 sm:h-44 rounded-t-2xl w-full`}
                />
                <div className="px-2 sm:px-5 md:px-10 lg:px-1 xl:px-10    w-full ">
                  <div className=" absolute top-24 sm:top-32 flex justify-center items-center w-[89px] h-[89px] sm:w-[105px] sm:h-[105px] bg-white rounded-full  ">
                    {user?.avatar.length > 0 &&
                    imageUrlsAvatar[0]?.imageData.url ? (
                      <img
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center"
                        src={imageUrlsAvatar[0].imageData.url}
                        alt=""
                      />
                    ) : (
                      <img
                        src="https://img.freepik.com/free-photo/elf-woman-forest_71767-117.jpg?w=826&t=st=1699015819~exp=1699016419~hmac=74e1f2bd99b8e2de4489799ab8476301c1747e33fbb6fb1d6da863b5c6230ca6"
                        alt="profileImg"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center  "
                      />
                    )}
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="w-3/4 pl-4">
                      <InputField
                        name="title"
                        type="text"
                        value={values.title}
                        onChange={(e) => {
                          setFieldValue("title", e.target.value);
                        }}
                      >
                        Title
                      </InputField>
                    </div>
                  </div>
                  <div className=" flex-col items-center  sm:pt-5 ">
                    <p className="text-base sm:text-2xl min-w-max font-bold capitalize mt-2">
                      {user?.name} {user?.surname}
                    </p>
                    <div className="w-full ">
                      <TextAreaField
                        name="description"
                        type="text"
                        value={values["description"]}
                        inputHeight="150"
                        onChange={handleChange}
                      >
                        Description
                      </TextAreaField>
                    </div>
                    <div className="flex">
                      <div className="flex flex-col w-full justify-between pb-[2px]">
                        <p className="text-gray-500 text-sm pt-3">
                          Level :{" "}
                          {
                            experienceArr[
                              temRating ? temRating - 1 : rating - 1
                            ]
                          }
                        </p>
                        <Stars
                          quantity={3}
                          high={starSize}
                          setRatingOutComponent={handleExpClick}
                          setTempRatingOutComponent={setTemRating}
                        />
                      </div>
                      <div className="flex flex-col w-full sm:gap-2">
                        <InputField
                          name="address"
                          type="text"
                          value={values["address"]}
                          onChange={handleChange}
                        >
                          Address
                        </InputField>
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
                  </div>
                  <div className="w-full">
                    <div className="mt-2 gap-5">
                      <div className="flex flex-col">
                        <DateInputField
                          name="date"
                          type="date"
                          value={values["date"]}
                          onChange={handleChange}
                        >
                          Date
                        </DateInputField>
                      </div>
                    </div>
                    <div className="m-2 mt-5">
                      <Button type="submit">
                        Add Event <BiSolidCalendarPlus />
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
