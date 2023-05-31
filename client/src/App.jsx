import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import IndexPage from "./pages/IndexPAge.jsx";
import Layout from "./components/Layout.jsx";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import FindEventPage from "./pages/FindEventPage.jsx";
import MakeEventPage from "./pages/MakeEventPage.jsx";
import EventListPage from "./pages/EventListPage.jsx";
axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<LoginPage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
          <Route path="/makeEvent" element={<MakeEventPage />}></Route>
          <Route path="/findEvent" element={<FindEventPage />}></Route>
          <Route path="/eventList" element={<EventListPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
