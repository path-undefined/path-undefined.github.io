import { LanguageCode, MultiLanguageContent } from '@/services/Language.types';

export type WebsiteConfig = {
  languages: WebsiteLanguageConfig;
  pages: WebsitePageConfig[];
};

type WebsiteLanguageConfig = {
  fallbackOrder: LanguageCode[];
  options: WebsiteLanguageOptions[];
};

type WebsiteLanguageOptions = {
  code: LanguageCode;
  label: string;
};

type WebsitePageConfig = {
  name: string;
  label?: MultiLanguageContent<string>;
  navEntry: boolean;
  pageConfigPath: string;
};

export type WebsiteStatus = {
  currentLanguage: LanguageCode;
  currentPage: string;
};
