import axios from "axios";
import propTypes from "prop-types";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
export default function PhotosUploder({
  addedPhotos,
  onChange,
  backgroundStyles,
  isUserAvatar = false,
}) {
  const { user } = useContext(UserContext);
  function uploadPhotos(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "mulipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        onChange([filenames[0]]);
      });
  }
  function removePhoto(ev, fileName) {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== fileName)]);
  }
  // function selectAsMainPhoto(ev, fileName) {
  //   ev.preventDefault();
  //   onChange([fileName, ...addedPhotos.filter((photo) => photo !== fileName)]);
  // }
  return (
    <>
      <div
        className={`${
          addedPhotos?.length === 0 && !isUserAvatar ? " bg-lightBrown" : ""
        }  ${backgroundStyles}  flex justify-center items-center text-6xl lg:text-8xl relative `}
      >
        <label className="absolute justify-center items-center flex ">
          {addedPhotos?.length > 0 || user?.avatar ? (
            <BsPlusCircleDotted
              style={{ filter: "drop-shadow(0px 2px 4px black)" }}
              className="  z-10 text-lightBrown  cursor-pointer "
            />
          ) : (
            <AiFillPlusCircle
              style={{ filter: "drop-shadow(0px 2px 4px black)" }}
              className="  z-10 text-lightBrown  cursor-pointer "
            />
          )}
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhotos}
          />
        </label>

        <div className="w-full flex relative">
          {addedPhotos.length === 0 && isUserAvatar && (
            <>
              <img
                src={`http://127.0.0.1:4000/uploads/${user?.avatar[0]}`}
                alt="eventImageBacground"
                className={`${backgroundStyles}  object-center object-cover `}
              />

              {/*
              TODO: remove photo
              <button
                onClick={(ev) => {
                  removePhoto(ev, user?.avatar[0]);
                }}
                className="absolute bottom-1 right-1 bg-opacity-50 rounded-xl cursor-pointer text-white bg-black p-2"
              >
                <FaRegTrashAlt className="text-white text-2xl" />
              </button> */}
            </>
          )}
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div key={link}>
                <img
                  src={`http://127.0.0.1:4000/uploads/${link}`}
                  alt="eventImageBacground"
                  className={`${backgroundStyles}  object-center object-cover `}
                />
                <button
                  onClick={(ev) => {
                    removePhoto(ev, link);
                  }}
                  className="absolute bottom-1 right-1 bg-opacity-50 rounded-xl cursor-pointer text-white bg-black p-2"
                >
                  <FaRegTrashAlt className="text-white text-2xl" />
                </button>
              </div>
            ))}

          {/* <button
                onClick={(ev) => {
                  selectAsMainPhoto(ev, link);
                }}
                className="absolute bottom-1 left-1 bg-opacity-50 rounded-xl cursor-pointer text-white bg-black p-2"
              >
                {link === addedPhotos[0] && (
                  <FaStar className="text-white text-2xl" />
                )}
                {link !== addedPhotos[0] && (
                  <FaRegStar className="text-white text-2xl" />
                )}
              </button> */}
        </div>
      </div>
    </>
  );
}
PhotosUploder.propTypes = {
  addedPhotos: propTypes.array,
  onChange: propTypes.func,
  backgroundStyles: propTypes.string,
  isUserAvatar: propTypes.bool,
};
