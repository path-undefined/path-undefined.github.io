import type { I18nContent } from './I18n.types';

export type ArticlesConfig = {
  articles: ArticlesArticleConfig[];
  nextArticlesConfigPath?: string;
};

export type ArticlesArticleConfig = {
  title: I18nContent<string>;
  date: string;
  thumbnailImageUrl?: string;
  excerpt: I18nContent<string>;
  articleConfigPath: string;
};
