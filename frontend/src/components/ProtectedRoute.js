// ProtectedRoute.jsx - Add authentication check for admin routes

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  // Get user from your auth context/state
  // This is an example - adjust based on your auth implementation
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthenticated = !!user.token;
  const hasRequiredRole = user.role === requiredRole;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!hasRequiredRole) {
    // Redirect to home if user doesn't have required role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

// Usage in App.js:
// import ProtectedRoute from './components/ProtectedRoute';
// 
// <Route 
//   path="/admin/dashboard" 
//   element={
//     <ProtectedRoute requiredRole="admin">
//       <AdminDashboard />
//     </ProtectedRoute>
//   } 
// />