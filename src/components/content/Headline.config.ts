import { MultiLanguageContent } from '@/types/Language';

export type HeadlineContentConfig = {
  '@type': 'headline';
  attributes: {
    level: number;
    displayLevel: number;
    content: MultiLanguageContent<string>;
  };
};
