export default function ReturnsExchangePage() {
  const sections = [
    {
      title: "Return Eligibility",
      content:
        "Items can be returned within 7 days of delivery, provided they are unused, unworn, and in their original packaging. Products that show signs of wear or damage are not eligible for return."
    },
    {
      title: "Exchange Policy",
      content:
        "Exchanges are allowed for size issues, manufacturing defects, or receiving the wrong item. Exchanges must be requested within 7 days of delivery."
    },
    {
      title: "Non-Returnable Items",
      content:
        "Customized jewelry, engraved pieces, gift cards, and items purchased during clearance sales are not eligible for returns or exchanges."
    },
    {
      title: "Return Process",
      content:
        "To initiate a return, contact our customer support with your order number and reason for the return. Our team will guide you through the pickup or drop-off process."
    },
    {
      title: "Refunds",
      content:
        "Refunds are processed within 5–7 business days after the returned item passes quality checks. Refunds will be issued to the original mode of payment."
    },
    {
      title: "Damaged or Defective Products",
      content:
        "If you receive a damaged or defective product, report it within 48 hours of delivery with clear photos or videos. We will arrange a replacement or issue a full refund."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-3xl">

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">Returns & Exchange</h1>
          <p className="text-xl text-gray-700">
            Hassle-free returns and exchanges for a smooth shopping experience.
          </p>
        </div>

        {/* Info Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
