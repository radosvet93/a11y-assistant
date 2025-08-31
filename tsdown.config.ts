import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/lib.ts', 'src/types.ts'],
  format: ['esm', 'cjs']
})