
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Github, Mail, Loader2, Google } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGitHub, loginWithGoogle } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoggingIn(true);
    
    try {
      const result = await loginWithEmail(data.email, data.password);
      
      if (result.success) {
        toast({
          title: "Login successful!",
          description: "Redirecting to your notes...",
        });
        
        navigate('/app');
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
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

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 border border-border rounded-xl bg-card">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Log in to access your notes</p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <Button 
              variant="outline" 
              className="w-full gap-2" 
              disabled={isLoggingIn}
              onClick={handleGitHubLogin}
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </Button>
            <Button 
              variant="outline" 
              className="w-full gap-2" 
              disabled={isLoggingIn}
              onClick={handleGoogleLogin}
            >
              <Google className="h-5 w-5" />
              Continue with Google
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

          {/* Email Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} disabled={isLoggingIn} />
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
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoggingIn} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-sm text-obsidian-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoggingIn ? 'Logging in...' : 'Log in'}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-obsidian-400 hover:underline">
                Sign up
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

export default Login;
