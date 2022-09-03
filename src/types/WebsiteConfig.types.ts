import type { I18nContent, LanguageCode } from './I18n.types';

export type WebsiteConfig = {
  languages: WebsiteLanguageConfig;
  pages: WebsitePageConfig[];
};

export type WebsiteLanguageConfig = {
  fallbackOrder: LanguageCode[];
  options: WebsiteLanguageOptions[];
};

export type WebsiteLanguageOptions = {
  code: LanguageCode;
  label: string;
};

export type WebsitePageConfig = {
  name: string;
  label?: I18nContent<string>;
  pageConfigPath: string;
};
