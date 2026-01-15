
import { useState } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavCategory } from "./MainNavigation";

interface MobileNavigationProps {
    navTree: NavCategory[];
}

export function MobileNavigation({ navTree }: MobileNavigationProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 rounded-xl bg-white/10 border border-white/20 shadow-sm hover:bg-white/20 transition text-white"
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-80 bg-white text-[#0E2220] overflow-y-auto z-[60]">
                <div className="flex flex-col gap-6 mt-10">
                    {/* MOBILE LOGO */}
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <span className="text-3xl font-serif bg-gradient-to-r from-[#C8A46A] to-[#E6D1A3] text-transparent bg-clip-text cursor-pointer">
                            Amiora Diamonds
                        </span>
                    </Link>

                    {/* MOBILE CATEGORY LIST */}
                    <div className="flex flex-col gap-5 mt-6">
                        {navTree.map((cat) => (
                            <div key={cat.id} className="flex flex-col gap-2">
                                <Link href={`/${cat.slug}`} onClick={() => setIsOpen(false)}>
                                    <span className="text-xl font-medium hover:text-[#C8A46A] transition cursor-pointer">
                                        {cat.name}
                                    </span>
                                </Link>
                                {/* Mobile Subcategories */}
                                {cat.children.length > 0 && (
                                    <div className="pl-4 flex flex-col gap-1 border-l-2 border-[#f0e6d2]">
                                        {cat.children.map((sub) => (
                                            <Link
                                                key={sub.id}
                                                href={`/${cat.slug}/${sub.slug}`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <span className="text-sm text-gray-600 hover:text-[#C8A46A] py-1 block cursor-pointer">
                                                    {sub.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
