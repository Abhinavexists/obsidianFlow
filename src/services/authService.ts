
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

// Get the current user from Supabase session
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};

// Login with email and password
export const loginWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    return {
      success: false,
      error: error.message
    };
  }
  
  return {
    success: true,
    user: data.user
  };
};

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    return {
      success: false,
      error: error.message
    };
  }
  
  return {
    success: true,
    user: data.user
  };
};

// Login with GitHub
export const loginWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/app`
    }
  });
  
  if (error) {
    return {
      success: false,
      error: error.message
    };
  }
  
  return {
    success: true,
    url: data.url
  };
};

// Login with Google
export const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/app`
    }
  });
  
  if (error) {
    return {
      success: false,
      error: error.message
    };
  }
  
  return {
    success: true,
    url: data.url
  };
};

// Logout user
export const logout = async () => {
  await supabase.auth.signOut();
};

const authService = {
  loginWithEmail,
  signUpWithEmail,
  loginWithGitHub,
  loginWithGoogle,
  logout,
  isAuthenticated,
  getCurrentUser
};

export default authService;
