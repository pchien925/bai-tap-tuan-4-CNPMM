import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';

import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import ProductPage from './pages/ProductPage.jsx';
import RegisterPage from './pages/register.jsx';
import ResetPasswordPage from './pages/resetPasswordPage.jsx';
import UserPage from './pages/user.jsx';

import { AuthWrapper } from './context/AuthWrapper.jsx';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import { PublicRoute } from './routes/PublicRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },

      // Các trang công khai
      { path: "login", element: <PublicRoute><LoginPage /></PublicRoute> },
      { path: "register", element: <PublicRoute><RegisterPage /></PublicRoute> },
      { path: "forgot-password", element: <PublicRoute><ForgotPasswordPage /></PublicRoute> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },

      // Trang yêu cầu đăng nhập
      { path: "user", element: <ProtectedRoute><UserPage /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><ProductPage /></ProtectedRoute> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>
);
