import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Truck, CreditCard } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export default function Checkout() {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { items: cartItems, getSubtotal } = useCart();

  const subtotal = getSubtotal();
  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + shipping + tax;

  useEffect(() => {
    document.title = "Checkout | Amiora Diamonds";
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <nav className="text-sm text-muted-foreground mb-8">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Checkout</span>
        </nav>

        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required data-testid="input-first-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required data-testid="input-last-name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" required data-testid="input-email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" required data-testid="input-phone" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" required data-testid="input-address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                  <Input id="address2" data-testid="input-address2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" required data-testid="input-city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" required data-testid="input-state" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input id="pincode" required data-testid="input-pincode" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" defaultValue="India" required data-testid="input-country" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md">
                    <RadioGroupItem value="card" id="card" data-testid="radio-card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md">
                    <RadioGroupItem value="upi" id="upi" data-testid="radio-upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      UPI
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-md">
                    <RadioGroupItem value="cod" id="cod" data-testid="radio-cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" data-testid="input-card-number" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input id="expiry" placeholder="MM/YY" data-testid="input-expiry" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input id="cvv" placeholder="123" data-testid="input-cvv" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 p-4 bg-accent/20 rounded-md">
              <Shield className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Your cart is empty</p>
                    <Link href="/shop">
                      <Button variant="outline" data-testid="button-back-to-shop">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-64 overflow-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4" data-testid={`order-item-${item.id}`}>
                          <div className="w-16 h-16 rounded-md overflow-hidden bg-accent/20">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold text-primary">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium" data-testid="text-subtotal">
                          ₹{subtotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium" data-testid="text-shipping">
                          {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (GST 3%)</span>
                        <span className="font-medium" data-testid="text-tax">
                          ₹{tax.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="text-2xl font-bold text-primary" data-testid="text-total">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Button className="w-full" size="lg" data-testid="button-place-order">
                      Place Order
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By placing your order, you agree to our{" "}
                      <Link href="/terms" className="underline">
                        Terms & Conditions
                      </Link>
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
