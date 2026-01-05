
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-[#F9F7F5] text-center">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full flex flex-col items-center border border-[#E6D1A3]">
                <CheckCircle className="h-20 w-20 text-[#2D5A27] mb-6" />
                <h1 className="text-3xl font-serif text-[#0E2220] mb-4">
                    Order Placed Successfully!
                </h1>
                <p className="text-gray-600 mb-8 font-light">
                    Thank you for shopping with Amiora Diamonds. Your order has been received and is being processed safely by our team.
                </p>
                <Link href="/">
                    <Button className="w-full bg-[#0E2220] hover:bg-[#1A3D3A] text-white py-6 rounded-none uppercase tracking-widest text-sm font-medium transition-colors">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </div>
    );
}
