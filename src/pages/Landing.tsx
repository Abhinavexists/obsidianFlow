"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Brain,
  Link2,
  Search,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Star,
  ArrowUpRight,
} from "lucide-react"
import { motion } from "framer-motion"

const Landing: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 overflow-hidden">
      {/* Header / Navigation */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <BookOpen className="h-6 w-6 text-obsidian-400" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-obsidian-300 to-obsidian-100"
            >
              ObsidianFlow
            </motion.span>
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-md border-b border-border"
          >
            <nav className="container py-4">
              <ul className="flex flex-col gap-4">
                <MobileNavItem to="/features" label="Features" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavItem to="/pricing" label="Pricing" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavItem to="/about" label="About" onClick={() => setMobileMenuOpen(false)} />
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
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] bg-obsidian-500/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] bg-obsidian-400/10 rounded-full blur-[120px]" />
        </div>

        <div className="flex flex-col md:flex-row items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 text-center md:text-left md:pr-12"
          >
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-obsidian-500/10 border border-obsidian-500/20 text-obsidian-300 text-sm font-medium">
              Organize your thoughts like never before
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-obsidian-100 to-obsidian-400">
              Your Second Brain for Knowledge Management
            </h1>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl md:max-w-none">
              Organize your thoughts, connect ideas, and build a personal knowledge base with our powerful markdown
              editor and note-linking system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-obsidian-400 to-obsidian-500 hover:from-obsidian-500 hover:to-obsidian-600 transition-all shadow-lg hover:shadow-obsidian-500/20"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="hover:border-obsidian-400 transition-all">
                  Try Demo
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-obsidian-300/20 flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-obsidian-300">1,000+</span> users already organizing their knowledge
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian-500/20 to-obsidian-400/20 rounded-xl blur-xl transform scale-95 translate-y-4"></div>
              <div className="rounded-xl overflow-hidden border border-obsidian-500/30 bg-card/80 backdrop-blur-sm p-1 shadow-xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80"
                  alt="ObsidianFlow Screenshot"
                  className="rounded-lg w-full h-auto transition-all hover:scale-[1.02] duration-300"
                />

                {/* Floating UI Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg shadow-lg p-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-obsidian-500/10 rounded-full flex items-center justify-center text-obsidian-400">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Knowledge Graph</p>
                    <p className="text-xs text-muted-foreground">Connect your ideas visually</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -top-6 -right-6 bg-card border border-border rounded-lg shadow-lg p-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-obsidian-500/10 rounded-full flex items-center justify-center text-obsidian-400">
                    <Link2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Bi-directional Links</p>
                    <p className="text-xs text-muted-foreground">Connect related notes</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="container py-12 border-y border-border/50">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground">TRUSTED BY KNOWLEDGE WORKERS WORLDWIDE</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {["Company A", "Company B", "Company C", "Company D", "Company E"].map((company, index) => (
            <div
              key={index}
              className="text-xl font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
            >
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="container py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-obsidian-500/10 border border-obsidian-500/20 text-obsidian-300 text-sm font-medium">
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-obsidian-200">
              Everything you need to organize your knowledge
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how ObsidianFlow helps you build your second brain with these powerful features
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="knowledge-graph" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 max-w-3xl mx-auto mb-12">
            <TabsTrigger value="knowledge-graph">Graph</TabsTrigger>
            <TabsTrigger value="note-linking">Linking</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <FeatureTabContent
            value="knowledge-graph"
            title="Knowledge Graph"
            description="Visualize connections between your notes and ideas with an interactive knowledge graph. Discover relationships you never knew existed."
            icon={<Brain className="h-6 w-6" />}
            image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80"
          />

          <FeatureTabContent
            value="note-linking"
            title="Bi-directional Linking"
            description="Create bi-directional links between notes to build a network of connected thoughts. Navigate your knowledge base with ease."
            icon={<Link2 className="h-6 w-6" />}
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
          />

          <FeatureTabContent
            value="search"
            title="Smart Search"
            description="Find exactly what you're looking for with our powerful search capabilities. Search by content, tags, or connections."
            icon={<Search className="h-6 w-6" />}
            image="https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&q=80"
          />

          <FeatureTabContent
            value="tags"
            title="Tags & Categories"
            description="Organize your notes with flexible tagging and categorization systems. Create your own organizational structure."
            icon={<Bookmark className="h-6 w-6" />}
            image="https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?auto=format&fit=crop&q=80"
          />

          <FeatureTabContent
            value="markdown"
            title="Markdown Support"
            description="Write in plain text with markdown formatting for a distraction-free experience. Focus on your content, not formatting."
            icon={<BookOpen className="h-6 w-6" />}
            image="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80"
          />

          <FeatureTabContent
            value="export"
            title="Export & Share"
            description="Export your notes in multiple formats or share them securely with others. Your knowledge is portable and always accessible."
            icon={<ArrowUpRight className="h-6 w-6" />}
            image="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80"
          />
        </Tabs>
      </section>

      {/* Features Grid Section */}
      <section className="bg-gradient-to-b from-secondary/10 to-background py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-obsidian-500/10 border border-obsidian-500/20 text-obsidian-300 text-sm font-medium">
              Key Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-obsidian-200">
              Transform how you manage information
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our features work together to create a seamless knowledge management experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain />}
              title="Knowledge Graph"
              description="Visualize connections between your notes and ideas with an interactive knowledge graph."
              delay={0.1}
            />
            <FeatureCard
              icon={<Link2 />}
              title="Note Linking"
              description="Create bi-directional links between notes to build a network of connected thoughts."
              delay={0.2}
            />
            <FeatureCard
              icon={<Search />}
              title="Smart Search"
              description="Find exactly what you're looking for with our powerful search capabilities."
              delay={0.3}
            />
            <FeatureCard
              icon={<Bookmark />}
              title="Tags & Categories"
              description="Organize your notes with flexible tagging and categorization systems."
              delay={0.4}
            />
            <FeatureCard
              icon={<BookOpen />}
              title="Markdown Support"
              description="Write in plain text with markdown formatting for a distraction-free experience."
              delay={0.5}
            />
            <FeatureCard
              icon={<ArrowUpRight />}
              title="Export & Share"
              description="Export your notes in multiple formats or share them securely with others."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-obsidian-500/10 border border-obsidian-500/20 text-obsidian-300 text-sm font-medium">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-obsidian-200">What our users are saying</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of knowledge workers who have transformed their workflow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="ObsidianFlow has completely transformed how I organize my research. The knowledge graph is a game-changer."
            author="Sarah Johnson"
            role="PhD Researcher"
            rating={5}
            delay={0.1}
          />
          <TestimonialCard
            quote="I've tried many note-taking apps, but nothing compares to the linking capabilities of ObsidianFlow. It's like having a second brain."
            author="Michael Chen"
            role="Software Engineer"
            rating={5}
            delay={0.2}
          />
          <TestimonialCard
            quote="The markdown support and clean interface make writing a joy. I can focus on my thoughts without distractions."
            author="Emily Rodriguez"
            role="Content Creator"
            rating={4}
            delay={0.3}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary/10 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-obsidian-500/10 border border-obsidian-500/20 text-obsidian-300 text-sm font-medium">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-obsidian-200">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about ObsidianFlow
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is ObsidianFlow?</AccordionTrigger>
                <AccordionContent>
                  ObsidianFlow is a knowledge management tool that helps you organize your thoughts, connect ideas, and
                  build a personal knowledge base. It features a powerful markdown editor, bi-directional linking, and
                  an interactive knowledge graph.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How is ObsidianFlow different from other note-taking apps?</AccordionTrigger>
                <AccordionContent>
                  Unlike traditional note-taking apps, ObsidianFlow focuses on the connections between your notes. With
                  features like bi-directional linking and the knowledge graph, you can visualize and navigate your
                  knowledge network in ways that aren't possible with linear note-taking systems.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, your data is encrypted and stored securely. We never access your notes without permission, and
                  you can export your data at any time. We also offer local storage options for users who prefer to keep
                  their data on their own devices.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I use ObsidianFlow offline?</AccordionTrigger>
                <AccordionContent>
                  Yes, ObsidianFlow has offline capabilities. You can create and edit notes without an internet
                  connection, and your changes will sync when you're back online.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What platforms is ObsidianFlow available on?</AccordionTrigger>
                <AccordionContent>
                  ObsidianFlow is available as a web app, as well as desktop applications for Windows, Mac, and Linux.
                  We also offer mobile apps for iOS and Android, so you can access your knowledge base from anywhere.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-500/30 to-obsidian-400/30 backdrop-blur-sm"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[50%] -right-[10%] w-[60%] h-[100%] bg-obsidian-500/20 rounded-full blur-[120px]" />
            <div className="absolute -bottom-[50%] -left-[10%] w-[60%] h-[100%] bg-obsidian-400/20 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 py-16 px-8 md:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to organize your knowledge?</h2>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Join thousands of users who are building their second brain with ObsidianFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-obsidian-600 hover:bg-white/90 transition-all shadow-lg"
                >
                  Get Started Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 transition-all"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-white/80">
                <span className="font-medium text-white">4.9/5</span> from over 500 reviews
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="container py-16 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-obsidian-200">Stay updated with our newsletter</h3>
          <p className="text-muted-foreground mb-6">
            Get the latest updates, tips, and insights on knowledge management.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="bg-gradient-to-r from-obsidian-400 to-obsidian-500">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-obsidian-400" />
                <span className="text-lg font-semibold text-obsidian-300">ObsidianFlow</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Your second brain for knowledge management. Organize your thoughts, connect ideas, and build a personal
                knowledge base.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-obsidian-300 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V7.344h2.54V5.622c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-obsidian-300 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-obsidian-300 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/features"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ObsidianFlow. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Navigation Item Component
const NavItem = ({ to, label }: { to: string; label: string }) => {
  return (
    <li>
      <Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
        {label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-obsidian-400 transition-all group-hover:w-full"></span>
      </Link>
    </li>
  )
}

// Mobile Navigation Item Component
const MobileNavItem = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center justify-between py-2 text-foreground hover:text-obsidian-300 transition-colors"
        onClick={onClick}
      >
        {label}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </li>
  )
}

// Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card border border-border p-6 rounded-lg hover:shadow-lg transition-all hover:border-obsidian-500/30 hover:scale-[1.02] group"
    >
      <div className="w-12 h-12 bg-obsidian-500/10 rounded-lg flex items-center justify-center mb-4 text-obsidian-400 group-hover:bg-obsidian-500/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}

// Feature Tab Content Component
const FeatureTabContent = ({
  value,
  title,
  description,
  icon,
  image,
}: {
  value: string
  title: string
  description: string
  icon: React.ReactNode
  image: string
}) => {
  return (
    <TabsContent value={value} className="mt-0">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-obsidian-500/10 rounded-full flex items-center justify-center text-obsidian-400">
              {icon}
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground mb-6">{description}</p>
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-obsidian-400 mt-0.5 shrink-0" />
                <span className="text-sm">
                  Feature benefit point {i} for {title}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link to="/features">
              <Button variant="outline" className="gap-2">
                Learn more about {title} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian-500/20 to-obsidian-400/20 rounded-xl blur-xl transform scale-95 translate-y-4"></div>
            <div className="rounded-xl overflow-hidden border border-obsidian-500/30 bg-card p-1 shadow-xl relative z-10">
              <img
                src={image || "/placeholder.svg"}
                alt={title}
                className="rounded-lg w-full h-auto aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  )
}

// Testimonial Card Component
const TestimonialCard = ({
  quote,
  author,
  role,
  rating,
  delay = 0,
}: {
  quote: string
  author: string
  role: string
  rating: number
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card border border-border p-6 rounded-lg hover:shadow-lg transition-all hover:border-obsidian-500/30"
    >
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
      <p className="text-foreground mb-6 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-obsidian-500/20 flex items-center justify-center text-obsidian-300 font-medium">
          {author.charAt(0)}
        </div>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Landing
