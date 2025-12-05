export default function FAQsPage() {
  const faqs = [
    {
      q: "What materials do you use in your jewelry?",
      a: "We use certified gold, sterling silver, stainless steel, and hypoallergenic alloys. Each product page lists the exact material details."
    },
    {
      q: "Are your pieces safe for kids?",
      a: "Yes. Our kids' jewelry is made with skin-safe materials and smooth, rounded edges to prevent irritation or scratches."
    },
    {
      q: "Do your products tarnish?",
      a: "Gold and stainless steel pieces do not tarnish. Sterling silver may oxidize over time but can be polished back to shine easily."
    },
    {
      q: "Can I return or exchange my order?",
      a: "Yes. We offer easy returns and exchanges within 7 days of delivery, as long as the item is unworn and in original packaging."
    },
    {
      q: "How do I find my ring size?",
      a: "You can use our ring-size chart or measure an existing ring. We also provide printable guides for accurate sizing."
    },
    {
      q: "Do you offer cash on delivery?",
      a: "Yes, COD is available in most regions. Availability may vary based on pin code."
    },
    {
      q: "How long does delivery take?",
      a: "Orders are typically shipped within 24 hours and delivered within 3–7 business days depending on your location."
    },
    {
      q: "How should I care for my jewelry?",
      a: "Keep jewelry away from perfumes and water when possible. Store pieces in a dry box to maintain shine and prevent scratches."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">Help & FAQs</h1>
          <p className="text-xl text-gray-700">
            Everything you need to know about our jewelry, orders, and policies.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-8">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-3">{item.q}</h2>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
