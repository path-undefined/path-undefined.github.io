import { LanguageCode, MultiLanguageContent } from '@/types/Language';

export function multiLanguageContent<T>(
  content: MultiLanguageContent<T>,
  language: LanguageCode,
  fallbackOrder: LanguageCode[],
): T {
  const result = content[language];
  if (result !== undefined) {
    return result;
  }

  for (const fallbackLanguage of fallbackOrder) {
    if (fallbackLanguage === language) {
      continue;
    }

    const fallbackResult = content[fallbackLanguage];
    if (fallbackResult !== undefined) {
      return fallbackResult;
    }
  }

  throw Error('Content is not provided in any language.');
}
