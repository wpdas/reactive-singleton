import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import ts from '@wessberg/rollup-plugin-ts'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      strict: false,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: false,
      strict: false,
    },
  ],
  plugins: [external(), resolve(), ts(), commonjs(), terser()],
  external: ['react', 'react-dom'],
}
