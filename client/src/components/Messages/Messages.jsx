import Message from "./Message";
import propTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../UserContext";
function Messages({ chat, chatAvatars }) {
  const { user } = useContext(UserContext);
  return (
    <>
      {chat
        .slice(0)
        .reverse()
        .map((msg) => {
          const isLoggedUserMessage = user?._id === msg.senderId;
          const avatar = isLoggedUserMessage
            ? chatAvatars.userAvatar
            : chatAvatars.receiverAvatar;
          return (
            <Message
              msgData={msg}
              key={msg._id}
              loggedUserMessage={isLoggedUserMessage}
              avatar={avatar}
            />
          );
        })}
    </>
  );
}

export default Messages;

Messages.propTypes = {
  chat: propTypes.arrayOf(propTypes.object),
  chatAvatars: propTypes.object,
};
