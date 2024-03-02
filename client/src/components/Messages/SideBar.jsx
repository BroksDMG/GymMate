import InputField from "../InputField";
import SideBarConversation from "./SideBarConversations";
import propTypes from "prop-types";
function SideBar({ chat, chatId, setChatId, setChatReceiverAvatar }) {
  return (
    <div className="h-full">
      <InputField></InputField>
      <SideBarConversation
        chat={chat}
        chatId={chatId}
        setChatId={setChatId}
        setChatReceiverAvatar={setChatReceiverAvatar}
      />
    </div>
  );
}

export default SideBar;
SideBar.propTypes = {
  setChatReceiverAvatar: propTypes.func,
  chat: propTypes.array,
  chatId: propTypes.string,
  setChatId: propTypes.func,
};
