export enum MenuEntryType {
  ARTICLE = "article",
  CATEGORY = "category",
}

export type MenuEntry = {
  key: string;
  type: MenuEntryType;
  path: string;
  label: string;
};
