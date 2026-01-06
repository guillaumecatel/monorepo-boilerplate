export default {
  '*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,astro,json,jsonc,json5,md}': [
    'pnpm run lint:fix',
  ],
  '*': ['pnpm run format:fix'],
}
