import { Link } from "wouter";
import { useWishlist } from "@/lib/wishlist-store";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { HeartOff } from "lucide-react";

export default function Wishlist() {
    const { items } = useWishlist();

    return (
        <div className="container mx-auto px-4 py-12 min-h-[60vh]">
            <h1 className="font-serif text-3xl md:text-5xl text-primary mb-8 text-center">
                Your Wishlist
            </h1>

            {items.length === 0 ? (
                <div className="text-center flex flex-col items-center justify-center py-20">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                        <HeartOff className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
                    <p className="text-muted-foreground mb-8 text-center max-w-sm">
                        Save items you love here to review or buy later.
                    </p>
                    <Link href="/shop">
                        <Button className="bg-primary hover:bg-primary/90 text-white font-serif px-8 py-6 text-lg">
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
