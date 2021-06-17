import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
// import nodePolyfills from 'rollup-plugin-node-polyfills';
import ts from 'rollup-plugin-ts';
import pkg from './package.json';

const mode = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = mode;
process.env.BABEL_ENV = mode;

const external = [
  /@babel\/runtime/,
  ...Object.keys(pkg.devdependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [
  resolve({
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  }),
  commonjs({
    // Using a regular expression here works regardless of base path for npm link
    include: /node_modules/,
    transformMixedEsModules: true,
  }),
  // nodePolyfills(),
  ts({
    transpiler: 'babel',
  }),
];

export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        file: 'dist/cjs.js',
        format: 'cjs',
      },
      {
        dir: 'dist',
        format: 'es',
        preserveModules: true,
      },
    ],
    plugins,
    external,
  },
];
