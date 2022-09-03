import type { ComputedRef, ShallowRef } from 'vue';
import type { LanguageCode } from '@/types/I18n.types';
import type { WebsiteConfig } from '@/types/WebsiteConfig.types';

export type GlobalState = {
  currentLanguageCode: ComputedRef<LanguageCode>;
  currentPageName: ComputedRef<string>;
  websiteConfig: ShallowRef<WebsiteConfig | undefined>;
};
