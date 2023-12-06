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
function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  async function logout() {
    await axios.post("/logout");
    setRedirect("/login");
    setUser(null);
  }
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
  };
  const validationSchema = Yup.object().shape({
    avatar: Yup.array().required("Photo is required"),
  });
  async function photosUploderSubmit(values) {
    await axios.post("/user-avatar", { ...user, avatar: values.avatar });
    setUser((prev) => ({ ...prev, avatar: values.avatar }));
    console.log(values);
  }
  console.log(user.avatar);
  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-2 md:px-10 lg:px-32">
      <div className=" flex  items-center flex-col lg:items-start lg:mb-10">
        <a href="#" className="absolute -top-20  lg:-top-32 ">
          {/* <img
            src={logoWithBorder}
            alt="logoBorder"
            className="w-52 lg:w-full "
          /> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={photosUploderSubmit}
          >
            {({ values, setFieldValue }) => {
              const handlePhotoChange = (photo) => {
                setFieldValue("avatar", photo);
                console.log(photo);
              };
              return (
                <Form className="relative h-full flex justify-center">
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
                    <Button type="submit" bgColor="bg-mediumBlue">
                      Add Photo
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </a>
        <div className="flex items-center flex-col mt-40 lg:mt-0 w-full lg:flex-row lg:pl-80">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl gap-1 font-bold flex capitalize">
              {user ? (
                <>
                  <p>{user.name}</p>
                  <p>{user.surname}</p>
                </>
              ) : (
                <p>user name nof found</p>
              )}
            </h2>
            <p className="text-base text-gray-600 mt-2 capitalize">
              proffesional
            </p>
          </div>

          <button
            className="w-50 h-10 px-20 p-2 bg-darkBluePrimary"
            onClick={logout}
          >
            Logout
          </button>
          <button
            className="w-50 h-10 px-10 p-2 bg-darkBluePrimary"
            onClick={() => setRedirect("/events")}
          >
            Twoje wydarzenia
          </button>
          <div className=" max-w-[300px]">
            <InputField>Name</InputField>
          </div>
          <div
            style={{
              backgroundImage: `url(http://127.0.0.1:4000/uploads/${user?.avatar[0]})`,
            }}
            alt="logoBorder"
            className="w-96 h-96 object-cover object-center lg:w-full mt-10 bg-black"
          ></div>

          <div className="relative">
            <NavigationMenuBottom />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
