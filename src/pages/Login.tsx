
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  const { loginWithGitHub, loginWithGoogle } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleGitHubLogin = async () => {
    try {
      setIsLoggingIn(true);
      const result = await loginWithGitHub();
      
      if (!result.success) {
        toast({
          title: "Login failed",
          description: result.error || "Could not connect to GitHub",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      const result = await loginWithGoogle();
      
      if (!result.success) {
        toast({
          title: "Login failed",
          description: result.error || "Could not connect to Google",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard 
        title="Welcome back"
        description="Log in to access your notes"
        footerText="Don't have an account yet?"
        footerLinkText="Sign up"
        footerLinkUrl="/signup"
      >
        <SocialLoginButtons 
          onGitHubLogin={handleGitHubLogin}
          onGoogleLogin={handleGoogleLogin}
          isLoading={isLoggingIn}
        />
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
