export type Article = {
  key: string;
  type: "article";
  title: string;
  time: string;
  geolocation?: {
    name: string;
    coord?: {
      lat: number;
      long: number;
    };
  };
  thumbnail?: string;
  summary: string;
  content: string;
};
