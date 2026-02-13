import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../lib/woocommerce";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share2, Truck, Shield, RefreshCw } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, useMemo } from "react";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { useToast } from "@/hooks/use-toast";
import { mapCategory } from "../lib/mapCategory";

export default function ProductDetail() {
  const params = useParams();
  const productSlug = params.slug || "";
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const { data: products } = useQuery({
    queryKey: ["/api/products"],
    queryFn: () => getProducts(),
  });

  const product = products?.find((p: any) => p.slug === productSlug);

  // Map the bucket of the current product
  const productBucket = useMemo(() => {
    if (!product) return null;
    const wcCategories = product.categories || [];
    return mapCategory(wcCategories[0]?.name || "");
  }, [product]);

  // Get related products from SAME bucket
  const relatedProducts = useMemo(() => {
    if (!products || !productBucket) return [];

    return products.filter((p: any) => {
      if (p.id === product.id) return false;
      const wcCats = p.categories || [];
      const mapped = mapCategory(wcCats[0]?.name || "");
      return mapped === productBucket;
    });
  }, [products, product, productBucket]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Amiora Diamonds`;
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  if (!products) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="flex gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-20" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 text-center">
        <h1 className="font-serif text-4xl mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you're looking for doesn't exist.
        </p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const images =
    product.images.length > 0
      ? product.images
      : [{ id: 0, src: "", alt: product.name }];

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <nav className="text-sm text-muted-foreground mb-8">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
        {/* LEFT SECTION */}
        <div className="space-y-4">
          <div className="aspect-square md:aspect-auto md:h-[500px] rounded-lg overflow-hidden bg-accent/20 flex items-center justify-center">
            <img
              src={images[selectedImage]?.src}
              alt={images[selectedImage]?.alt || product.name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image: any, index: number) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                    }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt || `${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-primary">
                {product.price}
              </span>
              {product.onSale && product.regularPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {product.regularPrice}
                  </span>
                  <Badge variant="destructive">Sale</Badge>
                </>
              )}
            </div>

            {product.shortDescription && (
              <p className="text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>
            )}
          </div>

          {product.attributes?.length > 0 && (
            <div className="space-y-3">
              {product.attributes.map((attr: any) => (
                <div key={attr.id}>
                  <p className="text-sm font-semibold mb-2">{attr.name}:</p>
                  <div className="flex gap-2">
                    {attr.options.map((option: string) => (
                      <Badge key={option} variant="outline">
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="px-4 py-2 min-w-12 text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>

            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => {
                if (!product) return;
                const inWishlist = isInWishlist(product.id);
                if (inWishlist) {
                  removeFromWishlist(product.id);
                  toast({ title: "Removed from wishlist" });
                } else {
                  addToWishlist(product);
                  toast({ title: "Added to wishlist", description: `${product.name} saved to your wishlist.` });
                }
              }}
            >
              <Heart className={`h-4 w-4 mr-2 ${product && isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              {product && isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="border-t border-border pt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free shipping on orders above ₹50,000</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RefreshCw className="h-5 w-5 text-primary" />
              <span>30-day easy return policy</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-primary" />
              <span>100% certified authentic jewelry</span>
            </div>
          </div>

          {product.sku && (
            <p className="text-sm text-muted-foreground">
              SKU: {product.sku}
            </p>
          )}
        </div>
      </div>

      {/* TABS */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="size">Size Guide</TabsTrigger>
          <TabsTrigger value="delivery">Delivery & Returns</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p className="text-foreground leading-relaxed">
              {product.description ||
                product.shortDescription ||
                "No description available."}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <div className="space-y-2">
            {product.attributes?.map((attr: any) => (
              <div
                key={attr.id}
                className="flex py-2 border-b border-border"
              >
                <span className="font-semibold w-32">{attr.name}:</span>
                <span className="text-muted-foreground">
                  {attr.options.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="size" className="mt-6">
          <p className="text-muted-foreground">
            Please contact our customer service for sizing assistance.
            We offer complimentary resizing services.
          </p>
        </TabsContent>

        <TabsContent value="delivery" className="mt-6">
          <div className="space-y-4 text-foreground">
            <div>
              <h3 className="font-semibold mb-2">Delivery</h3>
              <p className="text-muted-foreground">
                Free delivery on orders above ₹50,000.
                Standard delivery takes 5-7 business days.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Returns</h3>
              <p className="text-muted-foreground">
                Easy 30-day return policy. Items must be in original condition
                with certificate.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-serif text-3xl font-bold mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
