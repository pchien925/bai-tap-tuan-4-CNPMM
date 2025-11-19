import { Spin } from "antd";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/layout/Header";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { appLoading } = useContext(AuthContext);

  if (appLoading) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.95)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}>
        <Spin size="large" tip="Đang tải ứng dụng..." />
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
