import { IconLoader } from "@tabler/icons-react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    message?: string;
    className?: string;
}

export default function LoadingSpinner({ size = "md", message, className = "" }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "size-4",
        md: "size-8",
        lg: "size-12",
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`}>
            <IconLoader className={`${sizeClasses[size]} animate-spin text-teal-600`} />
            {message && <p className="text-gray-500 text-sm">{message}</p>}
        </div>
    );
}
