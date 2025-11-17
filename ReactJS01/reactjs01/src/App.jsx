import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Spin } from "antd";
import { AuthContext } from "./component/context/AuthContext";
import Header from "./component/layout/Header";
import axios from "./util/axios.customize";

const App = () => {
  const { setAuth, setAppLoading, appLoading } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setAppLoading(false);
        return;
      }

      try {
        const res = await axios.get("/v1/api/user");
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.data?.email || "",
            name: res.data?.name || "",
          },
        });
      } catch (err) {
        console.log(err)
        localStorage.removeItem("access_token");
        setAuth({ isAuthenticated: false, user: { email: "", name: "" } });
      } finally {
        setAppLoading(false);
      }
    };

    checkAuth();
  }, []); // chỉ chạy 1 lần khi load app

  if (appLoading) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.95)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;