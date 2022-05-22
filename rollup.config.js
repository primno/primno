import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

const plugins = [
    nodeResolve(),
    typescript({ module: "esnext" })
];

let sourcemap = "inline";

export default [
    // Public API (cjs)
    {
        input: 'src/primno.ts',
        plugins,
        external,
        output: { format: 'cjs', file: pkg.main, sourcemap },
    },
    // Public API (dts)
    {
        input: 'build/primno.d.ts',
        plugins: [dts()],
        external,
        output: { format: 'cjs', file: pkg.types},
    },
    // Public API (esm)
    {
        input: 'src/primno.ts',
        plugins,
        external,
        output: { format: 'esm', file: pkg.module, sourcemap },
    },
    // D365 entry point
    {
        input: 'src/primno-d365.ts',
        plugins,
        external,
        output: { format: 'esm', file: pkg.dist['d365-esm'], sourcemap },
    }
];