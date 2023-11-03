import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import NavigationMenuBottom from "../components/NavigationMenuBottom";
function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }
  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="mt-3">
      AccountPage{user?.name}
      <button
        className="w-50 h-10 px-20 p-2 bg-darkBluePrimary"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="w-50 h-10 px-10 p-2 bg-darkBluePrimary"
        onClick={() => setRedirect("/events")}
      >
        Twoje wydarzenia
      </button>
      <div className=" max-w-[300px]">
        <InputField>Name</InputField>
      </div>
      <div className="relative">
        <NavigationMenuBottom />
      </div>
    </div>
  );
}

export default AccountPage;
