import React from "react";
import Header from "./Header";
import NavigationMenuTop from "./NavigationMenuTop";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="py-4 w-screen flex flex-col bg-black min-h-screen ">
      <NavigationMenuTop />
      {/* <Header></Header> */}
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
