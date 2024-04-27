import { useEffect, useRef } from "react";
import io from "socket.io-client";

export const useSocket = (onMessage) => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("message", onMessage);

    return () => socketRef.current.disconnect();
  }, [onMessage]);

  return socketRef;
};
