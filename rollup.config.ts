import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const config = {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'umd',
        name: 'tournament-pairings',
        entryFileNames: '[name]-umd.js'
    },
    plugins: [
        commonjs(),
        nodeResolve(),
        typescript({
            sourceMap: true
        })
    ]
};

export default config;
