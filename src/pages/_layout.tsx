import { IconBrandGithubFilled } from "@tabler/icons-react";
import type { LayoutProps } from "helium/client";
import { Link, useRouter } from "helium/client";

import HeliumLogo from "../components/Logo";
import { cn } from "../utils";

export default function RootLayout({ children }: LayoutProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <header className="border-b border-gray-300 bg-white sticky top-0 z-10 ">
                <div className="container mx-auto px-4 flex items-stretch lg:gap-8 flex-col lg:flex-row h-full ">
                    <div className="py-2 flex items-center text-2xl font-medium gap-4">
                        <HeliumLogo />
                        HeliumJS
                    </div>
                    <nav className="lg:ml-auto flex items-center h-16">
                        <Link
                            href="/"
                            className={cn(
                                "px-4 hover:bg-gray-50 h-full flex items-center transition-all border-b-3 hover:border-teal-600",
                                router.path === "/" ? "text-teal-600 font-semibold border-teal-600" : "text-gray-700 hover:text-teal-600 border-transparent"
                            )}
                        >
                            Home
                        </Link>
                        <Link
                            href="/docs"
                            className={cn(
                                "px-4 hover:bg-gray-50 h-full flex items-center transition-all border-b-3 hover:border-teal-600",
                                router.path.startsWith("/docs") ? "text-teal-600 font-semibold border-teal-600" : "text-gray-700 hover:text-teal-600 border-transparent"
                            )}
                        >
                            Docs
                        </Link>
                        <Link
                            href="https://github.com/heliobentes/heliumjs"
                            className={cn(
                                "px-4 hover:bg-gray-50 h-full flex items-center transition-all border-b-3 hover:border-teal-600 text-gray-700 hover:text-teal-600 border-transparent"
                            )}
                        >
                            <IconBrandGithubFilled className="inline-block size-6 mr-1 -mt-1" />
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto p-4">{children}</main>
        </div>
    );
}
