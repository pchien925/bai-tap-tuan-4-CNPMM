import { HomeOutlined, LoginOutlined, LogoutOutlined, UsergroupAddOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth, appLoading } = useContext(AuthContext);

  if (appLoading) return null;

  const { isAuthenticated, user } = auth;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAuth({
      isAuthenticated: false,
      user: { email: "", name: "" },
    });
    navigate("/");
  };

  const items = [
    { label: <Link to="/">Home</Link>, key: 'home', icon: <HomeOutlined /> },

    ...(isAuthenticated
      ? [
          { label: <Link to="/user">Danh sách User</Link>, key: 'user', icon: <UsergroupAddOutlined /> },
          { label: <Link to="/products">Sản phẩm</Link>, key: 'products', icon: <AppstoreOutlined /> },
        ]
      : []),

    {
      key: 'account',
      label: isAuthenticated ? (<span><UserOutlined /> {user?.name || user?.email || 'User'}</span>) : 'Tài khoản',
      children: isAuthenticated
        ? [{ label: <span onClick={handleLogout} style={{ color: '#ff4d4f' }}><LogoutOutlined /> Đăng xuất</span>, key: 'logout' }]
        : [
            { label: <Link to="/login"><LoginOutlined /> Đăng nhập</Link>, key: 'login' },
            { label: <Link to="/register">Đăng ký</Link>, key: 'register' },
          ],
    },
  ];

  return (
    <Menu
      mode="horizontal"
      items={items}
      style={{ justifyContent: 'space-between', lineHeight: '60px', fontSize: '16px' }}
      theme="dark"
      selectable={false}
    />
  );
};

export default Header;
