import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { initiatePayment, type CustomerDetails, type RazorpaySuccessResponse } from "@/lib/razorpay";
import { Loader2, Lock, ShoppingBag, CreditCard, MapPin, User } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { getStoredToken } from "@/lib/wp-auth";

export default function Checkout() {
  const { items, getSubtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<"details" | "payment">("details");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please sign in to complete your purchase.",
        variant: "destructive",
      });
      setLocation("/login?redirect=/checkout");
    }
  }, [isAuthenticated, isLoading, setLocation, toast]);

  // Customer form state — auto-fill from user profile
  const [customer, setCustomer] = useState<CustomerDetails>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      setCustomer((prev) => ({
        ...prev,
        firstName: prev.firstName || user.firstName || "",
        lastName: prev.lastName || user.lastName || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});

  const totalPrice = getSubtotal();

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!customer.firstName.trim()) newErrors.firstName = "First name is required";
    if (!customer.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!customer.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!customer.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(customer.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid Indian phone number";
    }
    if (!customer.address.trim()) newErrors.address = "Address is required";
    if (!customer.city.trim()) newErrors.city = "City is required";
    if (!customer.state.trim()) newErrors.state = "State is required";
    if (!customer.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(customer.pincode)) {
      newErrors.pincode = "Invalid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setCurrentStep("payment");
    }
  };

  const handlePayment = async () => {
    // DOUBLE-CLICK PROTECTION: Prevent multiple submissions
    if (isProcessing) {
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      setCurrentStep("details");
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Prepare line items for API
    const lineItems = items.map((item) => ({
      product_id: item.productId,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
    }));

    await initiatePayment(lineItems, customer, totalPrice, {
      onSuccess: (response: RazorpaySuccessResponse, wcOrderId: number) => {
        // Payment popup completed - redirect to thank you page
        clearCart();
        const params = new URLSearchParams({
          order: String(wcOrderId),
          payment_id: response.razorpay_payment_id
        });
        setLocation(`/thank-you?${params.toString()}`);
      },
      onDismiss: () => {
        setIsProcessing(false);
        toast({
          title: "Payment Cancelled",
          description: "You closed the payment window. Your order is saved as pending.",
        });
      },
      onError: (error) => {
        setIsProcessing(false);
        toast({
          title: "Order Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    }, getStoredToken() || undefined, paymentMethod);
  };

  // Not authenticated or loading — show nothing (redirect will happen)
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          It looks like you haven't added any jewelry yet.
        </p>
        <Button
          onClick={() => setLocation("/")}
          className="bg-primary text-white hover:bg-primary/90"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif text-primary mb-8 text-center">
          Secure Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStep === "details"
                ? "bg-primary text-white"
                : "bg-secondary text-primary"
                }`}
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Details</span>
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStep === "payment"
                ? "bg-primary text-white"
                : "bg-secondary text-muted-foreground"
                }`}
            >
              <CreditCard className="h-4 w-4" />
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            {currentStep === "details" && (
              <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Shipping Details</h2>
                </div>

                <div className="grid gap-6">
                  {/* Name Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={customer.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={customer.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customer.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="9876543210"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      value={customer.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="House/Flat No., Street, Locality"
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* City, State, Pincode */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={customer.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Mumbai"
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={customer.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="Maharashtra"
                        className={errors.state ? "border-red-500" : ""}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={customer.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder="400001"
                        className={errors.pincode ? "border-red-500" : ""}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handleProceedToPayment}
                    className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Payment</h2>
                </div>

                {/* Shipping Summary */}
                <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Shipping to:</p>
                  <p className="font-medium">
                    {customer.firstName} {customer.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer.address}, {customer.city}, {customer.state} - {customer.pincode}
                  </p>
                  <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  <button
                    onClick={() => setCurrentStep("details")}
                    className="text-primary text-sm hover:underline mt-2"
                  >
                    Edit Details
                  </button>
                </div>

                {/* Payment Method Selection */}
                <div className="bg-secondary/10 rounded-lg p-5 mb-6 border">
                  <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Select Payment Method</h3>
                  <div className="space-y-3">
                    {/* Online Payment Option */}
                    <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'bg-card hover:bg-secondary/20'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        className="mt-1 accent-primary"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-primary">Online Payment</span>
                          <div className="flex gap-1 opacity-70">
                            <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="UPI Cards" className="h-4" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Secure payment via UPI, Cards, NetBanking, or Wallets.
                        </p>
                      </div>
                    </label>

                    {/* Cash on Delivery Option */}
                    <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'bg-card hover:bg-secondary/20'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <span className="font-semibold text-primary block mb-1">Cash on Delivery (COD)</span>
                        <p className="text-sm text-muted-foreground">
                          Pay with cash when your order is delivered.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Secure Payment Notice (only for online) */}
                {paymentMethod === 'razorpay' && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100 flex items-start gap-3 mb-6">
                    <Lock className="h-5 w-5 text-green-700 mt-0.5" />
                    <div className="text-sm text-green-800">
                      <p className="font-semibold mb-1">Secure Payment via Razorpay</p>
                      <p>
                        Your payment information is encrypted and never stored on our servers.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("details")}
                    className="flex-1 py-6"
                    disabled={isProcessing}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex-[2] py-6 text-lg bg-primary hover:bg-primary/90"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      paymentMethod === 'cod' ? `Place Order with COD` : `Pay ₹${totalPrice.toLocaleString()}`
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-sm border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 pb-3 border-b">Order Summary</h2>

              <div className="flex flex-col gap-4 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-primary">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
