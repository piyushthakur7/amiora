import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

export function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();
  const { toast } = useToast();

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
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`
    });
  };

  return (
    <Card className="group overflow-hidden border hover:shadow-md transition">
      <CardContent className="p-0">
        <Link href={`/product/${slug}`}>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
          </div>
        </Link>

        {isOnSale && (
          <Badge className="absolute top-3 left-3">Sale</Badge>
        )}

        <div className="p-4">
          <Link href={`/product/${slug}`}>
            <h3 className="font-medium text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-primary">
              ₹{price}
            </span>
            {isOnSale && regularPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{regularPrice}
              </span>
            )}
          </div>

          {shortDescription && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {shortDescription}
            </p>
          )}

          <Button size="sm" className="mt-4 w-full" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
