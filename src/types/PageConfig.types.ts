import type { I18nContent } from './I18n.types';
import type { InternalUrl } from './InternalUrl.types';

export type PageConfig =
  ListPageConfig |
  ArticlePageConfig |
  ComicReaderPageConfig |
  DestinationsPageConfig;

export type ListPageConfig = {
  type: 'ListPage';
  i18n: {
    pageTitle: I18nContent<string>;
    readMoreLabel: I18nContent<string>;
    loadMoreLabel: I18nContent<string>;
  };
  itemsPerPage: number;
  listConfigPath: string;
};

export type ArticlePageConfig = {
  type: 'ArticlePage';
  i18n: {
    mapLinkLabel: I18nContent<string>;
    backLinkLabel?: I18nContent<string>;
  };
  backLinkUrl?: InternalUrl;
  articleConfigPath?: string;
};

export type DestinationsPageConfig = {
  type: 'DestinationsPage';
  i18n: {
    title: I18nContent<string>;
    message: I18nContent<string>;
  };
};

export type ComicReaderPageConfig = {
  type: 'ComicReaderPage';
  i18n: {
    backToListLabel: I18nContent<string>;
    nextPageLabel: I18nContent<string>;
    prevPageLabel: I18nContent<string>;
    jumpToLabel: I18nContent<string>;
  };
};
