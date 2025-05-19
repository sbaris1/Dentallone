// app/[lang]/dictionaries.ts
import 'server-only'

export const dictionaries = {
  en: () => import('../../dictionaries/en.json').then(module => module.default),
  tr: () => import('../../dictionaries/tr.json').then(module => module.default)
}

export const getDictionary = async (locale) => {
  if (locale !== 'en' && locale !== 'tr') {
    return dictionaries.en()
  }
  return dictionaries[locale]()
}