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
import { useState, useRef } from "react";
import { is } from "date-fns/locale";
export default function PhotosUploder({
  addedPhotos,
  onChange,
  backgroundStyles,
  isUserAvatar = false,
  isDisplayOnly = false,
}) {
  const { user } = useContext(UserContext);
  const [imagesData, setImagesData] = useState([]);
  useEffect(() => {
    if (isUserAvatar && user.avatar) {
      setImagesData(user.avatar);
    }
  }, [isUserAvatar, user.avatar]);
  async function handleFileUpload(files) {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    try {
      const response = await axios.post("/images/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const [downloadedImages, error] = useGetImagesFromDataBase(imagesData);
  if (error) console.error(error);

  const imageUrls = useImagesFromBinaryArray(downloadedImages);
  function removePhoto(ev, fileName) {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== fileName)]);
  }
  if (isUserAvatar) {
    onChange([
      {
        imageId: imageUrls[0]?.imageId,
        imageData: { url: imageUrls[0]?.imageData.url },
      },
    ]);
  } else {
    onChange(imageUrls);
  }
  console.log(addedPhotos);
  // console.log(downloadedImages);
  console.log(imagesData);
  console.log(imageUrls);
  console.log(user.avatar);
  // const [downloadedAvatar, Avatarerror] = useGetImagesFromDataBase(user.avatar);
  // if (Avatarerror) console.error(Avatarerror);
  // const imageUrlsAvatar = useImagesFromBinaryArray(downloadedAvatar);
  // console.log(imageUrlsAvatar);
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
              onChange={(e) => {
                const files = e.target.files;
                handleFileUpload(files).then((uploadedData) => {
                  if (uploadedData) {
                    setImagesData([uploadedData]);
                  }
                });
              }}
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
