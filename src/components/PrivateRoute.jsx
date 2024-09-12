// src/components/PrivateRoute.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.invoices.user);

  // If user exists and isAuthenticated is true, render the children
  return user && user.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
