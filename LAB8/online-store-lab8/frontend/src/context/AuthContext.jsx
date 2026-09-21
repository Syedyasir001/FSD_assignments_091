/**
 * AuthContext.jsx
 * ----------------
 * Provides global authentication state: logged-in user, JWT token,
 * login/logout/register actions.
 *
 * Token is persisted in localStorage under the key 'kaarya_griha_token'.
 */

import { createContext, useContext, useState, useCallback } from 'react';
import { loginUserApi, registerUserApi } from '../services/api';

const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = 'kaarya_griha_token';
const USER_STORAGE_KEY  = 'kaarya_griha_user';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    // Rehydrate from localStorage on first render
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY) || null
  );

  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const isLoggedIn = Boolean(authToken && currentUser);

  /** Persist token and user to localStorage */
  const persistAuthSession = useCallback((token, user) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setAuthToken(token);
    setCurrentUser(user);
  }, []);

  /** Login with email + password */
  const loginUser = useCallback(async (email, password) => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      const response = await loginUserApi({ email, password });
      const { token, user } = response.data.data;
      persistAuthSession(token, user);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';
      setAuthError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsAuthLoading(false);
    }
  }, [persistAuthSession]);

  /** Register a new account */
  const registerUser = useCallback(async (name, email, password) => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      const response = await registerUserApi({ name, email, password });
      const { token, user } = response.data.data;
      persistAuthSession(token, user);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed. Please try again.';
      setAuthError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsAuthLoading(false);
    }
  }, [persistAuthSession]);

  /** Log out the current user */
  const logoutUser = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setAuthToken(null);
    setCurrentUser(null);
    setAuthError(null);
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const contextValue = {
    currentUser,
    authToken,
    isLoggedIn,
    isAuthLoading,
    authError,
    loginUser,
    registerUser,
    logoutUser,
    clearAuthError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/** Custom hook to consume auth context */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return context;
}
