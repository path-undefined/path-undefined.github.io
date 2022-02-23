import { MultiLanguageContent } from '@/types/Language';

export type ParagraphContentConfig = {
  '@type': 'paragraph';
  attributes: {
    content: MultiLanguageContent<string>;
  };
};
