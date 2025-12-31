import { baseLocale, locales, localizeHref } from '@/i18n/runtime'

export const createStaticSitemapEntry = (
  url: string,
  changefreq: string = 'monthly',
  priority: number = 1.0,
) => {
  return `
    <url>
      <loc>
        ${localizeHref(url, { locale: baseLocale })}
      </loc>
      ${locales
        .filter((locale) => locale !== baseLocale)
        .map(
          (locale) =>
            `<xhtml:link rel="alternate" hreflang="${locale}" href="${localizeHref(url, { locale })}" />`,
        )
        .join('\n    ')}
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `
}
