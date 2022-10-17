import React, { useState } from "react";
import UserContext from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    id: "",
    auth: false,
  });

  const login = (email, id, token) => {
    // console.log(token, "async");
    setUser((user) => ({ email: email, id: id, auth: true }));
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setUser((user) => ({ email: "", id: "", auth: false }));
    AsyncStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
