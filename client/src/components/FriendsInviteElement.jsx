import propTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useGetImagesFromDataBase from "./hooks/useGetImagesFromDataBase";
import useImagesFromBinaryArray from "./hooks/useBinaryToImage";
function FriendsInviteElement({
  friendRequst,
  accptFriendRequest,
  rejectFriend,
}) {
  const [imagesData, setImagesData] = useState([]);
  useEffect(() => {
    if (friendRequst?.avatar) {
      setImagesData(friendRequst.avatar);
    }
  }, [friendRequst?.avatar]);
  const [downloadedImagesAvatar, errorDownload] =
    useGetImagesFromDataBase(imagesData);
  if (errorDownload) console.error(errorDownload);
  const imageUrlsAvatar = useImagesFromBinaryArray(downloadedImagesAvatar);
  return (
    <>
      <span className="pb-2 capitalize font-bold">Invites</span>
      <div className="flex  gap-2">
        <div className="flex pt-1">
          {/* <PhotosUploder
            name="avatar"
            addedPhotos={friendRequst.avatar}
            backgroundStyles={`w-[4.6rem] h-[4.6rem] lg:w-[7rem] lg:h-[7rem] rounded-full  `}
            isUserAvatar={true}
            isDisplayOnly={true}
          /> */}
          {/* <PhotosUploder
            name="avatar"
            addedPhotos={friend.avatar}
            backgroundStyles={`w-[4.6rem] h-[4.6rem] lg:w-[7rem] lg:h-[7rem] rounded-full  `}
            isUserAvatar={true}
            isDisplayOnly={true}
          /> */}
          {friendRequst.avatar?.length > 0 ? (
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
        </div>
        <div className="flex flex-col gap-2 ">
          <p className="text-sm sm:text-base font-bold capitalize">
            {friendRequst.name} {friendRequst.surname}
          </p>

          <div className="flex h-full w-full">
            <button
              onClick={() => accptFriendRequest(friendRequst._id)}
              className="h-full w-full flex justify-center items-center bg-gray-200 hover:bg-green-500 hover:text-white rounded-r-none rounded-lg px-2 py-1 text-gray-400 font-bold"
            >
              <FaCheck />
            </button>
            <button
              onClick={() => rejectFriend(friendRequst._id)}
              className="h-full w-full text-xl flex justify-center items-center bg-gray-200 hover:bg-red-500 hover:text-white rounded-l-none rounded-lg px-2 py-1 text-gray-400 font-bold"
            >
              <FaXmark />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendsInviteElement;

FriendsInviteElement.propTypes = {
  friendRequst: propTypes.object,
  accptFriendRequest: propTypes.func,
  rejectFriend: propTypes.func,
};
