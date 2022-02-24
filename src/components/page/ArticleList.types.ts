import { MultiLanguageContent } from '@/services/Language.types';

export type ArticleListConfig = {
  articles: ArticleListArticleConfig[];
};

type ArticleListArticleConfig = {
  title: MultiLanguageContent<string>;
  date: string;
  thumbnailImageUrl?: string;
  excerpt: MultiLanguageContent<string>;
  articleConfigPath: string;
};

export type ArticleListPageConfig = {
  '@type': 'article-list';
  articlesPerPage: number;
  articleListConfigPaths: string[];
  i18n: ArticleListPageI18nConfig;
};

type ArticleListPageI18nConfig = {
  pageTitle: MultiLanguageContent<string>;
  articleLinkLabel: MultiLanguageContent<string>;
};
