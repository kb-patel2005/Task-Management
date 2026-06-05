// UserContext.js
import { createContext, useState } from "react";

export const UserContext = createContext();   // <-- export this

export const UserProvider = ({ children }) => {
  const [loggedUser, setUser] = useState(null);

  const setUserData = (userData) => setUser(userData);
  const clearUserData = () => setUser(null);

  return (
    <UserContext.Provider value={{ loggedUser, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};
