export const DEFAULT_LOCALE = 'en' as const;
export const LOCALES = [DEFAULT_LOCALE, 'ar'] as const;

export type LOCALE = (typeof LOCALES)[number];
