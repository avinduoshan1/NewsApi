import { useState } from 'react';
import type { SearchFilters } from '../types/news';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    fromDate: '',
    toDate: '',
    source: '',
    language: 'en',
    sortBy: 'publishedAt',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filters.keyword.trim()) {
      onSearch(filters);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label htmlFor="keyword">Search Keyword</label>
        <input
          type="text"
          id="keyword"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="e.g., Microsoft, AI, Climate"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fromDate">From Date</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="toDate">To Date</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={filters.toDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="source">Source Domain</label>
          <input
            type="text"
            id="source"
            name="source"
            value={filters.source}
            onChange={handleChange}
            placeholder="e.g., thenextweb.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={filters.language}
            onChange={handleChange}
          >
            <option value="ar">Arabic</option>
            <option value="de">German</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="he">Hebrew</option>
            <option value="it">Italian</option>
            <option value="nl">Dutch</option>
            <option value="no">Norwegian</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="sv">Swedish</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sortBy">Sort By</label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
          >
            <option value="publishedAt">Published Date</option>
            <option value="relevancy">Relevancy</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      <button type="submit" className="search-button" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search News'}
      </button>
    </form>
  );
}
