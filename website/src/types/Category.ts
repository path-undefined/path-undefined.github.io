import type { Article } from "./Article";

export type Category = {
  key: string;
  path: string;
  type: "article";
  title: string;
  introduction: string;
  articles: Article[];
};
