/**
 * Google OAuth Utility Functions
 * Handles Google authentication operations for login and registration
 */

// Base API URL - you can change this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Handle successful Google OAuth response
 * @param {Object} credentialResponse - Google OAuth credential response
 * @param {string} operationType - 'login' or 'register'
 * @returns {Promise<Object>} - Backend response
 */
export const handleGoogleAuth = async (credentialResponse, operationType = 'login') => {
  try {
    console.log(`Google ${operationType} success:`, credentialResponse);
    
    // Extract the JWT token from Google response
    const { credential } = credentialResponse;
    
    if (!credential) {
      throw new Error('No credential received from Google');
    }

    // Send to backend based on operation type
    const endpoint = operationType === 'login' ? '/auth/google/login' : '/auth/google/register';
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credential,
        operationType
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Google ${operationType} failed`);
    }

    const data = await response.json();
    
    // Store authentication token if provided by backend
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return {
      success: true,
      data,
      message: `Google ${operationType} successful`
    };

  } catch (error) {
    console.error(`Google ${operationType} error:`, error);
    
    return {
      success: false,
      error: error.message,
      message: `Google ${operationType} failed: ${error.message}`
    };
  }
};

/**
 * Handle Google OAuth error
 * @param {Error} error - Google OAuth error
 * @param {string} operationType - 'login' or 'register'
 */
export const handleGoogleError = (error, operationType = 'login') => {
  console.error(`Google ${operationType} error:`, error);
  
  // You can add custom error handling here
  // For example, show a toast notification
  return {
    success: false,
    error: error.message || 'Google authentication failed',
    message: `Google ${operationType} failed`
  };
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

/**
 * Get current user data
 * @returns {Object|null}
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  // You can add additional cleanup here
  // For example, redirect to login page
  window.location.href = '/login';
};

/**
 * Get authentication token
 * @returns {string|null}
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Set authentication token
 * @param {string} token
 */
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

/**
 * Set user data
 * @param {Object} user
 */
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};
