import { describe, expect, it } from 'vitest'

import {
  LANGUAGE_INFO_MAP,
  getAllLanguageCodes,
  getLanguageAbbreviation,
  getLanguageEmoji,
  getLanguageEndonym,
  getLanguageInfo,
  getLanguagesByScript,
  getRTLLanguages,
  isRTLLanguage,
} from '@/intl'

describe('LANGUAGE_INFO_MAP', () => {
  it('contient des infos pour fr', () => {
    expect(LANGUAGE_INFO_MAP.fr).toMatchObject({
      code: 'fr',
      name: 'French',
      endonym: 'Français',
      abbreviation: 'FR',
      direction: 'ltr',
      script: 'Latin',
    })
  })
  it('contient des infos pour ar', () => {
    expect(LANGUAGE_INFO_MAP.ar.direction).toBe('rtl')
    expect(LANGUAGE_INFO_MAP.ar.script).toBe('Arabic')
  })
})

describe('getLanguageInfo', () => {
  it('retourne les infos pour un code existant', () => {
    expect(getLanguageInfo('fr')).toEqual(LANGUAGE_INFO_MAP.fr)
    expect(getLanguageInfo('AR')).toEqual(LANGUAGE_INFO_MAP.ar)
  })
  it('retourne undefined pour un code inconnu', () => {
    expect(getLanguageInfo('zz')).toBeUndefined()
  })
})

describe('isRTLLanguage', () => {
  it('retourne true pour une langue RTL', () => {
    expect(isRTLLanguage('ar')).toBe(true)
    expect(isRTLLanguage('he')).toBe(true)
  })
  it('retourne false pour une langue LTR', () => {
    expect(isRTLLanguage('fr')).toBe(false)
    expect(isRTLLanguage('en')).toBe(false)
  })
})

describe('getLanguageAbbreviation', () => {
  it('retourne l’abréviation native', () => {
    expect(getLanguageAbbreviation('fr')).toBe('FR')
    expect(getLanguageAbbreviation('ar')).toBe('عر')
  })
  it('retourne le code en majuscule si inconnu', () => {
    expect(getLanguageAbbreviation('zz')).toBe('ZZ')
  })
})

describe('getLanguageEndonym', () => {
  it('retourne le nom natif', () => {
    expect(getLanguageEndonym('fr')).toBe('Français')
    expect(getLanguageEndonym('ar')).toBe('العربية')
  })
  it('retourne le code si inconnu', () => {
    expect(getLanguageEndonym('zz')).toBe('zz')
  })
})

describe('getAllLanguageCodes', () => {
  it('retourne tous les codes présents', () => {
    const codes = getAllLanguageCodes()
    expect(codes).toContain('fr')
    expect(codes).toContain('ar')
    expect(codes.length).toBeGreaterThan(10)
  })
})

describe('getRTLLanguages', () => {
  it('retourne toutes les langues RTL', () => {
    const rtl = getRTLLanguages()
    expect(rtl.every((lang) => lang.direction === 'rtl')).toBe(true)
    expect(rtl.map((l) => l.code)).toContain('ar')
  })
})

describe('getLanguagesByScript', () => {
  it('retourne toutes les langues du script Latin', () => {
    const latin = getLanguagesByScript('Latin')
    expect(latin.length).toBeGreaterThan(10)
    expect(latin.some((l) => l.code === 'fr')).toBe(true)
  })
  it('retourne toutes les langues du script Arabic', () => {
    const arabic = getLanguagesByScript('Arabic')
    expect(arabic.some((l) => l.code === 'ar')).toBe(true)
  })

  it('retourne un tableau vide si script inconnu', () => {
    const none = getLanguagesByScript('NonExistentScript')
    expect(Array.isArray(none)).toBe(true)
    expect(none.length).toBe(0)
  })
})

describe('getLanguageEmoji', () => {
  it("retourne l'emoji pour une langue connue", () => {
    expect(getLanguageEmoji('fr')).toBe(LANGUAGE_INFO_MAP.fr.emoji)
  })

  it('retourne undefined pour une langue inconnue', () => {
    expect(getLanguageEmoji('zz')).toBeUndefined()
  })
})
