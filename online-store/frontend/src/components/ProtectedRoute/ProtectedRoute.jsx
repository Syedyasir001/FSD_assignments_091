/**
 * ProtectedRoute.jsx
 * -------------------
 * Wraps protected pages. Redirects to /account (login) if user is not logged in.
 * Passes the original URL as `?redirect=...` so the login page can redirect back.
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const currentLocation = useLocation();

  if (!isLoggedIn) {
    // Preserve the intended URL to redirect back after login
    const redirectPath = encodeURIComponent(currentLocation.pathname + currentLocation.search);
    return <Navigate to={`/account?redirect=${redirectPath}`} replace />;
  }

  return children;
}
