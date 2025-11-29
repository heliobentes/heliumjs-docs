"use ssg";
import CodeBlock from "../../../components/CodeBlock";
import Heading from "../../../components/Heading";

export default function Middleware() {
    return (
        <div className="space-y-6">
            <Heading level={1}>Middleware</Heading>
            <p>You can define a middleware to intercept requests to the server.</p>

            <p>
                <code>src/server/_middleware.ts</code>
            </p>
            <CodeBlock
                code={`import { middleware } from "heliumts/server";

export default middleware(async (ctx, next) => {
    console.log("Request received");
    // Add your database connection or auth logic here
    await next();
    //You can even add code after the request is handled
    console.log("Request ended");
});`}
                language="typescript"
            />
        </div>
    );
}
