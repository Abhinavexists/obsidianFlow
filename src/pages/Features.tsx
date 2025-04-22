import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  Brain, 
  Link2, 
  Search, 
  Sparkles, 
  FileText, 
  Menu, 
  X 
} from "lucide-react";
import { motion } from "framer-motion";

// Reuse NavItem from Landing for consistency
const NavItem = ({ to, label }: { to: string; label: string }) => {
  return (
    <li>
      <Link to={to} className="text-sm font-medium hover:text-obsidian-300 transition-colors">
        {label}
      </Link>
    </li>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md hover:border-obsidian-400/30">
      <div className="w-12 h-12 bg-obsidian-500/10 rounded-full flex items-center justify-center text-obsidian-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link to="/">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-obsidian-400" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-obsidian-300 to-obsidian-100">
                  ObsidianFlow
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <NavItem to="/features" label="Features" />
              <NavItem to="/pricing" label="Pricing" />
              <NavItem to="/about" label="About" />
              <li className="ml-4">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:border-obsidian-400 transition-all">
                    Log in
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-obsidian-400 to-obsidian-500 hover:from-obsidian-500 hover:to-obsidian-600 transition-all"
                  >
                    Sign up
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border">
            <nav className="container py-4">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link to="/features" className="text-sm font-medium hover:text-obsidian-300 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm font-medium hover:text-obsidian-300 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm font-medium hover:text-obsidian-300 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    About
                  </Link>
                </li>
                <li className="pt-4 border-t border-border">
                  <div className="flex gap-4">
                    <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-obsidian-400 to-obsidian-500">Sign up</Button>
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container py-16 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] bg-obsidian-500/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] bg-obsidian-400/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-obsidian-100 to-obsidian-400">
            Powerful Features for Your Knowledge Journey
          </h1>
          <p className="text-lg mb-8 text-muted-foreground max-w-3xl mx-auto">
            ObsidianFlow combines powerful note-taking capabilities with AI-powered features to help you organize, connect, and expand your knowledge.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FileText className="h-6 w-6" />}
            title="Markdown Editor"
            description="Write in Markdown with live preview. Support for headings, lists, code blocks, and more for structured notes."
          />
          <FeatureCard
            icon={<Link2 className="h-6 w-6" />}
            title="Bi-directional Links"
            description="Create connections between notes with [[double bracket]] links. Automatically track backlinks."
          />
          <FeatureCard
            icon={<Search className="h-6 w-6" />}
            title="Smart Search"
            description="Find what you need quickly with full-text search and AI-enhanced query understanding."
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="Knowledge Graph"
            description="Visualize connections between your notes with an interactive graph view."
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="AI Assistance"
            description="Generate content, summarize notes, check grammar, and discover connections with AI."
          />
          <FeatureCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Tags & Organization"
            description="Organize your notes with tags and get AI suggestions for categorization."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 mb-16">
        <div className="bg-gradient-to-r from-obsidian-500/20 to-obsidian-400/20 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Organize Your Knowledge?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their note-taking and knowledge management experience.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-obsidian-400 to-obsidian-500 hover:from-obsidian-500 hover:to-obsidian-600 transition-all shadow-lg hover:shadow-obsidian-500/20"
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-5 w-5 text-obsidian-400" />
              <span className="text-lg font-semibold">ObsidianFlow</span>
            </div>
            <div className="flex gap-6">
              <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
            © {new Date().getFullYear()} ObsidianFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features; 