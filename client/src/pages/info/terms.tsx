export default function TermsConditionsPage() {
  const sections = [
    {
      title: "Introduction",
      content:
        "By accessing or using our website, you agree to comply with and be bound by these Terms & Conditions. Please read them carefully before making any purchase or using any service offered by our platform."
    },
    {
      title: "Use of the Website",
      content:
        "You agree not to misuse the website in any way, including attempting unauthorized access, interfering with the site’s functionality, or engaging in any activity that disrupts the platform."
    },
    {
      title: "Product Information",
      content:
        "We strive to display accurate product details, including descriptions, images, and pricing. However, variations may occur due to screen differences, photography, or manual measurement."
    },
    {
      title: "Pricing & Payment",
      content:
        "All prices are listed in INR unless stated otherwise. We reserve the right to update prices without notice. Orders are processed only after successful payment through secure payment gateways."
    },
    {
      title: "Order Acceptance",
      content:
        "We may refuse or cancel an order for reasons including product unavailability, payment issues, or suspected fraudulent activity. In such cases, refunds will be processed if applicable."
    },
    {
      title: "Shipping & Delivery",
      content:
        "Delivery timelines are estimates and may vary due to factors beyond our control. Delays caused by couriers, weather, or public holidays are not our responsibility."
    },
    {
      title: "Returns & Exchanges",
      content:
        "Our return and exchange policies fall under a separate section. By placing an order, you acknowledge and accept those policies."
    },
    {
      title: "Intellectual Property",
      content:
        "All content on the website, including images, designs, logos, and text, is the property of our brand. Unauthorized use or reproduction is strictly prohibited."
    },
    {
      title: "Limitation of Liability",
      content:
        "We are not liable for indirect or consequential damages arising from the use of our website or products. Your use of the platform is at your own risk."
    },
    {
      title: "Changes to Terms",
      content:
        "We may update these Terms & Conditions at any time. Continued use of the website after changes indicates acceptance of the updated terms."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-3xl">

        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-700">
            Please review the terms governing your use of our website and services.
          </p>
        </div>

        {/* Terms Sections */}
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
