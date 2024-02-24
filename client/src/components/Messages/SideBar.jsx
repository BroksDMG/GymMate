import InputField from "../InputField";
import SideBarConversation from "./SideBarConversations";
function SideBar() {
  return (
    <div className="h-full">
      <InputField></InputField>
      <SideBarConversation />
    </div>
  );
}

export default SideBar;
