"use ssg";
import CodeBlock from "../../../components/CodeBlock";
import Heading from "../../../components/Heading";

export default function ProjectStructure() {
    return (
        <div className="space-y-6">
            <Heading level={1}>Project Structure</Heading>
            <p>A typical HeliumTS project looks like this:</p>
            <CodeBlock
                code={`src/
  pages/             # Client-side pages (Next.js pages router style)
    index.tsx
    [id].tsx         # Dynamic routes
    [...slug].tsx    # Catch-all routes
    _layout.tsx      # Root layout
    (protected)/     # Route group (e.g., for auth)
      dashboard.tsx
  server/            # Server-side logic
    tasks.ts         # RPC methods for tasks
    auth.ts          # Auth-related methods
    webhooks.ts      # Webhook HTTP handlers
    _middleware.ts   # Server middleware
  components/        # React components
  types/             # Shared types
helium.config.ts     # Helium configuration
package.json         # NPM package file
vite.config.ts       # Vite configuration`}
                language="plaintext"
            />
        </div>
    );
}
