import axios from "axios";
import propTypes from "prop-types";
import { UserContext } from "./UserContext";
import { useContext, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import userDefaultAvatar from "../assets/user-128.png";
import useImagesFromBinaryArray from "./hooks/useBinaryToImage";
import useGetImagesFromDataBase from "./hooks/useGetImagesFromDataBase";
import { useState } from "react";
export default function PhotosUploder({
  addedPhotos,
  onChange,
  backgroundStyles,
  isUserAvatar = false,
  isDisplayOnly = false,
}) {
  const { user } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  useEffect(() => {
    if (files.length === 0) return;
    async function uploadFiles() {
      const formData = new FormData();
      for (let file of files) {
        formData.append("files", file);
      }
      try {
        const respone = await axios.post("/images/upload-images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImagesData([respone.data[0]]);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    }
    uploadFiles();
  }, [files]);
  const [downloadedImages, error] = useGetImagesFromDataBase(imagesData);
  if (error) console.error(error);

  const imageUrls = useImagesFromBinaryArray(downloadedImages);
  if (isUserAvatar && downloadedImages[0]?.imageId) {
    onChange(downloadedImages);
  } else onChange(imageUrls);
  console.log(downloadedImages[0]?.imaggeId);
  function removePhoto(ev, fileName) {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== fileName)]);
  }
  console.log(addedPhotos);
  // const addedImageUrls = useImagesFromBinaryArray(addedPhotos);
  // // function selectAsMainPhoto(ev, fileName) {
  // //   ev.preventDefault();
  // //   onChange([fileName, ...addedPhotos.filter((photo) => photo !== fileName)]);
  // // }
  return (
    <>
      <div
        className={`${
          addedPhotos?.length === 0 && !isUserAvatar ? " bg-lightBrown" : ""
        }  ${backgroundStyles}  flex justify-center items-center text-6xl lg:text-8xl relative`}
      >
        {!isDisplayOnly && (
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
              onChange={(e) => setFiles(e.target.files)}
            />
          </label>
        )}

        <div className="w-full flex relative">
          {addedPhotos?.length === 0 && isUserAvatar && !user.avatar[0] && (
            <img
              src={userDefaultAvatar}
              alt="defaultImageBacground"
              className={`${backgroundStyles}  object-center object-cover `}
            />
          )}
          {user?.avatar?.length !== 0 &&
            isUserAvatar &&
            addedPhotos?.length === 0 && (
              <>
                <img
                  src={imageUrls?.at(0)}
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

          {addedPhotos?.length > 0 &&
            addedPhotos.map((link) => (
              <div className="w-full" key={link}>
                {console.log(link?.imageData?.url)}
                <img
                  src={link?.imageData?.url}
                  alt="adedeventImageBacground"
                  className={`${backgroundStyles}  object-center object-cover `}
                />
                {!isDisplayOnly && (
                  <button
                    onClick={(ev) => {
                      removePhoto(ev, link);
                    }}
                    className="absolute bottom-1 right-1 bg-opacity-50 rounded-xl cursor-pointer text-white bg-black p-2"
                  >
                    <FaRegTrashAlt className="text-white text-2xl" />
                  </button>
                )}
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
  isDisplayOnly: propTypes.bool,
};
