import type { I18nContent } from './I18n.types';
import type { InternalUrl } from './InternalUrl.types';

export type ListConfig = {
  items: ListItemConfig[];
  nextArticlesConfigPath?: string;
};

export type ListItemConfig = {
  title: I18nContent<string>;
  date: string;
  thumbnailImageUrl?: string;
  excerpt: I18nContent<string>;
  itemUrl: InternalUrl;
};
