import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
    const faqs = [
        {
            question: "Lab-Grown Diamonds",
            answer: "Lab-grown diamonds are chemically, physically, and optically identical to mined diamonds. They are created in controlled laboratory environments using advanced technological processes that duplicate the conditions under which diamonds naturally develop."
        },
        {
            question: "Certification",
            answer: "All our solitaires are certified by IGI (International Gemological Institute) or GIA (Gemological Institute of America), ensuring the highest standards of quality and authenticity."
        },
        {
            question: "Delivery & Shipping",
            answer: "We offer free secured shipping on all orders across India. Standard delivery timeline is 5-7 business days for ready stock and 14-21 days for made-to-order pieces."
        },
        {
            question: "How do I order?",
            answer: "You can place an order directly through our website. Simply select your desired piece, choose the size/customization, and proceed to checkout. For assistance, you can call or WhatsApp our customer care."
        },
        {
            question: "Lifetime Exchange & Buyback",
            answer: "We offer a Lifetime Exchange & Buyback policy. You can exchange your diamond jewellery for 100% of the prevailing diamond value and 100% of gold value. Buyback is available at 90% of the prevailing value."
        },
        {
            question: "Customization",
            answer: "Yes, we specialize in bespoke jewellery. You can customize the metal tone (Rose, Yellow, White Gold) and diamond quality/size. Contact our designers for completely custom designs."
        },
        {
            question: "Care & Maintenance",
            answer: "Clean your diamond jewellery with warm soapy water and a soft brush. We recommend professional cleaning and inspection once a year, which we offer as a complimentary service."
        },
        {
            question: "Returns & Exchanges",
            answer: "We offer a 30-day no-questions-asked return policy. If you are not satisfied with your purchase, you can return it within 30 days for a full refund or exchange."
        },
        {
            question: "Packaging",
            answer: "Every piece comes in our signature premium packaging, perfect for gifting. It includes the jewellery box, authenticity certificate, and care guide."
        },
        {
            question: "International Shipping",
            answer: "Yes, we ship globally. International shipping charges and duties may apply depending on the destination country. Please reach out to us for specific rates."
        }
    ];

    return (
        <section className="bg-white py-12 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
                <h2 className="text-[#669F8B] text-xl font-serif mb-6 pl-4">FAQs</h2>

                <Accordion type="single" collapsible className="w-full space-y-2">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border rounded-md px-4 bg-gray-50/50 data-[state=open]:bg-white data-[state=open]:shadow-sm border-transparent hover:bg-gray-50 transition-colors">
                            <AccordionTrigger className="text-gray-700 hover:text-primary hover:no-underline font-sans text-sm py-4">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-500 font-sans text-sm pb-4 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
