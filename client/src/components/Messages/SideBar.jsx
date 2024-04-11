import InputField from "../InputField";
import useGetConversation from "../hooks/useGetConversation";
import { useState } from "react";
import SideBarConversation from "./SideBarConversations";
import { conversationFilter } from "../../utils/filterConditions";
import { useFilter } from "../hooks/useFilter";
import propTypes from "prop-types";
import { useSearch } from "../hooks/useSearch";
function SideBar({ setChatId, setChatAvatars }) {
  const { loading, conversation } = useGetConversation();
  const [searchConversation, setSearchConversation] = useState("");
  const filteredItems = useFilter(
    conversation,
    searchConversation,
    conversationFilter
  );
  const searchedConversation = useSearch(searchConversation, filteredItems);

  return (
    <div className="h-full w-full md:w-1/2">
      <InputField
        value={searchConversation}
        onChange={(e) => setSearchConversation(e.target.value)}
      ></InputField>
      <SideBarConversation
        setChatId={setChatId}
        searchedConversation={searchedConversation}
        setChatAvatars={setChatAvatars}
        conversation={conversation}
        loading={loading}
      />
    </div>
  );
}

export default SideBar;
SideBar.propTypes = {
  setChatAvatars: propTypes.func,
  setChatId: propTypes.func,
};
