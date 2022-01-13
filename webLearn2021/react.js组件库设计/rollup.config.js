import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import appendImportCSS from './plugins/append-import-css';

const extensions = ['.js', '.ts', '.tsx'];
const isProduction = process.env.NODE_ENV === 'production';

export default {
  treeshake: {
    moduleSideEffects: false,
  },
  input: {
    index: './components',
    'nav-bar/index': './components/nav-bar',
    'alert/index': './components/alert',
  },
  output: [
    {
      dir: 'dist',
      format: 'esm',
    },
  ],
  plugins: [
    typescript(),
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        ),
      },
      preventAssignment: true,
    }),
    nodeResolve({
      extensions,
    }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'bundled',
    }),
    postcss({
      extract: true,
    }),
    appendImportCSS(),
    isProduction && terser({ format: { comments: false } }),
    progress(),
  ],
  external: ['react'],
};
