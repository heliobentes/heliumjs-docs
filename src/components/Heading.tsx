import { IconLink } from "@tabler/icons-react";
import React, { type ReactNode } from "react";

import { cn } from "../utils";

interface HeadingProps {
    level: 1 | 2 | 3 | 4;
    children: ReactNode;
    className?: string;
    id?: string;
}

const styles = {
    1: "text-3xl font-bold text-gray-900",
    2: "text-2xl font-semibold text-gray-900",
    3: "text-xl font-semibold text-gray-900",
    4: "text-lg font-semibold text-gray-900",
};

const getTextFromChildren = (children: ReactNode): string => {
    if (typeof children === "string") return children;
    if (typeof children === "number") return children.toString();
    if (Array.isArray(children)) return children.map(getTextFromChildren).join("");
    if (typeof children === "object" && children !== null && "props" in children) {
        return getTextFromChildren((children as any).props.children);
    }
    return "";
};

export default function Heading({ level, children, className, id }: HeadingProps) {
    const text = getTextFromChildren(children);
    const headingId =
        id ||
        text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return (
        <Tag id={headingId} className={cn("group flex items-center gap-2 scroll-mt-32 relative", styles[level], className)}>
            <span className="relative">
                {children}
                <a
                    href={`#${headingId}`}
                    className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-teal-600 transition-opacity p-1"
                    aria-label="Link to this section"
                >
                    <IconLink size={16} />
                </a>
            </span>
        </Tag>
    );
}
