import { useEffect, useState } from "react";
import logoWithBorder from "../assets/logoWithBorder.svg";
import SideBar from "../components/Messages/SideBar";
import Chat from "../components/Messages/Chat";
import { getChatMessage, sendChatMessage } from "../apiServices/chatService";
import { useWindowResize } from "../components/hooks/useWindowResize";
import { useSocket } from "../components/hooks/useSocket";
function MessagesPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [chatId, setChatId] = useState("");
  const [chatAvatars, setChatAvatars] = useState("");
  const windowWidth = useWindowResize();

  useSocket(({ message }) => {
    setChat((prevChat) => [...prevChat, message]);
  });

  useEffect(() => {
    if (chatId !== "") {
      getChatMessage(chatId)
        .then((response) => {
          setChat(response.data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [chatId]);

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    sendChatMessage(chatId, message);
    setMessage("");
  };
  const renderSideBar = () => {
    return chatId === "" || windowWidth > 768 ? (
      <SideBar
        chat={chat}
        chatId={chatId}
        setChatId={setChatId}
        setChatAvatars={setChatAvatars}
      />
    ) : null;
  };

  const renderChat = () => {
    return chatId !== "" || windowWidth > 768 ? (
      <div className="flex w-full h-full flex-col items-center justify-center ">
        <Chat
          onTextChange={onTextChange}
          chat={chat}
          chatId={chatId}
          sendMessage={onMessageSubmit}
          message={message}
          chatAvatars={chatAvatars}
          setChatId={setChatId}
        />
      </div>
    ) : null;
  };
  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-1 sm:px-10 lg:px-32">
      <div className=" flex h-full items-center flex-col lg:justify-normal lg:flex-col lg:items-start lg:mb-10">
        <a className="absolute -top-20  lg:-top-32 select-none">
          <img
            src={logoWithBorder}
            alt="logoBorder"
            className="w-52 lg:w-full "
          />
        </a>
        <div className="flex flex-col h-full max-w-6xl lg:mx-auto   mt-28 sm:mt-20  lg:mt-32 w-full border-2 rounded-2xl relative px-1 sm:px-5 shadow-md shadow-gray-400">
          <label className="w-full h-full  flex flex-col justify-center min-w-min max-h-max lg:w-full sm:gap-2 lg:gap-0 ">
            <div className="flex w-full flex-grow gap-1 sm:gap-5 items-end  my-5">
              {renderSideBar()}
              {renderChat()}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
