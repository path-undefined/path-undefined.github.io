import { HeadlineBlockConfig } from './Headline.types';
import { ParagraphBlockConfig } from './Paragraph.types';
import { PictureBlockConfig } from './Picture.types';

export type BlockConfig =
  HeadlineBlockConfig |
  ParagraphBlockConfig |
  PictureBlockConfig;
