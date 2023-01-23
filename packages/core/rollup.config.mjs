import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import dts from 'rollup-plugin-dts';
import pkg from './package.json' assert { type: 'json' };
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

const plugins = [
    nodeResolve(),
    typescript({ module: "esnext" }),
];

let sourcemap = true;

const onwarn = (warning, rollupWarn) => {
    const ignoredWarnings = [
        {
            code: 'CIRCULAR_DEPENDENCY',
            path: '../../node_modules/inversify/',
            targetPath: 'ids',
            takeFirst: true
        },
        {
            code: 'THIS_IS_UNDEFINED',
            path: '../../node_modules/inversify/',
            targetPath: 'id',
            takeFirst: false
        },
    ];

    const isIgnored = (ignoredWarning) => {
        const warningPath = ignoredWarning.takeFirst && warning[ignoredWarning.targetPath] ?
                            warning[ignoredWarning.targetPath][0] : warning[ignoredWarning.targetPath];
        
        return (
            warning.code === ignoredWarning.code &&
            warningPath != null &&
            // eslint-disable-next-line no-undef
            path.normalize(path.relative(__dirname, warningPath)).startsWith(path.normalize(ignoredWarning.path))
        );
    };

    if (!ignoredWarnings.some((ignoredWarning) => isIgnored(ignoredWarning))) {
        rollupWarn(warning);
    }
};

export default [
    // Public API (cjs)
    {
        input: 'src/primno.ts',
        plugins,
        external,
        onwarn,
        output: { format: 'cjs', file: pkg.main, sourcemap },
    },
    // Public API (dts)
    {
        input: 'build/primno.d.ts',
        plugins: [dts()],
        external,
        onwarn,
        output: { format: 'cjs', file: pkg.types },
    },
    // Public API (esm)
    {
        input: 'src/primno.ts',
        plugins,
        external,
        onwarn,
        output: { format: 'esm', file: pkg.module, sourcemap },
    },
    // D365 entry point
    {
        input: 'src/primno-d365.ts',
        plugins,
        external,
        onwarn,
        output: { format: 'esm', file: pkg.dist['d365-esm'], sourcemap },
    }
];