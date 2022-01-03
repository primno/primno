import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";
import dts from 'rollup-plugin-dts';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

const plugins = [
    nodeResolve(),
    typescript({ module: "esnext" })
];

let pluginsD365 = [...plugins];

let sourcemap = "inline";

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
    pluginsD365.push(babel({
        babelHelpers: "bundled",
        presets: [["env"]]
    }));
    pluginsD365.push(terser());

    sourcemap = false;
}

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
        plugins: pluginsD365,
        external,
        output: { format: 'esm', file: pkg.dist['d365-esm'], sourcemap },
    }
];