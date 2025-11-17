import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: { email: "", name: "" },
  });

  const [appLoading, setAppLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, appLoading, setAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
};