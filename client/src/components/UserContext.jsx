import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (!user) {
      axios.get("/user/profile").then(({ data, status }) => {
        if (status === 401) {
          setUser(null);
          setRedirect(true);
        } else {
          setUser(data);
          setReady(true);
        }
      });
    }
  }, [user, ready]);
  console.log(ready);
  if (redirect) {
    if (location.pathname !== "/login") {
      return <Navigate to={"/login"} />;
    }
  }
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
