import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Menu, 
  X, 
  ArrowRight, 
  Users, 
  Code,  
  MessageSquare, 
  Github,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";

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

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, bio }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-obsidian-300 mb-3">{role}</p>
        <p className="text-muted-foreground">{bio}</p>
        <div className="flex gap-3 mt-4">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Github className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
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
            About ObsidianFlow
          </h1>
          <p className="text-lg mb-8 text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to transform how people capture, connect, and cultivate knowledge. Learn about our story and the team behind ObsidianFlow.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container py-12 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <p className="mb-4">
              ObsidianFlow began as a passion project in 2022 by a team of knowledge workers frustrated by the limitations of traditional note-taking applications. We were inspired by the concepts of networked thought and personal knowledge management.
            </p>
            <p className="mb-4">
              What started as a simple prototype quickly evolved as we discovered how transformative connected note-taking could be for creative thinking, research, and personal growth.
            </p>
            <p className="mb-4">
              Today, we're focused on building not just a note-taking app, but a comprehensive second brain system that leverages modern technology and AI to help people organize their thoughts, connect ideas, and discover new insights.
            </p>
            <p>
              Our team now includes designers, developers, and knowledge management experts dedicated to creating the most powerful and intuitive tools for personal knowledge management.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container py-12 mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="w-12 h-12 bg-obsidian-500/10 rounded-full flex items-center justify-center text-obsidian-400 mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">User-Centered</h3>
            <p className="text-muted-foreground">
              We design for real people with real knowledge management needs, prioritizing user experience and workflow efficiency.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="w-12 h-12 bg-obsidian-500/10 rounded-full flex items-center justify-center text-obsidian-400 mb-4">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Open Standards</h3>
            <p className="text-muted-foreground">
              We believe in the power of interoperability. Your notes use standard formats to ensure longevity and portability.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="w-12 h-12 bg-obsidian-500/10 rounded-full flex items-center justify-center text-obsidian-400 mb-4">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community-Driven</h3>
            <p className="text-muted-foreground">
              We actively engage with our user community to understand needs, collect feedback, and shape our roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container py-12 mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamMember
            name="Alex Morgan"
            role="Founder & CEO"
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
            bio="Alex has a background in cognitive science and has been obsessed with knowledge management for over a decade."
          />
          <TeamMember
            name="Jamie Lee"
            role="Lead Developer"
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
            bio="Jamie is a full-stack developer with expertise in React and graph database technologies."
          />
          <TeamMember
            name="Sam Chen"
            role="UX Designer"
            image="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80"
            bio="Sam is passionate about creating intuitive interfaces for complex systems and has previously worked at leading design agencies."
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="container py-12 mb-16">
        <div className="bg-gradient-to-r from-obsidian-500/20 to-obsidian-400/20 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg mb-8">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="gap-2 bg-obsidian-500 hover:bg-obsidian-600"
              >
                <Mail className="h-4 w-4" /> Contact Us
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:border-obsidian-400"
              >
                <Twitter className="h-4 w-4" /> Follow Us
              </Button>
            </div>
          </div>
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

export default About; 