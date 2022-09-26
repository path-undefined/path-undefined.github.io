import type { I18nContent } from './I18n.types';

export type PageConfig =
  ListPageConfig |
  ArticlePageConfig |
  ComicsPageConfig |
  DestinationsPageConfig;

export type ArticlePageConfig = {
  type: 'ArticlePage';
  i18n: {
    mapLinkLabel: I18nContent<string>;
    backToListLabel: I18nContent<string>;
  };
  articleConfigPath?: string;
};

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

export type DestinationsPageConfig = {
  type: 'DestinationsPage';
  i18n: {
    title: I18nContent<string>;
    message: I18nContent<string>;
  };
};

export type ComicsPageConfig = {
  type: 'ComicsPage';
  i18n: {
    title: I18nContent<string>;
    message: I18nContent<string>;
  };
};
