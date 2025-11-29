"use ssg";
import { useState } from "react";

import CodeBlock from "../../../components/CodeBlock";
import { cn } from "../../../utils";

export default function Installation() {
    const [mode, setMode] = useState<"default" | "manual">("default");

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Installation</h1>

            <div className="flex gap-3 my-4 text-sm">
                <div
                    className={cn(
                        "text-medium rounded-full px-3 py-1 cursor-pointer transition-all",
                        mode === "default" ? "bg-teal-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                    )}
                    onClick={() => setMode("default")}
                >
                    Default
                </div>
                <div
                    className={cn(
                        "text-medium rounded-full px-3 py-1 cursor-pointer transition-all",
                        mode === "manual" ? "bg-teal-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                    )}
                    onClick={() => setMode("manual")}
                >
                    Manual
                </div>
            </div>

            {mode === "default" ? (
                <>
                    <p>The easiest way to get started with HeliumTS is by using the create-heliumts-app tool. This CLI tool will set up everything automatically for you.</p>

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">Usage</h3>
                    <CodeBlock code="npm create heliumts-app@latest my-app" language="bash" />

                    <p className="mt-4">Or to scaffold in the current directory:</p>
                    <CodeBlock code="npm create heliumts-app@latest ." language="bash" />

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">Options</h3>
                    <p>You can use flags to skip prompts:</p>
                    <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-2 font-medium text-gray-900">Flag</th>
                                    <th className="px-4 py-2 font-medium text-gray-900">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                <tr>
                                    <td className="px-4 py-2 font-mono text-teal-600">--tailwind</td>
                                    <td className="px-4 py-2">Use Tailwind CSS template (skips prompt)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-mono text-teal-600">--no-tailwind</td>
                                    <td className="px-4 py-2">Use basic template without Tailwind (skips prompt)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <CodeBlock
                        code={`# Use Tailwind CSS (default, skips prompt)
npm create heliumts-app@latest my-app -- --tailwind

# Use basic template without Tailwind (skips prompt)
npm create heliumts-app@latest my-app -- --no-tailwind`}
                        language="bash"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">What it does</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2 text-gray-700">
                        <li>
                            Asks if you want to use <strong>Tailwind CSS</strong> (defaults to Yes)
                        </li>
                        <li>
                            Scaffolds a complete HeliumTS project with one of two templates:
                            <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
                                <li>
                                    <code>tailwind</code> - HeliumTS with Tailwind CSS pre-configured (default)
                                </li>
                                <li>
                                    <code>basic</code> - Standard HeliumTS setup
                                </li>
                            </ul>
                        </li>
                        <li>
                            Automatically runs <code>npm install</code>
                        </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">After Installation</h3>
                    <CodeBlock code={`cd my-app\nnpm run dev`} language="bash" />
                </>
            ) : (
                <>
                    <p>If you prefer to set up the project manually or want to understand how HeliumTS integrates with Vite, follow these steps.</p>

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">1. Install React + Vite</h3>
                    <CodeBlock code="npm create vite@latest my-helium-app -- --template react-ts" language="bash" />

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">2. Install HeliumTS</h3>
                    <CodeBlock code="npm install heliumts" language="bash" />

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">3. Setup Vite Config</h3>
                    <p>
                        Create or update <code>vite.config.ts</code> in the project root to include Helium's Vite plugin:
                    </p>
                    <CodeBlock
                        code={`import react from '@vitejs/plugin-react';
import helium from 'heliumts/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react(), helium()]
});`}
                        language="typescript"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">4. Delete main.tsx</h3>
                    <p>
                        Delete the <code>src/main.tsx</code> file created by Vite, as HeliumTS handles the client entry point automatically. Also, remove its reference from{" "}
                        <code>index.html</code> if present.
                    </p>
                    <CodeBlock code={`<!-- Remove this from index.html -->\n<script type="module" src="/src/main.tsx"></script>`} language="html" />

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">5. Update src/App.tsx</h3>
                    <p>
                        Update the <code>src/App.tsx</code> file created by Vite, to use Helium's <code>AppShellProps</code>:
                    </p>
                    <CodeBlock
                        code={`import { type AppShellProps } from "heliumts/client";
export default function App({ Component, pageProps }: AppShellProps) {
    return <Component {...pageProps} />;
}`}
                        language="tsx"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mt-6">6. Create the server and pages folders</h3>
                    <p>
                        Create <code>src/server</code> and <code>src/pages</code> folders to hold your server-side logic and client-side pages, respectively.
                    </p>

                    <div className="prose prose-teal max-w-none">
                        <div className="bg-yellow-50 border border-yellow-600 text-yellow-900 rounded-lg px-4 py-3 mb-6 text-sm">
                            <strong>Note:</strong>
                            <p>
                                For your RPC methods to be type-safe and your IDE recognize Helium imports, make sure you are running the development server with{" "}
                                <code>npx helium dev</code> as described below.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8">Running the Development Server</h2>
                    <CodeBlock code="npx helium dev" language="bash" />

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8">Building for Production</h2>
                    <CodeBlock code="npx helium build" language="bash" />

                    <h2 className="text-2xl font-semibold text-gray-900 mt-8">Starting the Production Server</h2>
                    <CodeBlock code="npx helium start" language="bash" />
                </>
            )}
        </div>
    );
}
