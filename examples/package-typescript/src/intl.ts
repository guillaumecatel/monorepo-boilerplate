/**
 * Utilitaires pour les langues et locales
 */

export interface LanguageInfo {
  /** Code ISO 639-1 */
  code: string
  /** Nom de la langue en anglais */
  name: string
  /** Nom natif de la langue (endonym) */
  endonym: string
  /** Abréviation native (2-3 caractères) */
  abbreviation: string
  /** Direction de lecture : 'ltr' (left-to-right) ou 'rtl' (right-to-left) */
  direction: 'ltr' | 'rtl'
  /** Famille de script */
  script: string
  /** Emoji représentant la langue ou le pays */
  emoji: string
}

export const LANGUAGE_INFO_MAP: Record<string, LanguageInfo> = {
  // Langues avec écriture RTL
  ar: {
    code: 'ar',
    name: 'Arabic',
    endonym: 'العربية',
    abbreviation: 'عر',
    direction: 'rtl',
    script: 'Arabic',
    emoji: '🇸🇦',
  },
  he: {
    code: 'he',
    name: 'Hebrew',
    endonym: 'עברית',
    abbreviation: 'עב',
    direction: 'rtl',
    script: 'Hebrew',
    emoji: '🇮🇱',
  },
  fa: {
    code: 'fa',
    name: 'Persian',
    endonym: 'فارسی',
    abbreviation: 'فا',
    direction: 'rtl',
    script: 'Arabic',
    emoji: '🇮🇷',
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    endonym: 'اردو',
    abbreviation: 'اُر',
    direction: 'rtl',
    script: 'Arabic',
    emoji: '🇵🇰',
  },
  yi: {
    code: 'yi',
    name: 'Yiddish',
    endonym: 'ייִדיש',
    abbreviation: 'יי',
    direction: 'rtl',
    script: 'Hebrew',
    emoji: '🇮🇱',
  },

  // Langues européennes (LTR)
  fr: {
    code: 'fr',
    name: 'French',
    endonym: 'Français',
    abbreviation: 'FR',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇫🇷',
  },
  en: {
    code: 'en',
    name: 'English',
    endonym: 'English',
    abbreviation: 'EN',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇬🇧',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    endonym: 'Español',
    abbreviation: 'ES',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇪🇸',
  },
  de: {
    code: 'de',
    name: 'German',
    endonym: 'Deutsch',
    abbreviation: 'DE',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇩🇪',
  },
  it: {
    code: 'it',
    name: 'Italian',
    endonym: 'Italiano',
    abbreviation: 'IT',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇮🇹',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    endonym: 'Português',
    abbreviation: 'PT',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇵🇹',
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    endonym: 'Nederlands',
    abbreviation: 'NL',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇳🇱',
  },
  pl: {
    code: 'pl',
    name: 'Polish',
    endonym: 'Polski',
    abbreviation: 'PL',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇵🇱',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    endonym: 'Русский',
    abbreviation: 'РУ',
    direction: 'ltr',
    script: 'Cyrillic',
    emoji: '🇷🇺',
  },
  uk: {
    code: 'uk',
    name: 'Ukrainian',
    endonym: 'Українська',
    abbreviation: 'УК',
    direction: 'ltr',
    script: 'Cyrillic',
    emoji: '🇺🇦',
  },
  tr: {
    code: 'tr',
    name: 'Turkish',
    endonym: 'Türkçe',
    abbreviation: 'TR',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇹🇷',
  },
  el: {
    code: 'el',
    name: 'Greek',
    endonym: 'Ελληνικά',
    abbreviation: 'ΕΛ',
    direction: 'ltr',
    script: 'Greek',
    emoji: '🇬🇷',
  },
  sv: {
    code: 'sv',
    name: 'Swedish',
    endonym: 'Svenska',
    abbreviation: 'SV',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇸🇪',
  },
  no: {
    code: 'no',
    name: 'Norwegian',
    endonym: 'Norsk',
    abbreviation: 'NO',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇳🇴',
  },
  da: {
    code: 'da',
    name: 'Danish',
    endonym: 'Dansk',
    abbreviation: 'DA',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇩🇰',
  },
  fi: {
    code: 'fi',
    name: 'Finnish',
    endonym: 'Suomi',
    abbreviation: 'FI',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇫🇮',
  },
  cs: {
    code: 'cs',
    name: 'Czech',
    endonym: 'Čeština',
    abbreviation: 'CS',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇨🇿',
  },
  ro: {
    code: 'ro',
    name: 'Romanian',
    endonym: 'Română',
    abbreviation: 'RO',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇷🇴',
  },
  hu: {
    code: 'hu',
    name: 'Hungarian',
    endonym: 'Magyar',
    abbreviation: 'HU',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇭🇺',
  },
  bg: {
    code: 'bg',
    name: 'Bulgarian',
    endonym: 'Български',
    abbreviation: 'БГ',
    direction: 'ltr',
    script: 'Cyrillic',
    emoji: '🇧🇬',
  },
  sr: {
    code: 'sr',
    name: 'Serbian',
    endonym: 'Српски',
    abbreviation: 'СР',
    direction: 'ltr',
    script: 'Cyrillic',
    emoji: '🇷🇸',
  },
  hr: {
    code: 'hr',
    name: 'Croatian',
    endonym: 'Hrvatski',
    abbreviation: 'HR',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇭🇷',
  },
  sk: {
    code: 'sk',
    name: 'Slovak',
    endonym: 'Slovenčina',
    abbreviation: 'SK',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇸🇰',
  },
  sl: {
    code: 'sl',
    name: 'Slovenian',
    endonym: 'Slovenščina',
    abbreviation: 'SL',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇸🇮',
  },
  et: {
    code: 'et',
    name: 'Estonian',
    endonym: 'Eesti',
    abbreviation: 'ET',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇪🇪',
  },
  lv: {
    code: 'lv',
    name: 'Latvian',
    endonym: 'Latviešu',
    abbreviation: 'LV',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇱🇻',
  },
  lt: {
    code: 'lt',
    name: 'Lithuanian',
    endonym: 'Lietuvių',
    abbreviation: 'LT',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇱🇹',
  },
  is: {
    code: 'is',
    name: 'Icelandic',
    endonym: 'Íslenska',
    abbreviation: 'IS',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇮🇸',
  },
  ga: {
    code: 'ga',
    name: 'Irish',
    endonym: 'Gaeilge',
    abbreviation: 'GA',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇮🇪',
  },
  cy: {
    code: 'cy',
    name: 'Welsh',
    endonym: 'Cymraeg',
    abbreviation: 'CY',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🏴',
  },
  eu: {
    code: 'eu',
    name: 'Basque',
    endonym: 'Euskara',
    abbreviation: 'EU',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🏴',
  },
  ca: {
    code: 'ca',
    name: 'Catalan',
    endonym: 'Català',
    abbreviation: 'CA',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🏴',
  },
  co: {
    code: 'co',
    name: 'Corsican',
    endonym: 'Corsu',
    abbreviation: 'CO',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇫🇷',
  },

  // Langues asiatiques (LTR)
  zh: {
    code: 'zh',
    name: 'Chinese',
    endonym: '中文',
    abbreviation: '中',
    direction: 'ltr',
    script: 'Han',
    emoji: '🇨🇳',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    endonym: '日本語',
    abbreviation: '日',
    direction: 'ltr',
    script: 'Han/Kana',
    emoji: '🇯🇵',
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    endonym: '한국어',
    abbreviation: '한',
    direction: 'ltr',
    script: 'Hangul',
    emoji: '🇰🇷',
  },
  th: {
    code: 'th',
    name: 'Thai',
    endonym: 'ไทย',
    abbreviation: 'ไท',
    direction: 'ltr',
    script: 'Thai',
    emoji: '🇹🇭',
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    endonym: 'Tiếng Việt',
    abbreviation: 'VI',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇻🇳',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    endonym: 'हिन्दी',
    abbreviation: 'हि',
    direction: 'ltr',
    script: 'Devanagari',
    emoji: '🇮🇳',
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    endonym: 'বাংলা',
    abbreviation: 'বা',
    direction: 'ltr',
    script: 'Bengali',
    emoji: '🇧🇩',
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    endonym: 'தமிழ்',
    abbreviation: 'த',
    direction: 'ltr',
    script: 'Tamil',
    emoji: '🇮🇳',
  },
  te: {
    code: 'te',
    name: 'Telugu',
    endonym: 'తెలుగు',
    abbreviation: 'తె',
    direction: 'ltr',
    script: 'Telugu',
    emoji: '🇮🇳',
  },
  mr: {
    code: 'mr',
    name: 'Marathi',
    endonym: 'मराठी',
    abbreviation: 'मर',
    direction: 'ltr',
    script: 'Devanagari',
    emoji: '🇮🇳',
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    endonym: 'ગુજરાતી',
    abbreviation: 'ગુ',
    direction: 'ltr',
    script: 'Gujarati',
    emoji: '🇮🇳',
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    endonym: 'ಕನ್ನಡ',
    abbreviation: 'ಕ',
    direction: 'ltr',
    script: 'Kannada',
    emoji: '🇮🇳',
  },
  ml: {
    code: 'ml',
    name: 'Malayalam',
    endonym: 'മലയാളം',
    abbreviation: 'മ',
    direction: 'ltr',
    script: 'Malayalam',
    emoji: '🇮🇳',
  },
  pa: {
    code: 'pa',
    name: 'Punjabi',
    endonym: 'ਪੰਜਾਬੀ',
    abbreviation: 'ਪੰ',
    direction: 'ltr',
    script: 'Gurmukhi',
    emoji: '🇮🇳',
  },
  id: {
    code: 'id',
    name: 'Indonesian',
    endonym: 'Bahasa Indonesia',
    abbreviation: 'ID',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇮🇩',
  },
  ms: {
    code: 'ms',
    name: 'Malay',
    endonym: 'Bahasa Melayu',
    abbreviation: 'MS',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇲🇾',
  },
  tl: {
    code: 'tl',
    name: 'Tagalog',
    endonym: 'Tagalog',
    abbreviation: 'TL',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇵🇭',
  },
  my: {
    code: 'my',
    name: 'Burmese',
    endonym: 'မြန်မာဘာသာ',
    abbreviation: 'မြ',
    direction: 'ltr',
    script: 'Myanmar',
    emoji: '🇲🇲',
  },
  km: {
    code: 'km',
    name: 'Khmer',
    endonym: 'ភាសាខ្មែរ',
    abbreviation: 'ខ្ម',
    direction: 'ltr',
    script: 'Khmer',
    emoji: '🇰🇭',
  },
  lo: {
    code: 'lo',
    name: 'Lao',
    endonym: 'ລາວ',
    abbreviation: 'ລາ',
    direction: 'ltr',
    script: 'Lao',
    emoji: '🇱🇦',
  },
  ne: {
    code: 'ne',
    name: 'Nepali',
    endonym: 'नेपाली',
    abbreviation: 'ने',
    direction: 'ltr',
    script: 'Devanagari',
    emoji: '🇳🇵',
  },
  si: {
    code: 'si',
    name: 'Sinhala',
    endonym: 'සිංහල',
    abbreviation: 'සි',
    direction: 'ltr',
    script: 'Sinhala',
    emoji: '🇱🇰',
  },

  // Langues africaines et autres
  sw: {
    code: 'sw',
    name: 'Swahili',
    endonym: 'Kiswahili',
    abbreviation: 'SW',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇰🇪',
  },
  am: {
    code: 'am',
    name: 'Amharic',
    endonym: 'አማርኛ',
    abbreviation: 'አም',
    direction: 'ltr',
    script: 'Ethiopic',
    emoji: '🇪🇹',
  },
  ha: {
    code: 'ha',
    name: 'Hausa',
    endonym: 'Hausa',
    abbreviation: 'HA',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇳🇬',
  },
  yo: {
    code: 'yo',
    name: 'Yoruba',
    endonym: 'Yorùbá',
    abbreviation: 'YO',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇳🇬',
  },
  zu: {
    code: 'zu',
    name: 'Zulu',
    endonym: 'isiZulu',
    abbreviation: 'ZU',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇿🇦',
  },
  xh: {
    code: 'xh',
    name: 'Xhosa',
    endonym: 'isiXhosa',
    abbreviation: 'XH',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇿🇦',
  },
  af: {
    code: 'af',
    name: 'Afrikaans',
    endonym: 'Afrikaans',
    abbreviation: 'AF',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇿🇦',
  },

  // Langues du Caucase et Asie Centrale
  ka: {
    code: 'ka',
    name: 'Georgian',
    endonym: 'ქართული',
    abbreviation: 'ქა',
    direction: 'ltr',
    script: 'Georgian',
    emoji: '🇬🇪',
  },
  hy: {
    code: 'hy',
    name: 'Armenian',
    endonym: 'Հայերեն',
    abbreviation: 'ՀԱ',
    direction: 'ltr',
    script: 'Armenian',
    emoji: '🇦🇲',
  },
  az: {
    code: 'az',
    name: 'Azerbaijani',
    endonym: 'Azərbaycan',
    abbreviation: 'AZ',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇦🇿',
  },
  kk: {
    code: 'kk',
    name: 'Kazakh',
    endonym: 'Қазақ тілі',
    abbreviation: 'ҚЗ',
    direction: 'ltr',
    script: 'Cyrillic',
    emoji: '🇰🇿',
  },
  uz: {
    code: 'uz',
    name: 'Uzbek',
    endonym: 'Oʻzbek',
    abbreviation: 'UZ',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🇺🇿',
  },
  mn: {
    code: 'mn',
    name: 'Mongolian',
    endonym: 'Монгол',
    abbreviation: 'МН',
    direction: 'ltr',
    script: 'Cyrillic',
    emoji: '🇲🇳',
  },

  // Langues construites et autres
  eo: {
    code: 'eo',
    name: 'Esperanto',
    endonym: 'Esperanto',
    abbreviation: 'EO',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🌍',
  },
  la: {
    code: 'la',
    name: 'Latin',
    endonym: 'Latina',
    abbreviation: 'LA',
    direction: 'ltr',
    script: 'Latin',
    emoji: '🏛️',
  },
}

/**
 * Récupère les informations d'une langue par son code ISO 639-1
 */
export function getLanguageInfo<T extends string>(
  languageCode: T,
): LanguageInfo {
  return LANGUAGE_INFO_MAP[languageCode.toLowerCase()]
}

/**
 * Vérifie si une langue utilise l'écriture de droite à gauche (RTL)
 */
export function isRTLLanguage<T extends string>(languageCode: T) {
  const info = getLanguageInfo<T>(languageCode)
  return info?.direction === 'rtl'
}

/**
 * Récupère l'abréviation native d'une langue
 */
export function getLanguageAbbreviation<T extends string>(languageCode: T) {
  const info = getLanguageInfo<T>(languageCode)
  return info?.abbreviation || languageCode.toUpperCase()
}

/**
 * Récupère le nom natif (endonym) d'une langue
 */
export function getLanguageEndonym<T extends string>(languageCode: T) {
  const info = getLanguageInfo<T>(languageCode)
  return info?.endonym || languageCode
}

/**
 * Récupère l'emoji d'une langue
 */
export function getLanguageEmoji<T extends string>(languageCode: T) {
  const info = getLanguageInfo<T>(languageCode)
  return info?.emoji
}

/**
 * Récupère tous les codes de langues disponibles
 */
export function getAllLanguageCodes() {
  return Object.keys(LANGUAGE_INFO_MAP)
}

/**
 * Récupère toutes les langues RTL
 */
export function getRTLLanguages(): LanguageInfo[] {
  return Object.values(LANGUAGE_INFO_MAP).filter(
    (lang) => lang.direction === 'rtl',
  )
}

/**
 * Récupère toutes les langues par famille de script
 */
export function getLanguagesByScript(script: string): LanguageInfo[] {
  return Object.values(LANGUAGE_INFO_MAP).filter(
    (lang) => lang.script === script,
  )
}
