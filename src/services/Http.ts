const baseUrl = import.meta.env.VITE_BLOG_CONTENT_BASE_URL;

export async function fetchConfigJson<T>(path: string): Promise<T> {
  const response = await fetch(
    baseUrl + path,
    {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      cache: 'no-cache',
    },
  );

  return response.json();
}
