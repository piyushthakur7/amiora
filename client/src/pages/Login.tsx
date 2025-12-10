import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            // Mock Login
            login(email);
            toast({
                title: "Welcome back!",
                description: "You have successfully logged in."
            });
            setLocation("/");
        } else {
            toast({
                title: "Error",
                description: "Please enter both email and password.",
                variant: "destructive"
            })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md border-gold/20 shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="font-serif text-3xl text-primary">Sign In</CardTitle>
                    <CardDescription>
                        Enter your email to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-gold/30 focus-visible:ring-gold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-gold/30 focus-visible:ring-gold"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-serif tracking-wide h-11">
                            Sign In
                        </Button>
                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Don't have an account? </span>
                            <Link href="/register" className="text-gold hover:underline font-medium">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
