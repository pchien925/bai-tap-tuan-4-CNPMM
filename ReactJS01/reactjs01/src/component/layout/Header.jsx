import React, { useContext, useState } from 'react';
import { HomeOutlined, UsergroupAddOutlined, SettingOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

    const [current, setCurrent] = useState('home');
  // Nếu context chưa sẵn sàng (đang loading) → hiển thị loading nhẹ thay vì crash
  if (!context) {
    return (
      <Menu mode="horizontal" style={{ justifyContent: 'flex-end' }}>
        <Menu.Item key="loading">
          <Spin size="small" /> Đang tải...
        </Menu.Item>
      </Menu>
    );
  }

  // Bây giờ mới được destructuring an toàn
  const { isAuthenticated, user, setAuth } = context;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAuth({
      isAuthenticated: false,
      user: { email: "", name: "" },
    });
    navigate("/");
  };

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    ...(isAuthenticated
      ? [
          {
            label: <Link to="/users">Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
          },
        ]
      : []),

    // Menu tài khoản
    {
      label: isAuthenticated ? `Xin chào, ${user?.email || 'User'}` : 'Tài khoản',
      key: 'account',
      icon: <SettingOutlined />,
      children: isAuthenticated
        ? [
            {
              label: (
                <span onClick={handleLogout} style={{ color: '#ff4d4f' }}>
                  <LogoutOutlined /> Đăng xuất
                </span>
              ),
              key: 'logout',
            },
          ]
        : [
            {
              label: <Link to="/login"><LoginOutlined /> Đăng nhập</Link>,
              key: 'login',
            },
            {
              label: <Link to="/register">Đăng ký</Link>,
              key: 'register',
            },
          ],
    },
  ];



  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{ justifyContent: 'space-between' }}
    />
  );
};

export default Header;