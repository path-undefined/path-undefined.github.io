import type { I18nContent } from './I18n.types';

export type ArticleConfig = {
  title: I18nContent<string>;
  time: ArticleTimeConfig;
  location: ArticleLocationConfig;
  blocks: ArticleBlockConfig[];
};

export type ArticleTimeConfig = {
  date: string;
  time: string;
  timeZone: string;
};

export type ArticleLocationConfig = {
  name: I18nContent<string>;
  coord?: {
    lat: number;
    long: number;
  };
};

export type ArticleBlockConfig =
  ArticleHeadingBlockConfig |
  ArticleParagraphBlockConfig |
  ArticleImageBlockConfig |
  ArticleListBlockConfig;

export type ArticleHeadingBlockConfig = {
  type: 'HeadingBlock';
  level: 1 | 2 | 3;
  text: I18nContent<string>;
};

export type ArticleParagraphBlockConfig = {
  type: 'ParagraphBlock';
  content: I18nContent<string>;
};

export type ArticleImageBlockConfig = {
  type: 'ImageBlock';
  url: string;
  description: I18nContent<string>;
};

export type ArticleListBlockConfig = {
  type: 'ListBlock';
} & ArticleListBlockBaseListConfig;

export type ArticleListBlockSubListConfig = {
  text: I18nContent<string>;
} & ArticleListBlockBaseListConfig;

type ArticleListBlockBaseListConfig = {
  variant: 'ordered' | 'unordered';
  items: (I18nContent<string> | ArticleListBlockSubListConfig)[];
};

export type ArticleYoutubeBlockConfig = {
  videoId: string;
  aspectRatio: {
    width: number;
    height: number;
  };
  description: I18nContent<string>;
};