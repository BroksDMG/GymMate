import useGetConversation from "../hooks/useGetConversation";
import Conversation from "./Conversation";
import propTypes from "prop-types";
function SideBarConversations({ chat, chatId, setChatId, setChatAvatars }) {
  const { loading, conversation } = useGetConversation();

  return (
    <div className="pt-2 flex flex-col overflow-auto">
      {conversation.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          setChatId={setChatId}
          setChatAvatars={setChatAvatars}
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
  setChatAvatars: propTypes.func,
  chat: propTypes.array,
  chatId: propTypes.string,
  setChatId: propTypes.func,
};
