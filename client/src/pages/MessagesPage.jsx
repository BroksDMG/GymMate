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
    <div>
      <h1>Messenger</h1>
      <form onSubmit={onMessageSubmit}>
        <input
          name="message"
          onChange={(e) => onTextChange(e)}
          value={message}
          label="Message"
        />
        <button>Send Message</button>
      </form>
      <div>
        {chat.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default MessagesPage;
