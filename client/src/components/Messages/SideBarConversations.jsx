import useGetConversation from "../hooks/useGetConversation";
import Conversation from "./Conversation";

function SideBarConversations() {
  const { loading, conversation } = useGetConversation();
  return (
    <div className="pt-2 flex flex-col overflow-auto">
      {conversation.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}

      {loading && (
        <span className="loading loading-spinner mx-auto">Loading...</span>
      )}
    </div>
  );
}

export default SideBarConversations;
