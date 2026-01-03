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

const {
  PAYLOAD_SECRET,
  PAYLOAD_URL,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} = process.env

if (
  !PAYLOAD_SECRET ||
  !PAYLOAD_URL ||
  !DATABASE_HOST ||
  !DATABASE_NAME ||
  !DATABASE_PASSWORD ||
  !DATABASE_PORT ||
  !DATABASE_USER
) {
  throw new Error(
    'Environment variables DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, and DATABASE_USER must be set.',
  )
}

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
  secret: PAYLOAD_SECRET,
  serverURL: PAYLOAD_URL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    prodMigrations: migrations,
    pool: {
      connectionString: `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
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
