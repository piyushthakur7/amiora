export default function DeliveryInformationPage() {
  const sections = [
    {
      title: "Shipping Time",
      content:
        "Orders are dispatched within 24–48 hours. Delivery typically takes 3–7 business days depending on your pin code and courier availability."
    },
    {
      title: "Express Delivery",
      content:
        "Express shipping is available in select cities for an additional charge. Orders placed before 1 PM are eligible for same-day dispatch."
    },
    {
      title: "International Shipping",
      content:
        "International delivery options are available. Shipping charges and timelines vary based on destination country and customs rules."
    },
    {
      title: "Order Tracking",
      content:
        "Once your order ships, you will receive a tracking link via SMS and email. Tracking updates may take a few hours to reflect."
    },
    {
      title: "Packing & Safety",
      content:
        "Every jewelry piece is packed in a protective box to avoid damage during transit. Fragile items receive additional cushioning."
    },
    {
      title: "Failed Delivery Attempts",
      content:
        "If the courier is unable to reach you, they may attempt delivery up to 3 times. After repeated failures, the package may be returned to us."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-3xl">

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">Delivery Information</h1>
          <p className="text-xl text-gray-700">
            All details related to shipping, timelines, and order handling.
          </p>
        </div>

        {/* Information Sections */}
        <div className="space-y-8">
          {sections.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
