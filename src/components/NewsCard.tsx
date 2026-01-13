import type { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <article className="news-card">
      {article.urlToImage && (
        <div className="news-card-image">
          <img src={article.urlToImage} alt={article.title} loading="lazy" />
        </div>
      )}
      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-source">{article.source.name}</span>
          <span className="news-date">{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className="news-title">{article.title}</h3>
        {article.description && (
          <p className="news-description">{article.description}</p>
        )}
        {article.author && (
          <p className="news-author">By {article.author}</p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-link"
        >
          Read Full Article →
        </a>
      </div>
    </article>
  );
}
