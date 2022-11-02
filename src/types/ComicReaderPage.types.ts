import type { FilePaginationConfig } from './FilePagination.types';
import type { I18nContent } from './I18n.types';

export type ComicConfig = {
  title: I18nContent<string>;
  filePagination: FilePaginationConfig;
};

export type ComicContentBatchConfig = {
  pages: ComicContentBatchPageConfig[];
};

export type ComicContentBatchPageConfig = {
  imageUrl: string;
  text: I18nContent<string>;
};
