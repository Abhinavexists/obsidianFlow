
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import SignupForm from '@/components/auth/SignupForm';

const Signup: React.FC = () => {
  const { loginWithGitHub, loginWithGoogle } = useAuth();
  const [isSigningUp, setIsSigningUp] = React.useState(false);

  const handleGitHubLogin = async () => {
    const result = await loginWithGitHub();
    
    if (!result.success) {
      toast({
        title: "Login failed",
        description: result.error || "Could not connect to GitHub",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    
    if (!result.success) {
      toast({
        title: "Login failed",
        description: result.error || "Could not connect to Google",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout>
      <AuthCard 
        title="Create your account"
        description="Start organizing your knowledge today"
        footerText="Already have an account?"
        footerLinkText="Log in"
        footerLinkUrl="/login"
      >
        <SocialLoginButtons 
          onGitHubLogin={handleGitHubLogin}
          onGoogleLogin={handleGoogleLogin}
          isLoading={isSigningUp}
          isSignUp={true}
        />
        <SignupForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;
