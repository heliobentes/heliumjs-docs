"use ssg";
import CodeBlock from "../../../components/CodeBlock";

export default function ProductionDeployment() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Production Deployment</h1>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8" id="platform-compatibility">
                Platform Compatibility
            </h2>
            <p>
                Helium uses WebSocket-based RPC for real-time communication between client and server. This architecture requires a{" "}
                <strong>persistent server process</strong>, which affects your choice of hosting platform.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">✅ Fully Compatible Platforms</h3>
            <p>These platforms support persistent Node.js servers and WebSocket connections:</p>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 mt-4">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WebSocket Support</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RPC Support</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Digital Ocean App Platform</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4">Recommended. Full support for all features</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Railway</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4">Excellent for quick deployments</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Render</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4">Free tier available</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Fly.io</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4">Great for edge deployments</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">AWS EC2 / ECS</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4">Full control, requires more setup</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Google Cloud Run</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4">
                                Set <code>--session-affinity</code> for WebSockets
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Heroku</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4">
                                Use <code>heroku labs:enable http-session-affinity</code>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Self-hosted / VPS</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4 whitespace-nowrap">✅</td>
                            <td className="px-6 py-4">Docker or direct Node.js</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">⚠️ Limited Compatibility Platforms</h3>
            <p>These platforms have fundamental limitations that affect Helium features:</p>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 mt-4">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">What Works</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">What Doesn't Work</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Vercel</td>
                            <td className="px-6 py-4">Serverless (no persistent connections)</td>
                            <td className="px-6 py-4">SSG pages, static assets</td>
                            <td className="px-6 py-4">WebSocket RPC, direct URL navigation to dynamic routes</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Netlify</td>
                            <td className="px-6 py-4">Serverless (no persistent connections)</td>
                            <td className="px-6 py-4">SSG pages, static assets</td>
                            <td className="px-6 py-4">WebSocket RPC, direct URL navigation to dynamic routes</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">Cloudflare Pages</td>
                            <td className="px-6 py-4">Serverless</td>
                            <td className="px-6 py-4">SSG pages, static assets</td>
                            <td className="px-6 py-4">WebSocket RPC</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Using Helium on Vercel/Netlify (Limited Mode)</h3>
            <p>
                If you must use Vercel or Netlify, Helium can work in <strong>SSG-only mode</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                    <strong>Pre-render all pages</strong> using SSG (see <a href="./ssg.md">SSG documentation</a>)
                </li>
                <li>
                    <strong>Avoid RPC calls</strong> - use external APIs or pre-fetched data instead
                </li>
                <li>
                    <strong>Add SPA fallback</strong> with a <code>vercel.json</code>:
                </li>
            </ol>
            <CodeBlock
                code={`{
    "rewrites": [
        { "source": "/(.*)", "destination": "/index.html" }
    ]
}`}
                language="json"
            />
            <p className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <strong>Note:</strong> Even with SPA fallback, refreshing a page or navigating directly to a URL (not from the home page) may fail if that route requires
                server-side data.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-semibold text-gray-900 mt-8">Configuration Files in Production</h2>
            <p>
                When deploying your Helium application, the framework needs to load your <code>helium.config</code> file. The build process automatically handles TypeScript config
                files for you.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Automatic Config Transpilation</h3>
            <p>
                During <code>helium build</code>, the framework:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                    <strong>If helium.config.ts exists</strong>: Automatically transpiles it to <code>dist/helium.config.js</code>
                </li>
                <li>
                    <strong>If helium.config.js exists</strong>: Copies it to <code>dist/helium.config.js</code>
                </li>
                <li>
                    <strong>If helium.config.mjs exists</strong>: Copies it to <code>dist/helium.config.mjs</code>
                </li>
            </ol>
            <p className="mt-2">
                When you run <code>helium start</code>, the production server looks for the config file in the <code>dist</code> directory first, then falls back to the project
                root.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Deployment Structure</h3>
            <p>
                After running <code>helium build</code>, your deployment should include:
            </p>
            <CodeBlock
                code={`your-app/
├── dist/
│   ├── server.js              # Bundled server code
│   ├── helium.config.js       # Transpiled config (if you had .ts)
│   ├── index.html             # Client entry
│   └── assets/                # Client bundles
├── package.json
└── node_modules/`}
                language="plaintext"
            />

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Platform-Specific Instructions</h3>

            <h4 className="text-lg font-semibold text-gray-900 mt-4">Digital Ocean App Platform</h4>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                    Set build command: <code>npm run build</code>
                </li>
                <li>
                    Set run command: <code>npm run start</code> (or directly: <code>helium start</code>)
                </li>
                <li>
                    Ensure <code>node_modules</code> is included in the deployment
                </li>
                <li>
                    Add environment variables in Settings → App-Level Environment Variables
                    <ul className="list-disc list-inside ml-8 mt-1">
                        <li>
                            Example: <code>DATABASE_URL</code>, <code>JWT_SECRET</code>, <code>PORT</code>, etc.
                        </li>
                        <li>
                            These will be available in <code>process.env</code> automatically
                        </li>
                    </ul>
                </li>
            </ol>

            <h4 className="text-lg font-semibold text-gray-900 mt-4">Docker</h4>
            <CodeBlock
                code={`FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy built files
COPY dist ./dist

# The config file should be in dist/ after build
EXPOSE 3000

CMD ["node", "dist/server.js"]`}
                language="dockerfile"
            />

            <h4 className="text-lg font-semibold text-gray-900 mt-4">Vercel / Netlify (Limited Support)</h4>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <p className="font-bold">⚠️ Important</p>
                <p>
                    Vercel and Netlify are <strong>serverless platforms</strong> that do not support persistent WebSocket connections. This means:
                </p>
                <ul className="list-disc list-inside mt-2">
                    <li>
                        <strong>WebSocket-based RPC will not work</strong>
                    </li>
                    <li>
                        <strong>Direct URL navigation</strong> to routes (other than the home page) will return 404 errors
                    </li>
                    <li>
                        Only <strong>pre-rendered SSG pages</strong> and <strong>SPA navigation from the home page</strong> work correctly
                    </li>
                </ul>
            </div>
            <p>
                <strong>If you need full Helium functionality, use a platform that supports persistent servers</strong> (see{" "}
                <a href="#platform-compatibility">Platform Compatibility</a> above).
            </p>
            <p className="mt-4">
                For SSG-only deployments on Vercel, add a <code>vercel.json</code>:
            </p>
            <CodeBlock
                code={`{
    "rewrites": [
        { "source": "/(.*)", "destination": "/index.html" }
    ]
}`}
                language="json"
            />
            <p className="mt-4">
                For Netlify, add a <code>_redirects</code> file in your <code>public</code> folder:
            </p>
            <CodeBlock code={`/*    /index.html   200`} language="plaintext" />

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Manual Config Conversion</h3>
            <p>
                If you prefer to use <code>.js</code> config files in production without transpilation:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                    Rename your config file:
                    <CodeBlock code={`mv helium.config.ts helium.config.js`} language="bash" />
                </li>
                <li>
                    Update the syntax to JavaScript:
                    <CodeBlock
                        code={`// helium.config.js
export default {
    trustProxyDepth: 1,
    rpc: {
    compression: {
        enabled: true,
        threshold: 1024,
    },
        security: {
            maxConnectionsPerIP: 10,
            maxMessagesPerWindow: 100,
            rateLimitWindowMs: 60000,
            tokenValidityMs: 30000,
        },
    },
};`}
                        language="javascript"
                    />
                </li>
            </ol>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8">Environment Variables</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Client-Side Environment Variables</h3>
            <p>
                To expose environment variables to the browser, prefix them with <code>HELIUM_PUBLIC_</code>:
            </p>
            <CodeBlock
                code={`# .env or platform environment variables
HELIUM_PUBLIC_APP_NAME=My App
HELIUM_PUBLIC_API_URL=https://api.example.com
HELIUM_PUBLIC_FEATURE_FLAG=true`}
                language="bash"
            />
            <p className="mt-2">
                Access them in your React components using <code>import.meta.env</code>:
            </p>
            <CodeBlock
                code={`function MyComponent() {
    const appName = import.meta.env.HELIUM_PUBLIC_APP_NAME;
    const apiUrl = import.meta.env.HELIUM_PUBLIC_API_URL;
    const featureEnabled = import.meta.env.HELIUM_PUBLIC_FEATURE_FLAG === 'true';
    
    return <div>{appName} - {apiUrl}</div>;
}`}
                language="typescript"
            />
            <p className="mt-4 font-semibold">Important:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                    Build-time injection: Environment variables are injected at <strong>build time</strong> by Vite. Make sure your hosting platform (Digital Ocean, Vercel, etc.)
                    has the environment variables set before the build runs.
                </li>
                <li>
                    Only <code>HELIUM_PUBLIC_*</code> variables are exposed to the browser for security reasons
                </li>
                <li>
                    Server-side code can access all environment variables via <code>process.env</code>
                </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Using Platform Environment Variables (Recommended)</h3>
            <p>
                Most cloud platforms (Digital Ocean, Vercel, Heroku, etc.) provide their own environment variable management. This is the <strong>recommended approach</strong> for
                production:
            </p>
            <p className="mt-4 font-semibold">Digital Ocean App Platform:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Go to your app's Settings → App-Level Environment Variables</li>
                <li>
                    Add your variables (e.g., <code>DATABASE_URL</code>, <code>API_KEY</code>, <code>HELIUM_PUBLIC_APP_NAME</code>)
                </li>
                <li>
                    They'll be automatically injected into <code>process.env</code> and exposed to the client if prefixed with <code>HELIUM_PUBLIC_</code>
                </li>
            </ol>
            <p className="mt-4 font-semibold">Advantages:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
                <li>No need to deploy .env files</li>
                <li>Variables are managed securely by the platform</li>
                <li>Different values per environment (staging/production)</li>
                <li>No risk of committing secrets to git</li>
                <li>
                    <strong>No rebuild required</strong> when changing client-side variables
                </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Using .env Files in Production</h3>
            <p>
                If you need to deploy <code>.env</code> files, you have two options:
            </p>
            <p className="mt-4 font-semibold">Option 1: Include in deployment</p>
            <p>Add .env files to your deployment artifacts. For Digital Ocean:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                    Remove <code>.env</code> from <code>.gitignore</code> (only for non-secret configs)
                </li>
                <li>Or manually upload .env files via the platform UI</li>
            </ol>
            <p className="mt-4 font-semibold">Option 2: Copy during build</p>
            <p>Update your build process to copy .env files:</p>
            <CodeBlock
                code={`{
    "scripts": {
        "build": "helium build && cp .env* dist/ 2>/dev/null || true"
    }
}`}
                language="json"
            />
            <p className="mt-2">
                Then in production, run from the <code>dist</code> directory:
            </p>
            <CodeBlock code={`cd dist && node server.js`} language="bash" />

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Environment Variable Priority</h3>
            <p>Helium loads environment variables in this order (highest to lowest priority):</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                    <strong>Platform environment variables</strong> (from hosting provider)
                </li>
                <li>
                    <code>.env.production.local</code>
                </li>
                <li>
                    <code>.env.local</code>
                </li>
                <li>
                    <code>.env.production</code>
                </li>
                <li>
                    <code>.env</code>
                </li>
            </ol>
            <p className="mt-2">
                Existing <code>process.env</code> values are never overridden by <code>.env</code> files.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Troubleshooting</h3>

            <h4 className="text-lg font-semibold text-gray-900 mt-4">Warning: "No .env files found or no variables loaded"</h4>
            <p>This warning appears when:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>No .env files exist (normal if using platform variables)</li>
                <li>.env files exist but contain no variables</li>
                <li>Working directory doesn't contain .env files</li>
            </ol>
            <p className="mt-2 font-semibold">Solutions:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
                <li>If using platform environment variables: Ignore this warning, it's expected</li>
                <li>
                    If using .env files: Ensure they're in the same directory as <code>server.js</code>
                </li>
                <li>
                    Check <code>process.cwd()</code> matches your .env file location
                </li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mt-4">Error: "Unknown file extension .ts"</h4>
            <p>This means the config file wasn't transpiled during build. Ensure:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                    Your config file is at the project root as <code>helium.config.ts</code>
                </li>
                <li>
                    You ran <code>helium build</code> before deploying
                </li>
                <li>
                    The <code>dist/helium.config.js</code> file exists after build
                </li>
            </ol>

            <h4 className="text-lg font-semibold text-gray-900 mt-4">Config not loading in production</h4>
            <p>Check that:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                    The config file is in the <code>dist</code> directory
                </li>
                <li>
                    You're running from the correct directory (where <code>dist/</code> exists)
                </li>
                <li>
                    The <code>HELIUM_CONFIG_DIR</code> environment variable isn't incorrectly set
                </li>
            </ol>
        </div>
    );
}
