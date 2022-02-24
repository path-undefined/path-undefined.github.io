export type LanguageCode = 'en' | 'de' | 'zh';

export type MultiLanguageContent<T> = {
  [key in LanguageCode]?: T;
};
