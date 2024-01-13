import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./components/Layout.jsx";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import FindEventPage from "./pages/FindEventPage.jsx";
import MakeEventPage from "./pages/MakeEventPage.jsx";
import EventListPage from "./pages/EventListPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberProfilPage from "./pages/MemberProfilPage.jsx";
import MemberEventPage from "./pages/MemberEventPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/findEvent" element={<FindEventPage />}></Route>
            <Route path="/register" element={<LoginPage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
            <Route path="/account/:id" element={<MemberProfilPage />}></Route>
            <Route path="/events" element={<EventListPage />}></Route>
            <Route
              path="/event-detail/:id"
              element={<MemberEventPage />}
            ></Route>
            <Route path="/events/new" element={<MakeEventPage />}></Route>
            <Route path="/events/:id" element={<MakeEventPage />}></Route>
            <Route path="/settings" element={<SettingsPage />}></Route>
          </Route>
        </Routes>
      </UserContextProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
