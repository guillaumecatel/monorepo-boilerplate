import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'
import { baseLocale, locales } from '@/i18n/runtime'
import { migrations } from '@/migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
    },
    meta: {
      robots: 'noindex, nofollow',
    },
  },
  localization: {
    locales: [...locales],
    defaultLocale: baseLocale,
  },
  i18n: {
    fallbackLanguage: baseLocale,
    supportedLanguages: { en, fr },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.PAYLOAD_URL || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    prodMigrations: migrations,
    pool: {
      connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    },
  }),
  sharp,
  plugins: [],
  bin: [
    {
      scriptPath: path.resolve(dirname, 'seeds/index.ts'),
      key: 'seed',
    },
  ],
})
