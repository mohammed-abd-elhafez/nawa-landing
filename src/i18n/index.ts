import { ar } from './ar'
import { en } from './en'
import type { Dictionary, Lang } from './types'

export type { Dictionary, Lang }

export const dictionaries: Record<Lang, Dictionary> = { en, ar }

export const LANGS: readonly Lang[] = ['en', 'ar']

export const dirFor = (lang: Lang): 'ltr' | 'rtl' => (lang === 'ar' ? 'rtl' : 'ltr')

export const isLang = (value: unknown): value is Lang => value === 'en' || value === 'ar'
