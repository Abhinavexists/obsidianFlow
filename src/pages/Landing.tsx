
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Bookmark, Brain, Link2, Search } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navigation */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-obsidian-400" />
            <span className="text-xl font-bold text-obsidian-300">ObsidianFlow</span>
          </div>
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li className="ml-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">Log in</Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left md:pr-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-obsidian-100 to-obsidian-400">
              Your Second Brain for Knowledge Management
            </h1>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl md:max-w-none">
              Organize your thoughts, connect ideas, and build a personal knowledge base with our powerful markdown editor and note-linking system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/app">
                <Button size="lg" variant="outline">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="rounded-xl overflow-hidden border border-border bg-card p-1">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
                alt="ObsidianFlow Screenshot" 
                className="rounded-lg w-full h-auto shadow-xl transition-all hover:scale-[1.02] duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/20 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-obsidian-200">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain />}
              title="Knowledge Graph"
              description="Visualize connections between your notes and ideas with an interactive knowledge graph."
            />
            <FeatureCard 
              icon={<Link2 />}
              title="Note Linking"
              description="Create bi-directional links between notes to build a network of connected thoughts."
            />
            <FeatureCard 
              icon={<Search />}
              title="Smart Search"
              description="Find exactly what you're looking for with our powerful search capabilities."
            />
            <FeatureCard 
              icon={<Bookmark />}
              title="Tags & Categories"
              description="Organize your notes with flexible tagging and categorization systems."
            />
            <FeatureCard 
              icon={<BookOpen />}
              title="Markdown Support"
              description="Write in plain text with markdown formatting for a distraction-free experience."
            />
            <FeatureCard 
              icon={<ArrowRight />}
              title="Export & Share"
              description="Export your notes in multiple formats or share them securely with others."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-obsidian-200">
          Ready to organize your knowledge?
        </h2>
        <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
          Join thousands of users who are building their second brain with ObsidianFlow.
        </p>
        <Link to="/signup">
          <Button size="lg" className="gap-2">
            Get Started Now <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-5 w-5 text-obsidian-400" />
              <span className="text-lg font-semibold text-obsidian-300">ObsidianFlow</span>
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <a href="mailto:contact@obsidianflow.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            © {new Date().getFullYear()} ObsidianFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-card border border-border p-6 rounded-lg hover:shadow-md transition-all hover:border-obsidian-500/30 hover:scale-[1.02]">
      <div className="w-12 h-12 bg-obsidian-500/10 rounded-lg flex items-center justify-center mb-4 text-obsidian-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
