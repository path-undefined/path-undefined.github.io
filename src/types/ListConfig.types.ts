import type { I18nContent } from './I18n.types';

export type ListConfig = {
  items: ListItemConfig[];
  nextArticlesConfigPath?: string;
};

export type ListItemConfig = {
  title: I18nContent<string>;
  date: string;
  thumbnailImageUrl?: string;
  excerpt: I18nContent<string>;
  itemUrl: ListItemUrlConfig;
};

export type ListItemUrlConfig = {
  pageName: string;
  queries: { [key: string]: string };
};