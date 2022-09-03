import { computed, shallowRef } from 'vue';

import { fetchConfigJson } from '@/services/Http';

import type { RouteLocationNormalizedLoaded } from 'vue-router';
import type { GlobalState } from '@/types/GlobalState.types';
import type { LanguageCode } from '@/types/I18n.types';
import type { WebsiteConfig } from '@/types/WebsiteConfig.types';

let websiteConfigPromise: Promise<WebsiteConfig> = null as unknown as Promise<WebsiteConfig>;
let globalState: GlobalState = null as unknown as GlobalState;

export function useGlobalState(route: RouteLocationNormalizedLoaded): GlobalState {
  if (globalState === null) {
    const currentLanguageCode = computed(() => route.params.languageCode as LanguageCode || 'en');
    const currentPageName = computed(() => route.params.pageName as string || 'articles');
    const websiteConfig = shallowRef<WebsiteConfig>();

    globalState = {
      currentLanguageCode,
      currentPageName,
      websiteConfig,
    };

    if (websiteConfigPromise === null) {
      websiteConfigPromise = fetchConfigJson<WebsiteConfig>('/website.json');
      (async () => {
        globalState.websiteConfig.value = await websiteConfigPromise;
      })();
    }
  }

  return globalState;
}
