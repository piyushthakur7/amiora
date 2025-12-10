import { cn } from "@/lib/utils";

export function SectionDivider({ className, variant = "simple" }: { className?: string, variant?: "simple" | "ornate" }) {
    if (variant === "ornate") {
        return (
            <div className={cn("flex items-center justify-center py-8 opacity-60", className)}>
                <svg width="300" height="24" viewBox="0 0 300 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                    <path d="M150 0C150 0 140 12 110 12H0V13H110C140 13 150 24 150 24C150 24 160 13 190 13H300V12H190C160 12 150 0 150 0Z" fill="currentColor" />
                    <circle cx="150" cy="12" r="3" fill="currentColor" />
                </svg>
            </div>
        );
    }

    return (
        <div className={cn("flex items-center justify-center gap-4 py-8 opacity-40", className)}>
            <div className="h-[1px] w-24 bg-gold" />
            <div className="h-2 w-2 rotate-45 border border-gold" />
            <div className="h-[1px] w-24 bg-gold" />
        </div>
    );
}
