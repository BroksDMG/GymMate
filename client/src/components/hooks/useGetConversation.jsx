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
        if (res.error) throw new Error(res.error);
        setConversation(res.data);
      } catch (error) {
        toast.error("Error whit getting conversation", error.message);
      } finally {
        setLoading(false);
      }
    };
    getconversation();
  }, []);
  return { loading, conversation };
}

export default useGetConversation;
