import { ArticlePageConfig } from './Article.types';
import { ArticleListPageConfig } from './ArticleList.types';

export type PageConfig =
  ArticleListPageConfig |
  ArticlePageConfig;
