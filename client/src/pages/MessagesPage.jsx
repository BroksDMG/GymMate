import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import logoWithBorder from "../assets/logoWithBorder.svg";
import axios from "axios";
import SideBar from "../components/Messages/SideBar";
import Chat from "../components/Messages/Chat";
function MessagesPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [chatId, setChatId] = useState(""); // Hardcoded chatId for now [TODO: get chatId from URL params or from the server response
  const [chatAvatars, setChatAvatars] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // 65b1424caec7de72a76d8bd3
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("message", ({ message }) => {
      setChat((prevChat) => [...prevChat, message]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  // Fetch messages when the component mounts and when 'chatId' changes
  useEffect(() => {
    if (chatId !== "") {
      axios
        .get(`/message/getMessage/${chatId}`)
        .then((response) => {
          setChat(response.data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [chatId]); // 'chatId' is the only dependency

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    axios.post(`/message/sendMessage/${chatId}`, { message });
    setMessage("");
  };
  console.log(chatId);
  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-1 sm:px-10 lg:px-32">
      <div className=" flex h-full items-center flex-col lg:justify-normal lg:flex-col lg:items-start lg:mb-10">
        <a href="#" className="absolute -top-20  lg:-top-32 select-none">
          <img
            src={logoWithBorder}
            alt="logoBorder"
            className="w-52 lg:w-full "
          />
        </a>

        <div className="flex flex-col h-full  mt-28 sm:mt-20  lg:mt-32 w-full border-2 rounded-2xl relative px-1 sm:px-5 shadow-md shadow-gray-400">
          <label className="w-full h-full  flex flex-col justify-center min-w-min max-h-max lg:w-full sm:gap-2 lg:gap-0 ">
            <div className="flex w-full flex-grow gap-1 sm:gap-5 items-end  my-5">
              {chatId === "" || windowWidth > 640 ? (
                <SideBar
                  chat={chat}
                  chatId={chatId}
                  setChatId={setChatId}
                  setChatAvatars={setChatAvatars}
                />
              ) : null}
              {chatId !== "" || windowWidth > 640 ? (
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
              ) : null}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
