// main.jsx hoặc index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';

import ForgotPasswordPage from './pages/forgotPasswordPage.jsx';
import ResetPasswordPage from './pages/resetPasswordPage.jsx';

import { AuthWrapper } from './component/context/AuthWrapper.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "user", element: <UserPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password/:token", element: <ResetPasswordPage /> },
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