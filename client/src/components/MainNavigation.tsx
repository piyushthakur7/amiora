
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
                        <div className={`absolute top-full pt-4 hidden group-hover:block hover:block z-50 ${index >= navTree.length - 3 ? "right-0" : "left-0"}`}>
                            <div className={`bg-[#003C32]/95 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-[#C8A46A]/20 rounded-xl p-6 animate-in fade-in slide-in-from-top-2 duration-300 ${category.children.length > 6 ? "w-[600px]" : "w-[300px]"}`}>
                                {/* HEADER / VIEW ALL */}
                                <Link href={`/${category.slug}`}>
                                    <span className="font-serif text-2xl text-white hover:text-[#C8A46A] border-b border-white/10 pb-3 mb-4 cursor-pointer transition-colors flex items-center justify-between group/link">
                                        View all {category.name}
                                        <span className="opacity-0 group-hover/link:opacity-100 transition-opacity text-xl">→</span>
                                    </span>
                                </Link>

                                {/* LIST */}
                                <div className={`grid ${category.children.length > 6 ? "grid-cols-2 gap-x-8" : "grid-cols-1"} gap-y-2`}>
                                    {category.children.length > 0 ? (
                                        category.children.map((sub) => (
                                            <Link key={sub.id} href={`/${category.slug}/${sub.slug}`}>
                                                <span className="cursor-pointer text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 block text-lg font-light tracking-wide py-1 hover:bg-white/5 px-2 rounded -ml-2">
                                                    {sub.name}
                                                </span>
                                            </Link>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 italic text-sm">No details available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}

                {isLoading && (
                    <li className="text-white/70 text-sm italic">
                        Loading Categories...
                    </li>
                )}
                {navTree.length === 0 && !isLoading && (
                    <li className="text-red-400/70 text-sm italic">
                        Failed to load categories. Check API credentials.
                    </li>
                )}
            </ul>
        </nav>
    );
}
