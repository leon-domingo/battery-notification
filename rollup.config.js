import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [nodeResolve],
  external: ['node-cron', 'systeminformation', 'node-notifier', 'commander'],
}
