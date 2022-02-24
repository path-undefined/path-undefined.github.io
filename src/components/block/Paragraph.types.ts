import { MultiLanguageContent } from '@/services/Language.types';

export type ParagraphBlockConfig = {
  '@type': 'paragraph';
  content: MultiLanguageContent<string>;
};
