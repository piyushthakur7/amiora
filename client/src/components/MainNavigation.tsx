
import { Link } from "wouter";
import { WcCategory } from "@/lib/woocommerce";

export interface NavCategory extends WcCategory {
    children: WcCategory[];
}

interface MainNavigationProps {
    navTree: NavCategory[];
    isLoading: boolean;
}

export function MainNavigation({ navTree, isLoading }: MainNavigationProps) {
    return (
        <nav className="hidden lg:flex justify-center items-center px-6 min-h-[48px] z-50 relative bg-transparent pt-6">
            <ul className="flex flex-row gap-6 justify-center items-center m-0 p-0 list-none">
                {navTree.map((category, index) => (
                    <li key={category.id} className="group relative h-12 flex items-center">
                        {/* TRIGGER */}
                        <Link href={`/${category.slug}`}>
                            <span className="font-medium text-white hover:text-[#C8A46A] cursor-pointer px-2 py-1 transition-colors relative z-10 flex items-center gap-2 tracking-wide whitespace-nowrap">
                                {category.name}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-50 group-hover:rotate-180 transition-transform duration-200"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </span>
                        </Link>

                        {/* DROPDOWN MENU */}
                        <div className={`absolute top-[90%] pt-4 hidden group-hover:block hover:block z-50 ${index >= navTree.length - 3 ? "right-0" : "left-0"
                            }`}>
                            <div className="bg-[#003C32] shadow-2xl rounded-xl border border-[#C8A46A]/20 overflow-hidden min-w-[320px] max-w-[400px] animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex flex-col p-6 gap-5">

                                    {/* VIEW ALL LINK */}
                                    <div className="w-full">
                                        <Link href={`/${category.slug}`}>
                                            <span className="font-serif text-2xl text-white hover:text-[#C8A46A] border-b border-white/10 pb-3 cursor-pointer transition-colors block">
                                                View all {category.name}
                                            </span>
                                        </Link>
                                    </div>

                                    {/* SUBCATEGORY LIST */}
                                    <div className="flex flex-col gap-1 w-full pl-1">
                                        {category.children.length > 0 ? (
                                            <div className="flex flex-col gap-3">
                                                {category.children.map((sub) => (
                                                    <Link key={sub.id} href={`/${category.slug}/${sub.slug}`}>
                                                        <span className="cursor-pointer text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 block text-lg font-light tracking-wide hover:[text-shadow:0_0_10px_rgba(255,255,255,0.6)]">
                                                            {sub.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-400 italic">
                                                Explore our {category.name} collection
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}

                {navTree.length === 0 && !isLoading && (
                    <li className="text-white/70 text-sm italic">
                        Loading Categories...
                    </li>
                )}
            </ul>
        </nav>
    );
}
