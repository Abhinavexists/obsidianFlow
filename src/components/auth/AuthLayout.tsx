
import React, { ReactNode } from 'react';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
