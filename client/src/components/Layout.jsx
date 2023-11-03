import { useContext } from "react";
import Header from "./Header";
import { UserContext } from "./UserContext";
import NavigationMenuTop from "./NavigationMenuTop";
import { Outlet } from "react-router-dom";
function Layout() {
  const { user } = useContext(UserContext);
  return (
    <div
      className={`w-screen flex flex-col bg-cover bg-center bg-no-repeat h-screen
    ${user && "bg-profil-background-left"}`}
    >
      {user && <NavigationMenuTop></NavigationMenuTop>}
      {/* <Header></Header> */}
      <div className="w-full h-full rounded-t-[2rem] bg-white mt-32 ">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Layout;
