import useGetConversation from "../hooks/useGetConversation";
import Conversation from "./Conversation";
import propTypes from "prop-types";
function SideBarConversations({
  chat,
  chatId,
  setChatId,
  setChatReceiverAvatar,
}) {
  const { loading, conversation } = useGetConversation();

  return (
    <div className="pt-2 flex flex-col overflow-auto">
      {conversation.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          setChatId={setChatId}
          setChatReceiverAvatar={setChatReceiverAvatar}
        />
      ))}

      {loading && (
        <span className="loading loading-spinner mx-auto">Loading...</span>
      )}
    </div>
  );
}

export default SideBarConversations;
SideBarConversations.propTypes = {
  setChatReceiverAvatar: propTypes.func,
  chat: propTypes.array,
  chatId: propTypes.string,
  setChatId: propTypes.func,
};
