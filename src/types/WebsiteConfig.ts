import { LanguageCode, MultiLanguageContent } from './Language';

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
  label: MultiLanguageContent<string>;
  navEntry: boolean;
  pageConfigPath: string;
};
