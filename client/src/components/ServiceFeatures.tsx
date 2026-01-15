
import { RotateCcw, Diamond, RefreshCw, Award, Banknote } from "lucide-react";

const features = [
    {
        icon: RotateCcw,
        title: "30 Days",
        subtitle: "Easy Return"
    },
    {
        icon: Diamond,
        title: "IGI Certified",
        subtitle: "Diamonds"
    },
    {
        icon: RefreshCw,
        title: "Lifetime",
        subtitle: "Exchange"
    },
    {
        icon: Award,
        title: "Hallmarked",
        subtitle: "Gold"
    },
    {
        icon: Banknote,
        title: "90%",
        subtitle: "Buyback"
    }
];

export function ServiceFeatures() {
    return (
        <section className="py-8 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-x-0 md:divide-x divide-[#E6D1A3]/50">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center justify-center group">
                            <div className="mb-3 p-3 rounded-full bg-white border border-[#E6D1A3] text-[#5D4037] group-hover:bg-[#5D4037] group-hover:text-white transition-colors duration-300">
                                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-serif text-[#5D4037] font-medium text-sm md:text-base leading-tight">
                                {feature.title} <br />
                                <span className="text-[#8B7355]">{feature.subtitle}</span>
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
