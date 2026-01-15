import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

import { useWishlist } from "@/lib/wishlist-store";

export function ProductCard({ product }: { product: any }) {
  const { addItem: addToCart } = useCart(); // Refactor collision
  const { toast } = useToast();
  const [imgError, setImgError] = React.useState(false);
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  // Map WooCommerce fields properly
  const imageSrc = product.images?.[0]?.src;
  const name = product.name;
  const price = product.price || product.regular_price;
  const regularPrice = product.regular_price;
  const shortDescription = product.short_description?.replace(/<\/?[^>]+(>|$)/g, "");
  const isOnSale = product.on_sale;
  const slug = product.slug || product.id;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`
    });
  };

  const fallbackImage = "https://images.unsplash.com/photo-1573408301185-a1d3106839b9?q=80&w=800&auto=format&fit=crop";

  return (
    <Card className="group overflow-hidden border-0 shadow-none bg-transparent hover:bg-transparent transition-none">
      <CardContent className="p-0">
        <Link href={`/product/${slug}`}>
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
            <img
              src={imgError ? fallbackImage : imageSrc}
              onError={() => setImgError(true)}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* HOVER OVERLAY */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* QUICK ACTIONS */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2">
              <Button
                variant="default"
                size="lg"
                className="flex-1 bg-card text-primary hover:bg-primary hover:text-white border-0 shadow-lg font-serif tracking-wide"
                onClick={handleAddToCart}
              >
                Add to Bag
              </Button>
              <Button
                size="icon"
                className="bg-white text-primary hover:bg-gold hover:text-white border-0 shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isLiked) {
                    removeItem(product.id);
                    toast({ title: "Removed from wishlist" });
                  } else {
                    addItem(product);
                    toast({ title: "Added to wishlist" });
                  }
                }}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </div>
        </Link>

        {isOnSale && (
          <Badge className="absolute top-3 left-3 bg-red-700 text-white rounded-none px-3 font-serif tracking-widest text-xs">
            SALE
          </Badge>
        )}

        <div className="pt-4 pb-2 text-center">
          <Link href={`/product/${slug}`}>
            <h3 className="font-serif text-lg text-foreground hover:text-gold transition-colors duration-300 mb-1">
              {name}
            </h3>
          </Link>

          <div className="flex items-center justify-center gap-3">
            {isOnSale && regularPrice && (
              <span className="text-sm text-muted-foreground line-through font-sans">
                {regularPrice}
              </span>
            )}
            <span className="text-lg font-medium text-primary font-sans tracking-wide">
              {price}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
