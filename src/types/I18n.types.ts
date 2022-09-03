export type LanguageCode = 'en' | 'de' | 'zh';

export type I18nContent<T> = {
  [key in LanguageCode]?: T;
};
