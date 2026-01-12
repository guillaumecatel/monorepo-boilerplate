import type { DecoratorFunction } from 'storybook/internal/types'

import { useEffect, useMemo } from 'react'
import { useGlobals } from 'storybook/internal/preview-api'

import { Locale, setLocale } from '../i18n/runtime'
import { availableLocales } from '../preview'

const withLocale: DecoratorFunction = (Story) => {
  const [global] = useGlobals()

  const locale = global.locale as Locale

  useEffect(() => {
    setLocale(locale, { reload: true })
  }, [locale])

  const { code, dir } = useMemo(() => {
    return availableLocales.find((l) => l.code === locale)!
  }, [locale])

  return (
    <div
      lang={code}
      dir={dir}>
      <Story />
    </div>
  )
}

export default withLocale
