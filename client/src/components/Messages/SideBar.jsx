import InputField from "../InputField";
import useGetConversation from "../hooks/useGetConversation";
import { useState } from "react";
import SideBarConversation from "./SideBarConversations";
import propTypes from "prop-types";
function SideBar({ setChatId, setChatAvatars }) {
  const { loading, conversation } = useGetConversation();
  const [searchConversation, setSearchConversation] = useState("");
  const [searchedConversation, setSearchedConversation] = useState([]);
  const handleSearch = (searchValue) => {
    setSearchConversation(searchValue);
    if (searchValue.length < 3) {
      setSearchedConversation([]);
      return;
    }
    const filteredConversation = conversation?.filter((event) => {
      const nameCondition = event.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const surnameCondition = event.surname
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return nameCondition || surnameCondition;
    });
    setSearchedConversation(filteredConversation);
  };
  return (
    <div className="h-full">
      <InputField
        value={searchConversation}
        onChange={(e) => handleSearch(e.target.value)}
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
