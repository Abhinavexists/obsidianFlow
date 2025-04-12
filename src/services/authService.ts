
// Simple mock authentication service
// In a real app, this would connect to a backend authentication service

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Simulate some registered users
const MOCK_USERS = [
  {
    id: "1",
    email: "user@example.com",
    name: "Demo User",
    password: "password123"
  },
  {
    id: "2",
    email: "admin@example.com",
    name: "Admin User",
    password: "admin123"
  }
];

// Store the current user in local storage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('obsidianflow-current-user');
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (e) {
      console.error('Failed to parse current user:', e);
      return null;
    }
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Login user
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user with matching email and password
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Create a safe user object without the password
    const safeUser: User = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    
    // Store user in localStorage
    localStorage.setItem('obsidianflow-current-user', JSON.stringify(safeUser));
    
    return {
      success: true,
      user: safeUser
    };
  }
  
  return {
    success: false,
    error: "Invalid email or password"
  };
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem('obsidianflow-current-user');
};

const authService = {
  login,
  logout,
  isAuthenticated,
  getCurrentUser
};

export default authService;
