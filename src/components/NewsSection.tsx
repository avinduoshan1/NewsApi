import { useState, useEffect } from 'react';
import type { NewsArticle } from '../types/news';
import { NewsAPIService } from '../services/newsApi';
import NewsCard from './NewsCard';

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('technology');

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const categories = [
    { id: 'technology', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'science', label: 'Science' },
    { id: 'health', label: 'Health' },
    { id: 'sports', label: 'Sports' },
    { id: 'entertainment', label: 'Entertainment' },
  ];

  useEffect(() => {
    const loadNews = async () => {
      if (!apiKey) {
        setError('API key is not configured');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const newsService = new NewsAPIService(apiKey);
        const response = await newsService.searchNews({
          keyword: selectedCategory,
          fromDate: '',
          toDate: '',
          language: 'en',
          sortBy: 'publishedAt',
        });
        setArticles(response.articles.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load news');
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [apiKey, selectedCategory]);

  return (
    <section className="news-section">
      <div className="news-section-header">
        <h2 className="section-title">Latest News & Updates</h2>
        <p className="section-subtitle">
          Stay informed with the latest developments in technology and beyond
        </p>
      </div>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${
              selectedCategory === category.id ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading latest news...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!isLoading && !error && articles.length > 0 && (
        <div className="news-grid">
          {articles.map((article, index) => (
            <NewsCard key={`${article.url}-${index}`} article={article} />
          ))}
        </div>
      )}

      {!isLoading && !error && articles.length === 0 && (
        <div className="no-results">
          <p>No articles found for this category.</p>
        </div>
      )}
    </section>
  );
}
