import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import logoWithBorder from "../assets/logoWithBorder.svg";
function MessagesPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/"); // Connect to the server

    socketRef.current.on("message", ({ message }) => {
      setChat([...chat, message]);
    });

    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const msg = { message };
    socketRef.current.emit("message", msg);
    setMessage("");
  };

  return (
    <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 relative flex flex-col px-1 sm:px-10 lg:px-32">
      <div className=" flex  items-center flex-col lg:justify-normal lg:flex-col lg:items-start lg:mb-10">
        <a href="#" className="absolute -top-20  lg:-top-32 select-none">
          <img
            src={logoWithBorder}
            alt="logoBorder"
            className="w-52 lg:w-full "
          />
        </a>

        <div className="flex flex-col mt-28 sm:mt-20  lg:mt-32 w-full border-2 rounded-2xl relative px-10 shadow-md shadow-gray-400">
          <label className="w-full h-full flex flex-col justify-center min-w-min max-h-max lg:w-full sm:gap-2 lg:gap-0 ">
            <div className="flex w-full gap-5 items-end  my-5">
              <div className="flex flex-col items-center justify-center  bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Messenger</h1>
                <div className="w-4/5 h-96 border border-gray-300 p-4 mb-4 overflow-y-auto bg-white">
                  {chat.map((msg, idx) => (
                    <div key={idx} className="mb-4">
                      {msg}
                    </div>
                  ))}
                </div>
                <form onSubmit={onMessageSubmit} className="w-4/5 flex">
                  <input
                    name="message"
                    onChange={(e) => onTextChange(e)}
                    value={message}
                    label="Message"
                    className="flex-grow mr-4 p-2 border border-gray-300 rounded"
                  />
                  <button className="py-2 px-4 bg-blue-500 text-white rounded">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Messenger</h1>
//       <div className="w-4/5 h-96 border border-gray-300 p-4 mb-4 overflow-y-auto bg-white">
//         {chat.map((msg, idx) => (
//           <div key={idx} className="mb-4">
//             {msg}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={onMessageSubmit} className="w-4/5 flex">
//         <input
//           name="message"
//           onChange={(e) => onTextChange(e)}
//           value={message}
//           label="Message"
//           className="flex-grow mr-4 p-2 border border-gray-300 rounded"
//         />
//         <button className="py-2 px-4 bg-blue-500 text-white rounded">
//           Send Message
//         </button>
//       </form>
//     </div>

export default MessagesPage;
