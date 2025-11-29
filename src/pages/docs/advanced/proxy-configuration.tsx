"use ssg";
import CodeBlock from "../../../components/CodeBlock";
import Heading from "../../../components/Heading";

export default function ProxyConfiguration() {
    return (
        <div className="space-y-6">
            <Heading level={1}>Proxy Configuration for IP Detection</Heading>
            <p>
                When deploying behind proxies (like Vercel, Cloudflare, AWS ALB, etc.), accurate client IP detection is crucial for rate limiting and connection limits. Without
                proper proxy configuration, the system might identify the proxy server's IP instead of the real client IP.
            </p>

            <Heading level={2} className="mt-8">
                Configuration
            </Heading>
            <p>
                Use the <code>trustProxyDepth</code> setting in your <code>helium.config.ts</code>:
            </p>
            <CodeBlock
                code={`import type { HeliumConfig } from "heliumts/server";

const config: HeliumConfig = {
    trustProxyDepth: 1, // Set based on your deployment
};

export default config;`}
                language="typescript"
            />

            <Heading level={2} className="mt-8">
                How It Works
            </Heading>
            <p>Helium checks multiple headers to extract the client IP, in order of reliability:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                    <code>CF-Connecting-IP</code> - Cloudflare's guaranteed client IP
                </li>
                <li>
                    <code>True-Client-IP</code> - Cloudflare Enterprise and Akamai
                </li>
                <li>
                    <code>X-Real-IP</code> - Set by Nginx and other proxies
                </li>
                <li>
                    <code>X-Forwarded-For</code> - Standard header containing IP chain
                </li>
                <li>
                    <code>req.socket.remoteAddress</code> - Direct connection IP (fallback)
                </li>
            </ol>

            <Heading level={2} className="mt-8">
                Common Deployment Scenarios
            </Heading>

            <Heading level={3} className="mt-6">
                Vercel / Netlify / Railway / DigitalOcean APPs
            </Heading>
            <p>
                <code>trustProxyDepth: 1</code>
            </p>
            <p>These platforms add one proxy layer.</p>

            <Heading level={3} className="mt-6">
                Cloudflare → Your Server
            </Heading>
            <p>
                <code>trustProxyDepth: 1</code>
            </p>
            <p>
                Helium automatically uses the <code>CF-Connecting-IP</code> header.
            </p>

            <Heading level={3} className="mt-6">
                Cloudflare → Nginx → Node.js
            </Heading>
            <p>
                <code>trustProxyDepth: 2</code>
            </p>
            <p>With two proxy layers (Nginx + Cloudflare).</p>

            <Heading level={3} className="mt-6">
                Local Development
            </Heading>
            <p>
                <code>trustProxyDepth: 0</code> (Default)
            </p>
            <p>No proxies in local development.</p>

            <Heading level={2} className="mt-8">
                Security Considerations
            </Heading>
            <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                    <strong>Setting trustProxyDepth Too Low:</strong> Rate limiting will apply to the proxy IP, affecting all users.
                </li>
                <li>
                    <strong>Setting trustProxyDepth Too High:</strong> Potential security risk if <code>X-Forwarded-For</code> is spoofed.
                </li>
            </ul>
            <p className="mt-4 font-semibold">
                Best Practice: Always set <code>trustProxyDepth</code> to match your exact proxy configuration.
            </p>
        </div>
    );
}
