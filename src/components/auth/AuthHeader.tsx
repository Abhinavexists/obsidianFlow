
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const AuthHeader: React.FC = () => {
  return (
    <header className="border-b border-border">
      <div className="container py-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-obsidian-400" />
          <span className="text-xl font-bold text-obsidian-300">ObsidianFlow</span>
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
