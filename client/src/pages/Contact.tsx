import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Loader2 } from "lucide-react";

export default function Contact() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Message Sent!",
            description: "We'll get back to you within 24 hours."
        });

        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setIsSubmitting(false);
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <div className="bg-primary/5 py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">Get in Touch</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Have a question about our jewelry or need assistance? We'd love to hear from you.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="font-serif text-2xl text-primary mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">Phone</p>
                                        <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition">
                                            +91 98765 43210
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MessageCircle className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">WhatsApp</p>
                                        <a
                                            href="https://wa.me/919876543210"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition"
                                        >
                                            +91 98765 43210
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">Email</p>
                                        <a href="mailto:support@amiora.com" className="text-muted-foreground hover:text-primary transition">
                                            support@amiora.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">Address</p>
                                        <p className="text-muted-foreground">
                                            123 Diamond Lane, Zaveri Bazaar<br />
                                            Mumbai, Maharashtra 400002
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">Business Hours</p>
                                        <p className="text-muted-foreground">
                                            Mon - Sat: 10:00 AM - 8:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-card border rounded-2xl p-8 shadow-sm">
                            <h2 className="font-serif text-2xl text-primary mb-6">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleChange("phone", e.target.value)}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject *</Label>
                                        <Input
                                            id="subject"
                                            value={formData.subject}
                                            onChange={(e) => handleChange("subject", e.target.value)}
                                            placeholder="Product inquiry"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message *</Label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                        placeholder="Tell us how we can help you..."
                                        rows={5}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full sm:w-auto"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
