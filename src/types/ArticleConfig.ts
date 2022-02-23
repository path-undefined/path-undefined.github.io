import { ContentConfig } from './ContentConfig';
import { MultiLanguageContent } from './Language';

export type ArticleConfig = {
  title: MultiLanguageContent<string>;
  time: string;
  location: {
    name: MultiLanguageContent<string>;
    coord?: {
      lat: number;
      long: number;
    };
  };
  content: ContentConfig[];
};
