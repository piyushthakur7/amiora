import { useState } from "react";
import { getOrder, cancelOrder } from "@/lib/woocommerce";
import type { Order } from "@/types/Order";
import { Loader2, Package, XCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError("");
    setOrder(null);
    setCancelSuccess(false);

    try {
      const data = await getOrder(Number(orderId));
      setOrder(data);
    } catch (err) {
      setError("Order not found or could not be retrieved. Please check the ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!order) return;

    setCancelling(true);
    try {
      await cancelOrder(order.id);
      setOrder({ ...order, status: "cancelled" });
      setCancelSuccess(true);
    } catch (err) {
      setError("Failed to cancel order. Please try again or contact support.");
    } finally {
      setCancelling(false);
    }
  };

  const canCancel = order && ["pending", "processing", "on-hold"].includes(order.status);

  return (
    <div className="min-h-screen w-full bg-gray-50 py-16 flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-2xl">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Track Your Order</h1>
          <p className="text-xl text-gray-600">
            Enter your order number to check status or manage your order.
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                Order Number
              </label>
              <div className="flex gap-4 mt-2">
                <input
                  type="number"
                  placeholder="e.g. 12345"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Track"}
                </Button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        {/* Order Details */}
        {order && (
          <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order #{order.id}</h2>
                <p className="text-gray-500 mt-1">Placed on {new Date(order.date_created).toLocaleDateString()}</p>
              </div>
              <Badge className={`uppercase px-3 py-1 text-sm font-bold tracking-wide ${order.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                  'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                }`}>
                {order.status}
              </Badge>
            </div>

            <div className="space-y-4 mb-8">
              {order.line_items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <span className="text-sm text-gray-500">x{item.quantity}</span>
                  </div>
                  <span className="font-semibold">{item.total} {order.currency}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <div className="text-gray-600">Total Amount</div>
              <div className="text-2xl font-bold">{order.total} {order.currency}</div>
            </div>

            {/* Cancel Action */}
            {canCancel && (
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="gap-2">
                      <XCircle className="w-4 h-4" />
                      Cancel Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Order #{order.id}?</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel this order? This action cannot be undone.
                        <br />
                        <span className="text-xs text-gray-500 mt-2 block">
                          If you have already paid, a refund will be processed within 5-7 business days.
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => { }}>Dismiss</Button>
                      <Button
                        variant="destructive"
                        onClick={handleCancel}
                        disabled={cancelling}
                      >
                        {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Cancellation"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {cancelSuccess && (
              <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Order has been successfully cancelled.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
