import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";
import { useCart } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const imageSrc = product.images[0]?.src || '';
  const isOnSale = product.onSale || false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <Card className="group overflow-hidden border-card-border hover-elevate transition-all duration-300" data-testid={`card-product-${product.id}`}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-accent/20">
          <Link href={`/product/${product.slug}`}>
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-testid={`img-product-${product.id}`}
            />
          </Link>
          
          {isOnSale && (
            <Badge
              variant="destructive"
              className="absolute top-3 left-3"
              data-testid={`badge-sale-${product.id}`}
            >
              Sale
            </Badge>
          )}

          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full shadow-md"
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="default"
              className="h-9 w-9 rounded-full shadow-md"
              onClick={handleAddToCart}
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-medium text-base mb-2 line-clamp-2 hover:text-primary transition-colors" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-primary" data-testid={`text-price-${product.id}`}>
              {product.price}
            </span>
            {isOnSale && product.regularPrice && (
              <span className="text-sm text-muted-foreground line-through" data-testid={`text-regular-price-${product.id}`}>
                {product.regularPrice}
              </span>
            )}
          </div>

          {product.shortDescription && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {product.shortDescription}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
