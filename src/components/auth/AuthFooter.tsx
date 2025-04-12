
import React from 'react';

const AuthFooter: React.FC = () => {
  return (
    <footer className="border-t border-border py-4">
      <div className="container text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ObsidianFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default AuthFooter;
