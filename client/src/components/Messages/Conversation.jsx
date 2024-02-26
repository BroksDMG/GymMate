import propTypes from "prop-types";
import { useEffect, useState } from "react";
import useGetImagesFromDataBase from "../hooks/useGetImagesFromDataBase";
import useImagesFromBinaryArray from "../hooks/useBinaryToImage";
function Conversation({ conversation }) {
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

  return (
    <div className="border-b  rounded-md flex items-center">
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
  conversation: propTypes.object,
};
