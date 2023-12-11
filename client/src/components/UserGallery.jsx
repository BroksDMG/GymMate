import { useState } from "react";

import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import PhotosUploder from "./PhotosUploder";
function UserGallery({ value, onChange }) {
  const [activeImage, setActiveImage] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  function handleImageClick(imgIndex) {
    setActiveImage((prevActiveImage) => !prevActiveImage);
    setActiveImageIndex(imgIndex);
  }
  return (
    <div className="px-2 sm:px-10 md:px-20 lg:px-10 xl:px-20">
      <div>
        <span className="p-2 capitalize font-bold">Gallery</span>
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-wrap justify-center">
            <div
              className={`p-2 w-1/2 sm:w-1/3  lg:w-1/5 xl:w-1/6 flex flex-col`}
            >
              <PhotosUploder
                addedPhotos={value}
                onChange={onChange}
                backgroundStyles={`w-full h-full   `}
              />
              <p className="text-base sm:text-lg lg:text-xl ">Add Photo</p>
            </div>
            {array.map((_, i) => (
              <div
                className={`p-2 w-1/2 sm:w-1/3  lg:w-1/5 xl:w-1/6 flex flex-col`}
                key={i}
              >
                <button onClick={() => handleImageClick(i)}>
                  <img
                    className="w-full"
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex justify-center items-center">
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
            <div className="flex justify-center items-center">
              <button
                onClick={() =>
                  setActiveImageIndex(
                    (prevActiveImageIndex) => prevActiveImageIndex - 1
                  )
                }
                className="absolute left-0 p-2 text-white"
              >
                <FaArrowLeft />
              </button>
              {console.log(activeImageIndex)}
              <img
                className="w-full"
                src="https://source.unsplash.com/random/800x601"
              />
              <button
                onClick={() =>
                  setActiveImageIndex(
                    (prevActiveImageIndex) => prevActiveImageIndex + 1
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
