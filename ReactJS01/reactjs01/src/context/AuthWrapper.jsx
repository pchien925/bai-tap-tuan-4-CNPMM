import React, { useState, useEffect } from "react";
import axios from "../util/axios.customize";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from 'jwt-decode'; 

export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: { email: "", name: "", role: "" },
  });

  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setAppLoading(false); 
        return;
      }

      try {
        const decoded = jwtDecode(token);

        const res = await axios.get("/v1/api/users/user");
        if (res.data.EC === 0 && res.data.DT) {
          const me = res.data.DT.find(u => u.email === decoded.email);

          if (me) {
            setAuth({
              isAuthenticated: true,
              user: {
                email: me.email,
                name: me.name,
                role: me.role || "",
              },
            });
          } else {
            // Token hợp lệ nhưng user không tồn tại
            localStorage.removeItem("access_token");
            setAuth({
              isAuthenticated: false,
              user: { email: "", name: "", role: "" },
            });
          }
        } else {
          localStorage.removeItem("access_token");
          setAuth({
            isAuthenticated: false,
            user: { email: "", name: "", role: "" },
          });
        }
      } catch (error) {
        console.error("Auth check error >>>", error);
        localStorage.removeItem("access_token");
        setAuth({
          isAuthenticated: false,
          user: { email: "", name: "", role: "" },
        });
      } finally {
        setAppLoading(false); 
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
};