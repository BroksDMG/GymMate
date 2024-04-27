import { useContext } from "react";
// import Header from "./Header";
import { UserContext } from "./UserContext";
import NavigationMenuTop from "./NavigationMenuTop";
import { Outlet, useLocation } from "react-router-dom";
function Layout() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isDisplayed =
    user && location.pathname !== "/login" && location.pathname !== "/register";
  return (
    <div
      className={`w-screen flex flex-col bg-cover bg-center bg-no-repeat h-screen
    ${user && "bg-profil-background-left"}`}
    >
      {isDisplayed && <NavigationMenuTop></NavigationMenuTop>}
      {/* <Header></Header> */}

      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
