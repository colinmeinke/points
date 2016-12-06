import babel from 'rollup-plugin-babel'
import commonJs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const config = {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'Points',
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    commonJs(),
    nodeResolve()
  ],
  sourceMap: true
}

if (process.env.NODE_ENV === 'production') {
  config.dest = 'dist/points.min.js'
  config.plugins.push(uglify())
} else {
  config.dest = 'dist/points.js'
}

export default config
