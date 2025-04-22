import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen, Menu, X, ArrowRight } from "lucide-react";

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

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  buttonLink: string;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  description,
  features,
  highlighted = false,
  buttonText,
  buttonLink,
}) => {
  return (
    <div
      className={`rounded-xl border ${
        highlighted ? "border-obsidian-400" : "border-border"
      } p-8 relative`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <div className="px-4 py-1 bg-obsidian-500 text-white text-xs font-medium rounded-full">
            Most Popular
          </div>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold">{name}</h3>
        <div className="mt-3 mb-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-obsidian-300 mr-2 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link to={buttonLink}>
        <Button
          className={`w-full ${
            highlighted
              ? "bg-gradient-to-r from-obsidian-400 to-obsidian-500 hover:from-obsidian-500 hover:to-obsidian-600"
              : "bg-card hover:bg-card/80 border border-border"
          }`}
          variant={highlighted ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

const Pricing: React.FC = () => {
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg mb-8 text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include core note-taking features, with premium options for advanced functionality.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="container py-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingTier
            name="Free"
            price="Free"
            description="Perfect for getting started with note organization."
            features={[
              "Unlimited notes",
              "Basic Markdown support",
              "Note linking",
              "Web access",
              "Dark/light themes",
            ]}
            buttonText="Get Started"
            buttonLink="/signup"
          />
          <PricingTier
            name="Pro"
            price="$9.99"
            description="Enhanced features for serious note-takers."
            features={[
              "Everything in Free",
              "Knowledge graph visualization",
              "Unlimited storage",
              "Priority support",
              "Custom themes",
              "Export options (PDF, HTML)",
            ]}
            highlighted={true}
            buttonText="Try Pro for Free"
            buttonLink="/signup"
          />
          <PricingTier
            name="Premium"
            price="$19.99"
            description="The ultimate knowledge management experience."
            features={[
              "Everything in Pro",
              "AI-powered features",
              "Content generation",
              "Grammar checking",
              "Auto tag suggestions",
              "Smart connections",
              "Real-time collaboration",
            ]}
            buttonText="Get Premium"
            buttonLink="/signup"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-12 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Can I switch plans later?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Your billing will be adjusted accordingly.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Is there a mobile app?</h3>
            <p className="text-muted-foreground">
              We currently offer a responsive web application that works on mobile devices. Native mobile apps for iOS and Android are on our roadmap.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Can I export my notes?</h3>
            <p className="text-muted-foreground">
              Yes, all plans allow you to export your notes in Markdown format. Pro and Premium plans offer additional export options like PDF and HTML.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">How secure are my notes?</h3>
            <p className="text-muted-foreground">
              We use industry-standard encryption to protect your data. Your notes are private and only accessible by you unless you explicitly share them.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 mb-16">
        <div className="bg-gradient-to-r from-obsidian-500/20 to-obsidian-400/20 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Note-Taking?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get started with ObsidianFlow today and experience the power of connected knowledge.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-obsidian-400 to-obsidian-500 hover:from-obsidian-500 hover:to-obsidian-600 transition-all shadow-lg hover:shadow-obsidian-500/20"
            >
              Start for Free <ArrowRight className="h-4 w-4" />
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

export default Pricing; 