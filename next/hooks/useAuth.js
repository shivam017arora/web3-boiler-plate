import React, { useState, createContext, useContext, useEffect } from "react";

const context = createContext();
const { Provider } = context;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </Provider>
  );
};

const useAuth = () => useContext(context);

export default useAuth;
