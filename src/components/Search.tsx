import { IconSearch, IconX } from "@tabler/icons-react";
import { useRouter } from "heliumts/client";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { menuItems } from "../config/docs";
import { cn } from "../utils";

interface SearchResult {
    title: string;
    href: string;
    section: string;
    snippet?: string;
}

// Import all doc pages as raw strings
const docModules = import.meta.glob("../pages/docs/**/*.tsx", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

// Helper to generate ID (matches Heading.tsx)
const generateId = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
};

// Helper to strip HTML/JSX tags
const stripTags = (str: string) => {
    return str
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};

export function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Build search index
    const searchIndex = useMemo(() => {
        const index: SearchResult[] = [];

        const parseAndIndex = (href: string, pageTitle: string, sectionContext: string) => {
            const relativePath = href.replace("/docs", "");
            let content = "";

            // Find content
            for (const [path, rawContent] of Object.entries(docModules)) {
                if (path.endsWith(`/docs${relativePath}/index.tsx`) || path.endsWith(`/docs${relativePath}.tsx`)) {
                    content = rawContent;
                    break;
                }
            }

            if (!content) return;

            const cleanContent = content.replace(/import .*?;/g, "").replace(/export .*?;/g, "");

            // Find all headings
            const headingRegex = /<Heading([^>]*)>(.*?)<\/Heading>/gs;
            const matches = [...cleanContent.matchAll(headingRegex)];

            if (matches.length === 0) {
                // Fallback to indexing the whole page if no headings found
                index.push({
                    title: pageTitle,
                    href: href,
                    section: sectionContext,
                    snippet: stripTags(cleanContent),
                });
                return;
            }

            matches.forEach((match, i) => {
                const [fullMatch, propsStr, childrenStr] = match;
                const nextMatch = matches[i + 1];

                // Extract level
                const levelMatch = propsStr.match(/level={(\d)}/);
                const level = levelMatch ? parseInt(levelMatch[1]) : 1;

                // Extract ID
                const idMatch = propsStr.match(/id="([^"]*)"/);
                let id = idMatch ? idMatch[1] : undefined;

                const title = stripTags(childrenStr);

                if (!id) {
                    id = generateId(title);
                }

                // Get content block
                const start = match.index! + fullMatch.length;
                const end = nextMatch ? nextMatch.index! : cleanContent.length;
                const snippet = stripTags(cleanContent.slice(start, end));

                // If level is 1, it's the main page title.
                // We can link to the top (href) or the anchor.
                // Linking to anchor is safer for deep linking consistency.
                const itemHref = level === 1 ? href : `${href}#${id}`;

                index.push({
                    title: title,
                    href: itemHref,
                    section: sectionContext,
                    snippet: snippet,
                });
            });
        };

        menuItems.forEach((section) => {
            if (section.items) {
                section.items.forEach((item) => {
                    parseAndIndex(item.href, typeof item.title === "string" ? item.title : "Example App", section.title);
                    if (item.subItems) {
                        item.subItems.forEach((subItem) => {
                            parseAndIndex(
                                subItem.href,
                                typeof subItem.title === "string" ? subItem.title : "Unknown",
                                `${section.title} > ${typeof item.title === "string" ? item.title : "Example App"}`
                            );
                        });
                    }
                });
            } else if (section.href) {
                parseAndIndex(section.href, section.title, "Main");
            }
        });
        return index;
    }, []);

    const results = useMemo(() => {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();

        // Escape special regex characters
        const escapedQuery = lowerQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const startOfWordRegex = new RegExp(`\\b${escapedQuery}`, "i");
        const exactWordRegex = new RegExp(`\\b${escapedQuery}\\b`, "i");

        const scoredResults = searchIndex
            .map((item) => {
                const titleMatch = item.title.toLowerCase().includes(lowerQuery);
                const sectionMatch = item.section.toLowerCase().includes(lowerQuery);
                const contentMatchIndex = item.snippet?.toLowerCase().indexOf(lowerQuery) ?? -1;

                if (titleMatch || sectionMatch || contentMatchIndex > -1) {
                    // Create a snippet preview if content matched
                    let preview = "";
                    if (contentMatchIndex > -1 && item.snippet) {
                        const start = Math.max(0, contentMatchIndex - 40);
                        const end = Math.min(item.snippet.length, contentMatchIndex + 60);
                        preview = "..." + item.snippet.slice(start, end) + "...";
                    }

                    let score = 0;

                    // Title scoring
                    if (item.title.toLowerCase() === lowerQuery) score += 100;
                    else if (item.title.toLowerCase().startsWith(lowerQuery)) score += 50;
                    else if (titleMatch) score += 20;

                    // Section scoring
                    if (sectionMatch) score += 10;

                    // Content scoring
                    if (contentMatchIndex > -1 && item.snippet) {
                        score += 5; // Base content match score

                        // Check for start of word match
                        if (startOfWordRegex.test(item.snippet)) score += 10;

                        // Check for exact word match
                        if (exactWordRegex.test(item.snippet)) score += 15;

                        // Frequency bonus (capped)
                        const occurrences = (item.snippet.toLowerCase().match(new RegExp(escapedQuery, "g")) || []).length;
                        score += Math.min(occurrences * 2, 20);
                    }

                    return {
                        ...item,
                        score,
                        preview,
                    };
                }
                return null;
            })
            .filter((item): item is SearchResult & { score: number; preview: string } => item !== null)
            .sort((a, b) => b.score - a.score);

        // Deduplicate by href, keeping the highest score
        const seenHrefs = new Set<string>();
        const uniqueResults: (SearchResult & { score: number; preview: string })[] = [];

        for (const result of scoredResults) {
            if (!seenHrefs.has(result.href)) {
                seenHrefs.add(result.href);
                uniqueResults.push(result);
            }
        }

        return uniqueResults;
    }, [query, searchIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
            setSelectedIndex(0);
        }
    }, [isOpen]);

    const handleSelect = (href: string) => {
        setIsOpen(false);
        router.push(href);

        // If it's a hash link, try to scroll to it
        if (href.includes("#")) {
            const id = href.split("#")[1];
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % results.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === "Enter" && results.length > 0) {
            handleSelect(results[selectedIndex].href);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 hover:text-gray-700 transition-colors w-full"
            >
                <IconSearch size={16} />
                <span>Search docs...</span>
                <kbd className="ml-auto hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
        );
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32 px-4">
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <div className="flex items-center border-b border-gray-100 px-4 py-2.5">
                    <IconSearch className="w-5 h-5 text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search documentation..."
                        className="flex-1 border-0 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                    />
                    <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 hover:text-gray-500 rounded-md">
                        <IconX size={18} />
                    </button>
                </div>

                {query && (
                    <div className="max-h-[60vh] overflow-y-auto py-2">
                        {results.length === 0 ? (
                            <div className="px-4 py-8 text-center text-sm text-gray-500">No results found for "{query}"</div>
                        ) : (
                            <ul className="text-sm text-gray-700">
                                {results.map((result, index) => (
                                    <li key={result.href}>
                                        <button
                                            onClick={() => handleSelect(result.href)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={cn(
                                                "flex w-full flex-col gap-0.5 px-4 py-3 text-left",
                                                index === selectedIndex ? "bg-teal-50 text-teal-900" : "hover:bg-gray-50"
                                            )}
                                        >
                                            <span className="font-medium">{result.title}</span>
                                            <span className={cn("text-xs", index === selectedIndex ? "text-teal-700" : "text-gray-500")}>{result.section}</span>
                                            {result.preview && (
                                                <span className={cn("text-xs mt-1 line-clamp-1", index === selectedIndex ? "text-teal-600" : "text-gray-400")}>
                                                    {result.preview}
                                                </span>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                {!query && <div className="px-4 py-8 text-center text-sm text-gray-500">Type to search documentation...</div>}
            </div>
        </div>,
        document.body
    );
}
