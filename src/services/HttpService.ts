class HttpService {
  private readonly baseUrl: string;

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getJson<T>(path: string): Promise<T> {
    const response = await fetch(
      this.baseUrl + path,
      {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        cache: 'no-cache',
      },
    );

    return response.json();
  }
}

export const httpService = new HttpService(process.env.VUE_APP_BLOG_CONTENT_BASE_URL);
