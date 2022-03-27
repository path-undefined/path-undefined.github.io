import { MultiLanguageContent } from '@/services/Language.types';

export type PictureBlockConfig = {
  '@type': 'picture';
  url: string;
  description: MultiLanguageContent<string>;
};
