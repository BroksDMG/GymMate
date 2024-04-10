import Messages from "./Messages";
import propTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa6";
function Chat({
  onTextChange,
  chat,
  sendMessage,
  message,
  chatId,
  chatAvatars,
  setChatId,
}) {
  return chatId !== "" ? (
    <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
      <button
        onMouseDown={() => setChatId("")}
        className="p-4 pt-8 absolute text-2xl text-gray-200"
      >
        <FaArrowLeft />
      </button>
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <Messages chat={chat} chatAvatars={chatAvatars} />
      </div>
      <form onSubmit={sendMessage} className="bg-gray-300 p-4 flex">
        <input
          onChange={(e) => onTextChange(e)}
          value={message}
          className="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          placeholder="Type your message…"
        ></input>
        <button
          type="submit"
          className="py-2 px-2 w-20 bg-blue-500 text-white rounded"
        >
          send
        </button>
      </form>
    </div>
  ) : (
    <div className="flex flex-col min-w-max px-2 justify-center items-center flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
      Select from sidebar Conversation to start chat
    </div>
  );
}

export default Chat;

Chat.propTypes = {
  onTextChange: propTypes.func,
  chat: propTypes.array,
  sendMessage: propTypes.func,
  message: propTypes.string,
  chatId: propTypes.string,
  chatAvatars: propTypes.object,
  setChatId: propTypes.func,
};
