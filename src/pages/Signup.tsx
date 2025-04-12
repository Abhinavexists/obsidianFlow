
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Github, Mail, Loader2, Google } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, loginWithGitHub, loginWithGoogle } = useAuth();
  const [isSigningUp, setIsSigningUp] = React.useState(false);
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: SignupFormValues) {
    setIsSigningUp(true);
    
    try {
      const result = await signUpWithEmail(data.email, data.password);
      
      if (result.success) {
        toast({
          title: "Account created successfully!",
          description: "Please check your email for verification instructions.",
        });
        
        // Redirect to the login page after successful signup
        navigate('/login');
      } else {
        toast({
          title: "Signup failed",
          description: result.error || "An error occurred during signup",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSigningUp(false);
    }
  }

  const handleGitHubLogin = async () => {
    const result = await loginWithGitHub();
    
    if (!result.success) {
      toast({
        title: "Login failed",
        description: result.error || "Could not connect to GitHub",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    
    if (!result.success) {
      toast({
        title: "Login failed",
        description: result.error || "Could not connect to Google",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container py-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-obsidian-400" />
            <span className="text-xl font-bold text-obsidian-300">ObsidianFlow</span>
          </Link>
        </div>
      </header>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 border border-border rounded-xl bg-card">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start organizing your knowledge today</p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <Button 
              variant="outline" 
              className="w-full gap-2"
              disabled={isSigningUp}
              onClick={handleGitHubLogin}
            >
              <Github className="h-5 w-5" />
              Sign up with GitHub
            </Button>
            <Button 
              variant="outline" 
              className="w-full gap-2"
              disabled={isSigningUp}
              onClick={handleGoogleLogin}
            >
              <Google className="h-5 w-5" />
              Sign up with Google
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

          {/* Email Signup Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} disabled={isSigningUp} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isSigningUp} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isSigningUp} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSigningUp}>
                {isSigningUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSigningUp ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-obsidian-400 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-border py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ObsidianFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Signup;
