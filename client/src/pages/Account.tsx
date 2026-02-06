import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    User, Package, Heart, MapPin, LogOut,
    ShoppingBag, Clock, ChevronRight, Loader2
} from "lucide-react";
import { useWishlist } from "@/lib/wishlist-store";
import { ProductCard } from "@/components/ProductCard";

// Mock orders for demo - in production, fetch from WooCommerce
const mockOrders = [
    {
        id: 12345,
        date: "2026-02-01",
        status: "processing",
        total: "₹45,999",
        items: 2
    },
    {
        id: 12298,
        date: "2026-01-15",
        status: "completed",
        total: "₹32,500",
        items: 1
    },
    {
        id: 12156,
        date: "2025-12-20",
        status: "completed",
        total: "₹78,000",
        items: 3
    }
];

export default function Account() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const [, setLocation] = useLocation();
    const { items: wishlistItems } = useWishlist();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            setLocation("/login");
        }
    }, [isAuthenticated, isLoading, setLocation]);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "bg-green-100 text-green-700";
            case "processing": return "bg-blue-100 text-blue-700";
            case "cancelled": return "bg-red-100 text-red-700";
            default: return "bg-yellow-100 text-yellow-700";
        }
    };

    return (
        <div className="min-h-screen bg-background py-8 md:py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl text-primary">My Account</h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome back, {user?.firstName || user?.name || "Customer"}!
                        </p>
                    </div>
                    <Button variant="outline" onClick={logout} className="gap-2 w-fit">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>

                <Tabs defaultValue="orders" className="space-y-6">
                    <TabsList className="grid w-full max-w-md grid-cols-3">
                        <TabsTrigger value="orders" className="gap-2">
                            <Package className="h-4 w-4" />
                            Orders
                        </TabsTrigger>
                        <TabsTrigger value="wishlist" className="gap-2">
                            <Heart className="h-4 w-4" />
                            Wishlist
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="gap-2">
                            <User className="h-4 w-4" />
                            Profile
                        </TabsTrigger>
                    </TabsList>

                    {/* Orders Tab */}
                    <TabsContent value="orders">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingBag className="h-5 w-5" />
                                    Order History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {mockOrders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="font-medium text-lg mb-2">No orders yet</h3>
                                        <p className="text-muted-foreground mb-6">
                                            Start shopping to see your orders here.
                                        </p>
                                        <Link href="/shop">
                                            <Button>Browse Collection</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {mockOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="border rounded-lg p-4 hover:bg-secondary/30 transition-colors"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-semibold">Order #{order.id}</span>
                                                            <Badge className={getStatusColor(order.status)}>
                                                                {order.status}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="h-3 w-3" />
                                                                {new Date(order.date).toLocaleDateString()}
                                                            </span>
                                                            <span>{order.items} item(s)</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-semibold text-primary">{order.total}</span>
                                                        <Link href={`/info/track-order?id=${order.id}`}>
                                                            <Button variant="ghost" size="sm" className="gap-1">
                                                                Track
                                                                <ChevronRight className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Wishlist Tab */}
                    <TabsContent value="wishlist">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-5 w-5" />
                                    My Wishlist ({wishlistItems.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {wishlistItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="font-medium text-lg mb-2">Your wishlist is empty</h3>
                                        <p className="text-muted-foreground mb-6">
                                            Save items you love to review or buy later.
                                        </p>
                                        <Link href="/shop">
                                            <Button>Explore Collection</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {wishlistItems.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Profile Tab */}
                    <TabsContent value="profile">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Personal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground">Name</label>
                                        <p className="font-medium">{user?.name || "Not set"}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Email</label>
                                        <p className="font-medium">{user?.email}</p>
                                    </div>
                                    <Button variant="outline" className="mt-4">
                                        Edit Profile
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Saved Addresses
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8">
                                        <MapPin className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                                        <p className="text-muted-foreground text-sm mb-4">
                                            No saved addresses yet
                                        </p>
                                        <Button variant="outline" size="sm">
                                            Add Address
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
