// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!userInfoFromStorage) {
    return <Navigate to="/login" />;
  }

  // Если требуются права администратора, но пользователь не админ
  if (adminOnly && !userInfoFromStorage.isAdmin) {
    return <Navigate to="/" />;
  }

  // Иначе показываем защищенный контент
  return children;
};

export default PrivateRoute;
