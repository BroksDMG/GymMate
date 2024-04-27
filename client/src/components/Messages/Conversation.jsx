import propTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import useAvatarImg from "../hooks/useAvatarImg";
import defaultUser from "../../assets/defaultUser.png";
function Conversation({ conversation, setChatId, setChatAvatars }) {
  const { user } = useContext(UserContext);
  const conversationAvatar = useAvatarImg(conversation?.avatar, defaultUser);
  const userAvatar = useAvatarImg(user?.avatar, defaultUser);

  const handleConversationClick = (e) => {
    e.stopPropagation();
    setChatId(conversation._id);
    setChatAvatars({
      receiverAvatar: conversationAvatar,
      userAvatar: userAvatar,
    });
  };

  return (
    <div
      className="border-b  rounded-md flex items-center hover:bg-blue-200 cursor-pointer"
      onClick={(e) => handleConversationClick(e)}
    >
      <img
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-center top-4"
        src={conversationAvatar}
        alt="defaultProfileImg"
      />

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
