import { MultiLanguageContent } from './Language';

export type ArticleListConfig = {
  articles: ArticleListArticleConfig[];
};

type ArticleListArticleConfig = {
  title: MultiLanguageContent<string>;
  date: string;
  thumbnailImageUrl: string;
  excerpt: MultiLanguageContent<string>;
  articleConfigPath: string;
};
