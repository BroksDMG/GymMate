import Message from "./Message";
import propTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../UserContext";
function Messages({ chat }) {
  const { user } = useContext(UserContext);
  return (
    <>
      {chat.map((msg) => (
        <Message
          msgData={msg}
          key={msg._id}
          loggedUserMessage={user?._id === msg.senderId}
        />
      ))}
    </>
  );
}

export default Messages;

Messages.propTypes = {
  chat: propTypes.arrayOf(propTypes.object),
};
