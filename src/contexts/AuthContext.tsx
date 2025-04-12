
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithEmail: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  signUpWithEmail: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  loginWithGitHub: () => Promise<{success: boolean; url?: string; error?: string}>;
  loginWithGoogle: () => Promise<{success: boolean; url?: string; error?: string}>;
  logout: () => Promise<void>;
  isLoading: boolean;
  userProfile: { name?: string; avatar_url?: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<{ name?: string; avatar_url?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile data from profiles table
  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('name, avatar_url')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setUserProfile(data);
    }
  };

  // Set up auth state listener and initialize session
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const user = session?.user;
        setUser(user || null);
        
        // Use setTimeout to avoid potential recursion issues
        if (user) {
          setTimeout(() => {
            fetchUserProfile(user.id);
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user;
      setUser(user || null);
      
      if (user) {
        fetchUserProfile(user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.loginWithEmail(email, password);
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.signUpWithEmail(email, password);
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      console.error('Signup error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const loginWithGitHub = async () => {
    try {
      return await authService.loginWithGitHub();
    } catch (error) {
      console.error('GitHub login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      return await authService.loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await authService.logout();
    setIsLoading(false);
  };

  const value = {
    user,
    userProfile,
    isAuthenticated: !!user,
    loginWithEmail,
    signUpWithEmail,
    loginWithGitHub,
    loginWithGoogle,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
