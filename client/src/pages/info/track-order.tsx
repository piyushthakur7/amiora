export default function TrackOrderPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 py-16 flex items-center">
      <div className="container mx-auto px-6 max-w-xl">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Track Your Order</h1>
          <p className="text-xl text-gray-700">
            Enter your order number to check the latest status.
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
          <form className="space-y-6">
            <div>
              <label className="text-lg font-medium text-gray-700">
                Order Number
              </label>
              <input
                type="text"
                placeholder="Enter your order ID"
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Track Order
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
