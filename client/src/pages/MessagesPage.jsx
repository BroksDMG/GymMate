import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
  );
}

export default MessagesPage;
