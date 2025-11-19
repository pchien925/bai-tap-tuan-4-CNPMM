import { createContext } from "react";

export const AuthContext = createContext({
  auth: { isAuthenticated: false, user: { email: "", name: "" } },
  setAuth: () => {},
  appLoading: true,
  setAppLoading: () => {},
});