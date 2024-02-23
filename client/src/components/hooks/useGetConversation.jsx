import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetConversation() {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getconversation = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/message/getUsersForSidebar");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setConversation(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getconversation();
  }, []);
  return { loading, conversation };
}

export default useGetConversation;
