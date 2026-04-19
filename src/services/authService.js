import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';
const DEMO_USERS_KEY = 'demoUsers';
const DEMO_TOKEN_PREFIX = 'demo-token';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const getDemoUsers = () => {
  return JSON.parse(localStorage.getItem(DEMO_USERS_KEY) || '[]');
};

const saveDemoUsers = (users) => {
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
};

const createDemoSession = (user) => {
  const token = `${DEMO_TOKEN_PREFIX}-${user.username}`;
  localStorage.setItem('token', token);
  localStorage.setItem('username', user.username);
  return {
    token,
    type: 'Bearer',
    id: user.id,
    username: user.username,
    email: user.email,
    roles: ['ROLE_USER'],
    demoMode: true
  };
};

const isNetworkError = (error) => {
  return !error.response;
};

export const authService = {
  // Login user
  login: async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
      }
      return response.data;
    } catch (error) {
      if (isNetworkError(error)) {
        const demoUser = getDemoUsers().find(
          user => user.username === username && user.password === password
        );

        if (demoUser) {
          return createDemoSession(demoUser);
        }

        throw new Error('Backend is unavailable. Register a local demo account first, then sign in.');
      }

      throw error.response?.data || error.message;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
      }
      return response.data;
    } catch (error) {
      if (isNetworkError(error)) {
        const users = getDemoUsers();
        const existingUser = users.find(user => user.username === userData.username || user.email === userData.email);

        if (existingUser) {
          throw new Error('This username or email already exists in local demo mode.');
        }

        const demoUser = {
          id: Date.now(),
          username: userData.username,
          email: userData.email,
          password: userData.password
        };

        saveDemoUsers([...users, demoUser]);

        return {
          message: 'Registration successful in local demo mode. Redirecting to login...',
          username: demoUser.username,
          email: demoUser.email,
          demoMode: true
        };
      }

      throw error.response?.data || error.message;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get current user
  getCurrentUser: () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return { username, token };
  },

  // Validate token
  validateToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      if (token.startsWith(DEMO_TOKEN_PREFIX)) {
        return true;
      }
      
      const response = await api.get('/validate');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
};
