import 'dotenv/config'

import { overwriteGetLocale } from '@/i18n/runtime'

overwriteGetLocale(() => 'en')
