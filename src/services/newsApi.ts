import type { SearchFilters, NewsResponse } from '../types/news';

const BASE_URL = 'https://newsapi.org/v2';

export class NewsAPIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchNews(filters: SearchFilters): Promise<NewsResponse> {
    const params = new URLSearchParams({
      q: filters.keyword,
      apiKey: this.apiKey,
      language: filters.language,
      sortBy: filters.sortBy,
    });

    if (filters.fromDate) {
      params.append('from', filters.fromDate);
    }

    if (filters.toDate) {
      params.append('to', filters.toDate);
    }

    if (filters.source) {
      params.append('domains', filters.source);
    }

    const response = await fetch(`${BASE_URL}/everything?${params.toString()}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch news');
    }

    return response.json();
  }

  async getTopHeadlines(
    country: string = 'us',
    category?: string
  ): Promise<NewsResponse> {
    const params = new URLSearchParams({
      apiKey: this.apiKey,
      country,
    });

    if (category) {
      params.append('category', category);
    }

    const response = await fetch(
      `${BASE_URL}/top-headlines?${params.toString()}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch top headlines');
    }

    return response.json();
  }
}
