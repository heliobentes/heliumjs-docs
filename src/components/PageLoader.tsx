import LoadingSpinner from "./LoadingSpinner";

interface PageLoaderProps {
    message?: string;
}

export default function PageLoader({ message = "Loading content..." }: PageLoaderProps) {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <LoadingSpinner size="lg" message={message} />
        </div>
    );
}
