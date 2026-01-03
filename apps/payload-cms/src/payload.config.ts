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
  secret: PAYLOAD_SECRET!,
  serverURL: PAYLOAD_URL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    prodMigrations: migrations,
    pool: {
      host: DATABASE_HOST,
      port: Number(DATABASE_PORT),
      database: DATABASE_NAME,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
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
