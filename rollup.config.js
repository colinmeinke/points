import babel from 'rollup-plugin-babel'
import commonJs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'

const config = {
  input: 'src/index.js',
  output: {
    name: 'Points',
    sourcemap: false,
    format: 'umd'
  },
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    commonJs(),
    nodeResolve()
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.output.file = 'dist/points.min.js'
  config.plugins.push(uglify())
} else {
  config.output.file = 'dist/points.js'
}

export default config
