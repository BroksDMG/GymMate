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
  return (
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
          <Form className="mt-3">
            {/* {console.log(values)} */}
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
            <div className="relative">
              <NavigationMenuBottom />
            </div>
            <div className="w-64 h-44 bg-slate-400">
              <PhotosUploder
                name="avatar"
                addedPhotos={values.avatar}
                onChange={handlePhotoChange}
              />
              <Button type="submit" bgColor="bg-mediumBlue">
                Add Photo
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AccountPage;
