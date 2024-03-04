import propTypes from "prop-types";
import { useEffect, useState } from "react";
import useGetImagesFromDataBase from "../hooks/useGetImagesFromDataBase";
import useImagesFromBinaryArray from "../hooks/useBinaryToImage";
import { useContext } from "react";
import { UserContext } from "../UserContext";
function Conversation({ conversation, setChatId, setChatAvatars }) {
  const { user } = useContext(UserContext);
  const [imagesData, setImagesData] = useState([]);
  useEffect(() => {
    if (conversation?.avatar) {
      setImagesData(conversation.avatar);
    }
  }, [conversation?.avatar]);
  const [downloadedImagesAvatar, errorDownload] =
    useGetImagesFromDataBase(imagesData);
  if (errorDownload) console.error(errorDownload);
  const imageUrlsConversationAvatar = useImagesFromBinaryArray(
    downloadedImagesAvatar
  );
  const [userImagesData, setUserImagesData] = useState([]);
  useEffect(() => {
    if (user?.avatar) {
      setUserImagesData(user.avatar);
    }
  }, [user?.avatar]);
  const [downloadedUserImagesAvatar, errorUserDownload] =
    useGetImagesFromDataBase(userImagesData);
  if (errorUserDownload) console.error(errorUserDownload);
  const imageUserUrlsConversationAvatar = useImagesFromBinaryArray(
    downloadedUserImagesAvatar
  );
  const handleConversationClick = () => {
    setChatId(conversation._id);
    setChatAvatars({
      receiverAvatar: imageUrlsConversationAvatar[0]?.imageData.url,
      userAvatar: imageUserUrlsConversationAvatar[0]?.imageData.url,
    });
  };

  return (
    <div
      className="border-b  rounded-md flex items-center hover:bg-blue-200 cursor-pointer"
      onClick={handleConversationClick}
    >
      {conversation.avatar?.length > 0 ? (
        <img
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-center top-4"
          src={imageUrlsConversationAvatar[0]?.imageData.url}
          alt="defaultProfileImg"
        />
      ) : (
        <img
          src="https://img.freepik.com/free-photo/elf-woman-forest_71767-117.jpg?w=826&t=st=1699015819~exp=1699016419~hmac=74e1f2bd99b8e2de4489799ab8476301c1747e33fbb6fb1d6da863b5c6230ca6"
          alt="profileImg"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-center top-4 "
        />
      )}
      <span className="flex gap-1 text-lg capitalize">
        <p>{conversation.name}</p>
        <p>{conversation.surname}</p>
      </span>
    </div>
  );
}

export default Conversation;

Conversation.propTypes = {
  setChatAvatars: propTypes.func,
  conversation: propTypes.object,
  setChatId: propTypes.func,
};
