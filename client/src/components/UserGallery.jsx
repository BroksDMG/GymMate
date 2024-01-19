import { useState, useContext } from "react";
import TextAreaField from "./TextAreaField";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import PhotosUploder from "./PhotosUploder";
import propTypes from "prop-types";
import { UserContext } from "./UserContext";
import { BsPlusCircleDotted } from "react-icons/bs";
import Button from "./Button";
import useGetImagesFromDataBase from "./hooks/useGetImagesFromDataBase";
import useImagesFromBinaryArray from "./hooks/useBinaryToImage";
function UserGallery({ onChange, value, memberGallery = false }) {
  const [activeImage, setActiveImage] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [showUploader, setShowUploader] = useState(false);
  const [photos, setPhotos] = useState([]);
  const { user } = useContext(UserContext);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  function handleImageClick(imgIndex, isUploader = false) {
    setActiveImage((prevActiveImage) => !prevActiveImage);
    setActiveImageIndex(imgIndex);
    setShowUploader(imgIndex === 0 && isUploader);
  }
  const handleImageDescripton = (imageDescription) => {
    setImageDescription(imageDescription);
  };

  const onPhotosGalleryChange = (photos) => {
    setPhotos(photos);
  };
  const onButtonSaveGalleryClick = () => {
    onChange({ photos, imageDescription });
    setActiveImage(false);
    setActiveImageIndex(null);
  };
  // const [downloadedImages, errorUpload] = useGetImagesFromDataBase(photos);
  // if (errorUpload) console.error(errorUpload);
  // const imageUrls = useImagesFromBinaryArray(downloadedImages);
  const [downloadedImagesGallery, errorDownload] =
    useGetImagesFromDataBase(value);
  if (errorDownload) console.error(errorDownload);
  const imageUrlsGallery = useImagesFromBinaryArray(downloadedImagesGallery);

  return (
    <div className="px-2 w-full sm:px-10 md:px-20 lg:px-10 xl:px-20">
      <div>
        <span className="p-2 capitalize font-bold">Gallery</span>
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-wrap justify-center">
            {!memberGallery && (
              <div className={`p-2 w-1/2 sm:w-1/3  flex flex-col`}>
                <button
                  onClick={() => handleImageClick(0, true)}
                  className=" min-w-[100px] lg:min-w-[150px]"
                >
                  {/* {photos?.length > 0 ? (
                    <img
                      className="w-full h-36 md:h-64 object-cover "
                      src={photos[0]?.imageData?.url}
                    />
                  ) : ( */}
                  <div className="w-full h-full flex justify-center  bg-lightBrown text-6xl lg:text-8xl ">
                    <BsPlusCircleDotted
                      style={{ filter: "drop-shadow(0px 2px 4px black)" }}
                      className="   h-36 md:h-64 object-cover z-10 text-lightBrown  cursor-pointer "
                    />
                  </div>
                  {/* )} */}
                </button>
                <p className="text-base sm:text-lg lg:text-xl min-w-max">
                  Add Photo
                </p>
              </div>
            )}
            {imageUrlsGallery
              ? imageUrlsGallery?.map((galleryyItem, i) => (
                  <div className={`p-2 w-1/2  flex flex-col`} key={i}>
                    <button onClick={() => handleImageClick(i)}>
                      <img
                        className="w-full h-36 md:h-64 object-cover rounded-lg"
                        src={galleryyItem?.imageData?.url}
                      />
                    </button>
                    <p className="text-base sm:text-lg lg:text-xl ">
                      {galleryyItem.imageDescription?.length > 10
                        ? galleryyItem.imageDescription.substring(0, 10) + "..."
                        : galleryyItem.imageDescription}
                    </p>
                  </div>
                ))
              : array.map((_, i) => (
                  <div
                    className={`p-2 w-1/2 sm:w-1/3  lg:w-1/5 xl:w-1/6 flex flex-col`}
                    key={i}
                  >
                    <button onClick={() => handleImageClick(i)}>
                      <img
                        className="w-full h-36 md:h-64 object-cover"
                        src="https://source.unsplash.com/random/800x601"
                      />
                    </button>
                    <p className="text-base sm:text-lg lg:text-xl ">Gym mate</p>
                  </div>
                ))}
            <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2"></div>
          </div>
        </div>
      </div>
      {activeImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-mediumBlue bg-opacity-60 z-50 flex justify-center items-center backdrop-blur">
          <div className="relative px-10">
            <button
              onClick={() => {
                setActiveImageIndex(null);

                setActiveImage(false);
              }}
              className="absolute top-0 right-0 p-2 text-white"
            >
              <FaTimes />
            </button>
            <div className=" flex justify-center items-center">
              <button
                onClick={() =>
                  setActiveImageIndex(
                    (prevActiveImageIndex) =>
                      (prevActiveImageIndex - 1 + user.gallery.length) %
                      user.gallery.length
                  )
                }
                className="absolute left-0 p-2 text-white"
              >
                <FaArrowLeft />
              </button>

              <div>
                {showUploader ? (
                  <>
                    <PhotosUploder
                      addedPhotos={photos}
                      onChange={onPhotosGalleryChange}
                      backgroundStyles={`w-96 h-96   `}
                    />
                    <p className=" text-base text-darkBluePrimary pl-5 sm:text-lg lg:text-xl ">
                      Image Description
                    </p>
                    <div>
                      <TextAreaField
                        value={imageDescription}
                        onChange={(e) => handleImageDescripton(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={onButtonSaveGalleryClick}
                      className="bg-darkBluePrimary text-white p-2 rounded-lg"
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <img
                      style={{ boxShadow: "0px 0px 50px 10px black" }}
                      className="w-96 h-96  "
                      src={imageUrlsGallery[activeImageIndex].imageData.url}
                    />
                    <p className=" text-base text-darkBluePrimary pl-5 sm:text-lg lg:text-xl ">
                      Image Description
                    </p>
                    <div className=" ">
                      <TextAreaField
                        value={value?.at(activeImageIndex).imageDescription}
                      />
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() =>
                  setActiveImageIndex(
                    (prevActiveImageIndex) =>
                      (prevActiveImageIndex + 1) % user.gallery.length
                  )
                }
                className="absolute right-0 p-2 text-white"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserGallery;

UserGallery.propTypes = {
  onChange: propTypes.func,
  value: propTypes.array,
  memberGallery: propTypes.bool,
};
