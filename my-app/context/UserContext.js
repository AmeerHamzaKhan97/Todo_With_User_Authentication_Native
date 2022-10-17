import { createContext } from "react";

const UserContext = createContext({
  email: "",
  id: "",
  auth: false,
});

export default UserContext;
