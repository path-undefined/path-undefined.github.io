import { MultiLanguageContent } from '@/services/Language.types';
import { BlockConfig } from '@/components/block/Block.types';

export type ArticleConfig = {
  title: MultiLanguageContent<string>;
  time: {
    date: string;
    time: string;
    zone: string;
  };
  location: {
    name: MultiLanguageContent<string>;
    coord?: {
      lat: number;
      long: number;
    };
  };
  content: BlockConfig[];
};

export type ArticlePageConfig = {
  '@type': 'article';
  articleConfigPath?: string;
  i18n: ArticlePageI18nConfig;
};

type ArticlePageI18nConfig = {
  mapLinkLabel: MultiLanguageContent<string>;
};
