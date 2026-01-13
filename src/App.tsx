import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import NewsCard from './components/NewsCard';
import { NewsAPIService } from './services/newsApi';
import type { NewsArticle, SearchFilters } from './types/news';
import './App.css';

function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const loadTopHeadlines = async () => {
      if (!apiKey) {
        setError(
          'API key is not configured. Please add your NewsAPI key to the .env file.'
        );
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const newsService = new NewsAPIService(apiKey);
        const response = await newsService.getTopHeadlines('us');
        setArticles(response.articles);
        setTotalResults(response.totalResults);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An error occurred while fetching news'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadTopHeadlines();
  }, [apiKey]);

  const handleSearch = async (filters: SearchFilters) => {
    if (!apiKey) {
      setError(
        'API key is not configured. Please add your NewsAPI key to the .env file.'
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newsService = new NewsAPIService(apiKey);
      const response = await newsService.searchNews(filters);
      setArticles(response.articles);
      setTotalResults(response.totalResults);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while fetching news'
      );
      setArticles([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">NewsAPI Explorer</h1>
          <p className="app-subtitle">
            Search global news from over 80,000 sources
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {isLoading && (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Searching for news...</p>
            </div>
          )}

          {!isLoading && articles.length > 0 && (
            <>
              <div className="results-header">
                <h2>
                  Found {totalResults.toLocaleString()} article
                  {totalResults !== 1 ? 's' : ''}
                </h2>
                <p className="results-info">
                  Showing {articles.length} results
                </p>
              </div>

              <div className="news-grid">
                {articles.map((article, index) => (
                  <NewsCard key={`${article.url}-${index}`} article={article} />
                ))}
              </div>
            </>
          )}

          {!isLoading && articles.length === 0 && !error && (
            <div className="no-results">
              <p>No articles found. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>Powered by NewsAPI.org</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
