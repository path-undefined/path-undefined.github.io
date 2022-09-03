import type { GlobalState } from '@/types/GlobalState.types';
import type { I18nContent, LanguageCode } from '@/types/I18n.types';

function getI18nContent<T>(
  content: I18nContent<T>,
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

export function useI18n(globalState: GlobalState) {
  const i18n = <T>(content: I18nContent<T>) =>
    getI18nContent(
      content,
      globalState.currentLanguageCode.value || 'en',
      globalState.websiteConfig.value?.languages.fallbackOrder || [ 'en' ],
    );

  return i18n;
}
