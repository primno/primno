import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import path from "path";
import { RollupOptions, WarningHandlerWithDefault } from "rollup";
import { readFileSync } from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line security/detect-non-literal-fs-filename
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

const external: string[] = [
    ...Object.keys("dependencies" in pkg ? pkg.dependencies as Record<string, unknown> : {}),
    ...Object.keys("peerDependencies" in pkg ? pkg.peerDependencies as Record<string, unknown> : {}),
];

const watchMode = process.env.ROLLUP_WATCH === "true";

const plugins = [
    nodeResolve(),
    typescript({ module: "esnext", compilerOptions: { rootDir: "./src" } })
];

if (!watchMode) {
    plugins.push(terser());
}

const sourcemap = watchMode;

interface IgnoredWarning {
    code: string;
    path: string;
    targetPath: "id" | "ids";
}

const onwarn: WarningHandlerWithDefault = (warning, rollupWarn) => {
    const ignoredWarnings: IgnoredWarning[] = [
        {
            code: "CIRCULAR_DEPENDENCY",
            path: "../../node_modules/inversify/",
            targetPath: "ids",
        },
        {
            code: "THIS_IS_UNDEFINED",
            path: "../../node_modules/inversify/",
            targetPath: "id",
        },
    ];

    const isIgnored = (iw: IgnoredWarning) => {
        const warningPath = iw.targetPath == "ids" ? warning.ids?.at(0) : warning.id;

        return (
            warning.code === iw.code &&
            warningPath != null &&
            // eslint-disable-next-line no-undef
            path.normalize(path.relative(__dirname, warningPath)).startsWith(path.normalize(iw.path))
        );
    };

    if (!ignoredWarnings.some((iw) => isIgnored(iw))) {
        rollupWarn(warning);
    }
};

export default function (
    //command: Record<string, unknown>
): RollupOptions[]
{
    return [
        // Public API (cjs)
        {
            input: "src/primno-api.ts",
            plugins,
            external,
            onwarn,
            output: { format: "cjs", file: pkg.main, sourcemap },
        },
        // Public API (esm)
        {
            input: "src/primno-api.ts",
            plugins,
            external,
            onwarn,
            output: { format: "esm", file: pkg.module, sourcemap },
        },
        // D365 entry point
        {
            input: "src/primno-d365.ts",
            plugins,
            external,
            onwarn,
            output: { format: "esm", file: pkg.dist["d365-esm"], sourcemap },
        }
    ];
}