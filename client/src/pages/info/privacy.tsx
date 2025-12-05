export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content:
        "We collect personal information such as your name, email, phone number, billing details, and delivery address when you place an order or create an account. We also collect non-personal data like device information, browser type, and site usage analytics."
    },
    {
      title: "How Your Information Is Used",
      content:
        "Your information is used to process orders, arrange delivery, communicate updates, handle customer support, and improve our website experience. We do not sell your information to third parties."
    },
    {
      title: "Payment & Security",
      content:
        "All payments are processed through secure and encrypted gateways. We do not store your card details on our servers."
    },
    {
      title: "Cookies",
      content:
        "Cookies help us improve your browsing experience by remembering your preferences, cart items, and site interactions. You may disable cookies through your browser settings."
    },
    {
      title: "Sharing of Information",
      content:
        "We may share your information with trusted logistics partners, payment processors, and service providers strictly for completing your order and improving service quality."
    },
    {
      title: "Your Rights",
      content:
        "You can request account deletion, data correction, or a copy of your stored information at any time by contacting our support team."
    },
    {
      title: "Policy Updates",
      content:
        "We may update this policy from time to time. Changes will be reflected on this page with an updated revision date."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-3xl">

        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-700">
            How we safeguard your information and respect your privacy.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10">
          {sections.map((item, i) => (
            <div
              key={i}
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
