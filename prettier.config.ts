import { type Config as PrettierConfig } from 'prettier'

export type Config = Partial<Record<'astro' | 'tailwindcss', boolean>>

const defineConfig = (config: Config) => {
  const defaultConfig: PrettierConfig = {
    trailingComma: 'all',
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    quoteProps: 'consistent',
    singleAttributePerLine: true,
    jsxSingleQuote: true,
    bracketSpacing: true,
    bracketSameLine: true,
    overrides: [],
    plugins: [],
  }

  if (config.astro) {
    defaultConfig.plugins?.push('prettier-plugin-astro')
    defaultConfig.overrides?.push({
      files: '*.astro',
      options: { parser: 'astro' },
    })
  }

  if (config.tailwindcss) {
    defaultConfig.plugins?.push('prettier-plugin-tailwindcss')
  }

  return defaultConfig
}

export default defineConfig({
  astro: true,
  tailwindcss: true,
})
