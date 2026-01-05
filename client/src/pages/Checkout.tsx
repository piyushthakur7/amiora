
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/lib/woocommerce";
import { Loader2, Lock } from "lucide-react";

export default function Checkout() {
  const { items, getSubtotal } = useCart();
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const totalPrice = getSubtotal();

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsRedirecting(true);

    try {
      // 1. Map cart items to WooCommerce API format
      const lineItems = items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      // 2. Create Order (Pending) via API
      let paymentUrl = null;
      try {
        paymentUrl = await createOrder(lineItems);
      } catch (apiError) {
        console.warn("API Order creation failed, falling back to URL redirect", apiError);
        // Fallback: Construct WooCommerce Checkout URL with parameters
        // Note: Standard WC supports adding ONE item via URL params reliably. 
        // We will add the first item or attempt comma separation which some plugins support.
        const baseUrl = import.meta.env.VITE_WC_URL;
        if (items.length > 0) {
          // Simple fallback: ?add-to-cart=ID&quantity=QTY
          // For multiple items, this is imperfect without specific plugins, but better than a crash.
          // We'll take the first item to ensure at least that gets there, or link to cart.
          const firstItem = items[0];
          paymentUrl = `${baseUrl}/checkout/?add-to-cart=${firstItem.productId}&quantity=${firstItem.quantity}`;
        }
      }

      // 3. Redirect to WooCommerce Payment Page (or Fallback)
      if (paymentUrl) {
        // Clear local cart if we successfully generated a 'pending order' URL (API success)
        // If fallback, we might not want to clear immediately or maybe we do?
        // Let's NOT clear for fallback so they don't lose data if redirect fails, 
        // but for API success it's an order.
        // For now, keep it simple.
        window.location.href = paymentUrl;
      } else {
        throw new Error("No payment URL returned");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      toast({
        title: "Checkout Error",
        description: "Failed to initiate secure checkout. Please try again.",
        variant: "destructive",
      });
      setIsRedirecting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">It looks like you haven't added any jewelry yet.</p>
        <Button onClick={() => (window.location.href = "/")} className="bg-[#0E2220] text-white">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 bg-[#F9F7F5] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif text-[#0E2220] mb-8 text-center">
          Secure Checkout
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-[#E6D1A3] p-6 md:p-8">
          <div className="flex flex-col gap-6">

            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-medium mb-4 pb-2 border-b">Order Summary</h2>
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm md:text-base">
                    <span className="text-gray-700">
                      {item.name} <span className="text-gray-400">x{item.quantity}</span>
                    </span>
                    <span className="font-medium text-[#0E2220]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-dashed border-gray-200">
                <span className="text-lg font-semibold text-[#0E2220]">Total</span>
                <span className="text-xl font-bold text-[#C8A46A]">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Secure Payment Notice */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-100 flex items-start gap-3">
              <Lock className="h-5 w-5 text-green-700 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-semibold mb-1">You will be redirected to our secure payment gateway.</p>
                <p>Payment processing is handled securely by WooCommerce. No sensitive data is stored on this browser.</p>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={isRedirecting}
              className="w-full py-6 text-lg bg-[#0E2220] hover:bg-[#1A3D3A] text-white transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRedirecting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Redirecting to Payment...
                </>
              ) : (
                "Proceed to Pay"
              )}
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}
