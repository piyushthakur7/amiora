import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Package, Mail } from "lucide-react";

export default function ThankYou() {
    const searchStr = useSearch();
    const params = new URLSearchParams(searchStr);
    const orderId = params.get("order");
    const paymentId = params.get("payment_id");

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-secondary/30">
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full border">

                {/* Status Icon - Clock indicates pending verification */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                            <Clock className="h-10 w-10 text-amber-600" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border-2 border-white">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Main Message - Does NOT assume payment success */}
                <h1 className="text-2xl md:text-3xl font-serif text-primary text-center mb-3">
                    Order Received
                </h1>

                <p className="text-center text-muted-foreground mb-6">
                    Your payment is being verified. This usually takes a few seconds.
                </p>

                {/* Order Details */}
                {orderId && (
                    <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Order Number</span>
                            <span className="font-mono font-semibold">#{orderId}</span>
                        </div>
                        {paymentId && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Payment Reference</span>
                                <span className="font-mono text-xs">{paymentId.slice(0, 20)}...</span>
                            </div>
                        )}
                    </div>
                )}

                {/* What Happens Next */}
                <div className="space-y-4 mb-8">
                    <h3 className="font-medium text-sm text-center text-primary">What happens next?</h3>

                    <div className="flex items-start gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-primary">1</span>
                        </div>
                        <div>
                            <p className="font-medium">Payment Verification</p>
                            <p className="text-muted-foreground text-xs">
                                We're confirming your payment with our payment partner. This is automatic.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Mail className="h-3 w-3 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium">Confirmation Email</p>
                            <p className="text-muted-foreground text-xs">
                                You'll receive an email once your order is confirmed.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Package className="h-3 w-3 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium">Order Processing</p>
                            <p className="text-muted-foreground text-xs">
                                Our team will carefully prepare your jewelry for shipping.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Note about pending */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                    <p className="text-xs text-amber-800 text-center">
                        <strong>Note:</strong> If your payment was successful, confirmation typically arrives within 2-3 minutes.
                        Check your email (including spam folder).
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <Link href="/">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white py-5">
                            Continue Shopping
                        </Button>
                    </Link>
                    <Link href="/info/track-order">
                        <Button variant="outline" className="w-full py-5">
                            Track Your Order
                        </Button>
                    </Link>
                </div>

                {/* Contact Support */}
                <p className="text-xs text-center text-muted-foreground mt-6">
                    Questions? Contact us at{" "}
                    <a href="mailto:support@amiora.com" className="text-primary hover:underline">
                        support@amiora.com
                    </a>
                </p>
            </div>
        </div>
    );
}
