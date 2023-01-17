import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import dts from 'rollup-plugin-dts';
import pkg from './package.json';
import path from 'path';

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
            targetPath: 'importer'
        },
        {
            code: 'THIS_IS_UNDEFINED',
            path: '../../node_modules/inversify/',
            targetPath: 'id'
        },
    ];

    const isIgnored = (ignoredWarning) => {
        const warningPath = warning[ignoredWarning.targetPath];
        
        return (
            warning.code === ignoredWarning.code &&
            warningPath != null &&
            // eslint-disable-next-line no-undef
            path.relative(__dirname, warningPath).startsWith(path.normalize(ignoredWarning.path))
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