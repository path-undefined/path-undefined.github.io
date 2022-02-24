import { MultiLanguageContent } from '@/services/Language.types';

export type HeadlineBlockConfig = {
  '@type': 'headline';
  level: number;
  displayLevel: number;
  content: MultiLanguageContent<string>;
};
