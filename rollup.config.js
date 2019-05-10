import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

const banner = `//! ${pkg.name} v${pkg.version} - ${pkg.homepage} - @license: ${pkg.license}`;
const external = ['react'];

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/popup.es.js',
        format: 'es',
        banner
      }
    ],
    external,
    plugins: [typescript(), filesize()]
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/popup.cjs.min.js',
        format: 'cjs',
        sourcemap: true,
        banner
      },
      {
        file: 'dist/popup.umd.min.js',
        format: 'umd',
        name: 'popup',
        sourcemap: true,
        banner,
        globals: {
          react: 'React'
        }
      }
    ],
    external,
    plugins: [typescript(), terser(), filesize()]
  }
];
