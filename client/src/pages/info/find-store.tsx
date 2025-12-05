export default function FindStorePage() {
  const store = {
    name: "Kolkata Flagship Store",
    address: "Park Street, Kolkata, West Bengal, India",
    hours: "10:00 AM to 9:00 PM (All Days)",
    phone: "+91 90000 12345",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.126915426517!2d88.35198437503201!3d22.556375278731327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277a5a30e8fcd%3A0x8ce6f54f9b89e0ee!2sPark%20Street%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1700000000000"
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">Find a Store</h1>
          <p className="text-xl text-gray-700">
            Visit our flagship location for an in-person jewelry experience.
          </p>
        </div>

        {/* Store Card */}
        <div className="bg-white shadow rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-4">{store.name}</h2>

          <p className="text-gray-700 mb-2">
            <strong>Address:</strong> {store.address}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Store Hours:</strong> {store.hours}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Phone:</strong> {store.phone}
          </p>

          {/* Map Embed */}
          <div className="w-full h-72 rounded-xl overflow-hidden border">
            <iframe
  src={store.map}
  className="w-full h-full border-0"
  allowFullScreen
  loading="lazy"
/>

          </div>
        </div>

      </div>
    </div>
  );
}
