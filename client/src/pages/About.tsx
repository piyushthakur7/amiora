import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Heart, Award, Users, Gem } from "lucide-react";

export default function About() {
    const values = [
        {
            icon: Gem,
            title: "Ethical Sourcing",
            description: "Our lab-grown diamonds are created sustainably without mining, ensuring minimal environmental impact."
        },
        {
            icon: Shield,
            title: "Certified Quality",
            description: "Every diamond comes with certification from leading gemological laboratories, guaranteeing authenticity."
        },
        {
            icon: Heart,
            title: "Craftsmanship",
            description: "Expert artisans hand-finish each piece, combining traditional techniques with modern precision."
        },
        {
            icon: Award,
            title: "Lifetime Warranty",
            description: "We stand behind our jewelry with comprehensive warranty coverage and free maintenance services."
        }
    ];

    const stats = [
        { value: "10,000+", label: "Happy Customers" },
        { value: "5,000+", label: "Pieces Crafted" },
        { value: "99.9%", label: "Customer Satisfaction" },
        { value: "15+", label: "Years of Excellence" }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Sparkles className="h-12 w-12 mx-auto mb-6 text-gold" />
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
                            Our Story
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                            At Amiora, we believe that luxury should be sustainable, ethical, and accessible.
                            Our journey began with a simple vision: to create stunning lab-grown diamond jewelry
                            that doesn't compromise on beauty or values.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
                                Redefining Diamond Luxury
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Founded in Mumbai, Amiora was born from a passion for creating exquisite jewelry
                                    that tells a story. We recognized that modern consumers want more than just beauty –
                                    they want pieces that align with their values.
                                </p>
                                <p>
                                    Our lab-grown diamonds are chemically, physically, and optically identical to mined
                                    diamonds, but created in controlled environments using cutting-edge technology.
                                    This means you get the same brilliance and fire, with a significantly smaller
                                    environmental footprint.
                                </p>
                                <p>
                                    Every Amiora piece is designed in-house and crafted by skilled artisans who bring
                                    decades of expertise to each creation. From engagement rings to everyday elegance,
                                    we create jewelry that becomes part of life's most precious moments.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"
                                alt="Diamond craftsmanship"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-gold text-primary px-6 py-4 rounded-xl shadow-lg">
                                <p className="font-serif text-3xl font-bold">15+</p>
                                <p className="text-sm">Years of Excellence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-primary/5 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="font-serif text-3xl md:text-4xl text-primary mb-2">{stat.value}</p>
                                <p className="text-muted-foreground text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Our Values</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            What sets Amiora apart is our unwavering commitment to quality, ethics, and customer satisfaction.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-card border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                            >
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/Founder */}
            <section className="bg-secondary/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Users className="h-10 w-10 mx-auto mb-6 text-primary" />
                        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6">
                            Meet The Team
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            Behind every Amiora piece is a team of passionate designers, gemologists, and craftsmen
                            who share a common goal: creating jewelry that inspires. Led by industry veterans with
                            decades of experience in fine jewelry, our team combines traditional artistry with
                            modern innovation to deliver exceptional quality.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="font-serif">
                                Connect With Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                        Experience Amiora
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Discover our collection of ethically crafted lab-grown diamond jewelry.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop">
                            <Button size="lg" className="font-serif px-8">
                                Shop Collection
                            </Button>
                        </Link>
                        <Link href="/info/find-store">
                            <Button size="lg" variant="outline" className="font-serif px-8">
                                Visit Store
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
