import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import NavigationMenuBottom from "../components/NavigationMenuBottom";
import PhotosUploder from "../components/PhotosUploder";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import UserEventsList from "../components/UserEventsList";
import TextAreaField from "../components/TextAreaField";
import UserGallery from "../components/UserGallery";
function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [avtiveTab, setActiveTab] = useState(1);
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  const initialValues = {
    avatar: [],
    userDescription: user.userDescription || "",
    gallery: user.gallery || [],
  };
  const validationSchema = Yup.object().shape({
    avatar: Yup.array(),
    userDescription: Yup.string(),
    gallery: Yup.array(),
  });
  async function photosUploderSubmit(values) {
    await axios.post("/user-avatar", {
      ...user,
      ...values,
    });
    setUser((prev) => ({
      ...prev,
      ...values,
    }));
    console.log(values);
  }
  //Na siłownie uczęszczam od lat, dobry trening to trening bez kontuzji, jak już tu zabłądziłeś to wal śmiało wyskoczymy poprzerzucać żelastwo 💪
  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-2 sm:px-10 md:px-20 lg:px-10 xl:px-20">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={photosUploderSubmit}
      >
        {({ values, setFieldValue, handleChange }) => {
          const handlePhotoChange = (photo) => {
            setFieldValue("avatar", photo);
          };
          const handleGalleryChange = (galleryItem) => {
            setFieldValue("gallery", galleryItem);
          };
          return (
            <Form className=" flex  items-center flex-col lg:items-start lg:mb-10 ">
              <a href="#" className="absolute -top-20  lg:-top-32 lg:left-32">
                {/* <img
            src={logoWithBorder}
            alt="logoBorder"
            className="w-52 lg:w-full "
          /> */}

                <div className="relative h-full flex justify-center">
                  <div
                    style={{ boxShadow: "0px 5px 0px rgb(156 163 175)" }}
                    className="absolute top-5 lg:top-16 h-[9rem] w-[9rem] lg:w-[12rem] lg:h-[12rem] bg-gra flex justify-center items-center bg-darkBluePrimary rounded-full object-cover object-center"
                  >
                    <PhotosUploder
                      name="avatar"
                      addedPhotos={values.avatar}
                      onChange={handlePhotoChange}
                      backgroundStyles={`w-[8rem] h-[8rem] lg:w-[11rem] lg:h-[11rem] rounded-full  `}
                      isUserAvatar={true}
                    />
                  </div>
                  <div className="relative top-44 lg:top-[17rem] ">
                    <Button type="submit">save changes</Button>
                  </div>
                </div>
              </a>
              <div className="flex items-center flex-col mt-40 lg:mt-10 w-full ">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl lg:text-4xl gap-1 font-bold flex capitalize ">
                    {user ? (
                      <>
                        <p>{user.name}</p>
                        <p>{user.surname}</p>
                      </>
                    ) : (
                      <p>user name nof found</p>
                    )}
                  </h2>
                  <p className="text-base lg:text-xl text-gray-600 mt-2 capitalize">
                    proffesional
                  </p>
                </div>
                <div className="w-3/4 lg:mt-20">
                  <TextAreaField
                    name="userDescription"
                    onChange={handleChange}
                    value={values.userDescription}
                  >
                    Description
                  </TextAreaField>
                </div>

                {avtiveTab === 1 && (
                  <div className="grid mt-10 grid-cols-1 lg:grid-cols-2 gap-10">
                    <UserEventsList />
                  </div>
                )}
                {avtiveTab === 2 && (
                  <div className="grid mt-10 grid-cols-1 lg:grid-cols-2 gap-10">
                    {/*todo: add user followers list*/}
                    <UserEventsList />
                  </div>
                )}
                {avtiveTab === 3 && (
                  <div className="mt-10">
                    <UserGallery
                      name="gallery"
                      onChange={handleGalleryChange}
                      value={values.gallery}
                    />
                  </div>
                )}
                <div className="relative">
                  <NavigationMenuBottom saveactiveTab={setActiveTab} />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AccountPage;
