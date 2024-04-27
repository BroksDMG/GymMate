import Conversation from "./Conversation";
import propTypes from "prop-types";
function SideBarConversations({
  setChatId,
  setChatAvatars,
  conversation,
  loading,
  searchedConversation,
}) {
  const conversationsToDisplay =
    searchedConversation.length > 0 ? searchedConversation : conversation;
  return (
    <div className="pt-2 flex flex-col overflow-auto">
      {conversationsToDisplay.map((conversation) => (
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
  setChatId: propTypes.func,
  conversation: propTypes.array,
  loading: propTypes.bool,
  searchedConversation: propTypes.array,
};
