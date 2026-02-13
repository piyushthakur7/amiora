import { useState, useEffect } from "react";
import { getOrder, cancelOrder, getCustomerOrders } from "@/lib/woocommerce";
import type { Order } from "@/types/Order";
import { Loader2, Package, XCircle, CheckCircle2, AlertCircle, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import { useSearch } from "wouter";

export default function TrackOrderPage() {
  const { user } = useAuth();
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const initialOrderId = params.get("id") || "";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [loadingUserOrders, setLoadingUserOrders] = useState(false);

  // Auto-fetch user orders if logged in
  useEffect(() => {
    if (user?.email) {
      setLoadingUserOrders(true);
      getCustomerOrders(user.email)
        .then(data => setUserOrders(data))
        .catch(err => console.error("Failed to load user orders:", err))
        .finally(() => setLoadingUserOrders(false));
    }
  }, [user?.email]);

  // Auto-track if ID is in URL
  useEffect(() => {
    if (initialOrderId) {
      handleTrack();
    }
  }, [initialOrderId]);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-serif">Track Your Order</h1>
          <p className="text-xl text-gray-600">
            Enter your order number to check status or manage your order.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left Column: Recent Orders (if logged in) */}
          {user && (
            <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Recent Orders
              </h3>

              {loadingUserOrders ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : userOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent orders found.</p>
              ) : (
                <div className="space-y-3">
                  {userOrders.slice(0, 5).map(uOrder => (
                    <div
                      key={uOrder.id}
                      onClick={() => {
                        setOrderId(String(uOrder.id));
                        // Slight delay to allow state update before tracking
                        setTimeout(() => document.getElementById("track-btn")?.click(), 0);
                      }}
                      className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${String(uOrder.id) === orderId ? "border-primary bg-primary/5" : "border-gray-100"}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">#{uOrder.id}</span>
                        <Badge variant="outline" className="text-xs capitalize">{uOrder.status}</Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{new Date(uOrder.date_created).toLocaleDateString()}</span>
                        <span className="font-semibold text-gray-700">₹{uOrder.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Right/Center Column: Tracking Form & Result */}
          <div className={`md:col-span-${user ? '2' : '3'} max-w-2xl mx-auto w-full`}>
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
                      id="track-btn"
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

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium capitalize">{order.payment_method_title}</span>
                  </div>
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

      </div>
    </div>
  );
}
