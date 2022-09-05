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
  ArticleImageBlockConfig;

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
  size: {
    width: number;
    height: number;
  };
  description: I18nContent<string>;
};
