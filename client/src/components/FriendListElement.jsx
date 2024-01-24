import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetImagesFromDataBase from "./hooks/useGetImagesFromDataBase";
import useImagesFromBinaryArray from "./hooks/useBinaryToImage";
function FriendListElement({ friend }) {
  const [imagesData, setImagesData] = useState([]);
  useEffect(() => {
    if (friend?.avatar) {
      setImagesData(friend.avatar);
    }
  }, [friend?.avatar]);
  const [downloadedImagesAvatar, errorDownload] =
    useGetImagesFromDataBase(imagesData);
  if (errorDownload) console.error(errorDownload);
  const imageUrlsAvatar = useImagesFromBinaryArray(downloadedImagesAvatar);

  return (
    <>
      <span className="pb-2 capitalize font-bold">Friends</span>
      <div className="flex  gap-2">
        <Link to={"/account/" + friend._id} className="flex pt-1">
          {/* <PhotosUploder
            name="avatar"
            addedPhotos={friend.avatar}
            backgroundStyles={`w-[4.6rem] h-[4.6rem] lg:w-[7rem] lg:h-[7rem] rounded-full  `}
            isUserAvatar={true}
            isDisplayOnly={true}
          /> */}
          {friend.avatar?.length > 0 ? (
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center top-4"
              src={imageUrlsAvatar[0]?.imageData.url}
              alt="defaultProfileImg"
            />
          ) : (
            <img
              src="https://img.freepik.com/free-photo/elf-woman-forest_71767-117.jpg?w=826&t=st=1699015819~exp=1699016419~hmac=74e1f2bd99b8e2de4489799ab8476301c1747e33fbb6fb1d6da863b5c6230ca6"
              alt="profileImg"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center top-4 "
            />
          )}
        </Link>
        <div className="flex flex-col gap-2 ">
          <p className="text-sm sm:text-base font-bold capitalize">
            {friend.name} {friend.surname}
          </p>

          <p className="text-xs sm:text-sm text-darkBluePrimary">
            {friend.userDescription?.length > 110
              ? friend.userDescription.substring(0, 110) + "..."
              : friend.userDescription}
          </p>
        </div>
      </div>
    </>
  );
}

export default FriendListElement;

FriendListElement.propTypes = {
  friend: propTypes.object,
};
