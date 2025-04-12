
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, GanttChart } from 'lucide-react';

interface SocialLoginButtonsProps {
  onGitHubLogin: () => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  isLoading: boolean;
  isSignUp?: boolean;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGitHubLogin,
  onGoogleLogin,
  isLoading,
  isSignUp = false
}) => {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <Button 
        variant="outline" 
        className="w-full gap-2" 
        disabled={isLoading}
        onClick={onGitHubLogin}
      >
        <Github className="h-5 w-5" />
        {isSignUp ? 'Sign up with GitHub' : 'Continue with GitHub'}
      </Button>
      <Button 
        variant="outline" 
        className="w-full gap-2" 
        disabled={isLoading}
        onClick={onGoogleLogin}
      >
        <GanttChart className="h-5 w-5" />
        {isSignUp ? 'Sign up with Google' : 'Continue with Google'}
      </Button>
      
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-2 text-xs text-muted-foreground">OR</span>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
