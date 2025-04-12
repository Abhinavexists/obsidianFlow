
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkUrl: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkUrl
}) => {
  return (
    <div className="w-full max-w-md p-8 border border-border rounded-xl bg-card">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {children}
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          {footerText}{" "}
          <Link to={footerLinkUrl} className="text-obsidian-400 hover:underline">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthCard;
