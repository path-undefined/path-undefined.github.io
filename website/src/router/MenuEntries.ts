import type { MenuEntry } from "@/types/MenuEntry";

export const promiseOfMenuEntries: Promise<MenuEntry[]> = (async () => {
  const menuEntriesUrl = `${import.meta.env.BASE_URL}data/menu-entries.json`;
  const response = await fetch(menuEntriesUrl);

  if (!response.ok) {
    throw new Error("Cannot fetch menu entries");
  }

  return response.json();
})();
