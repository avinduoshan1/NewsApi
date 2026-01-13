# NewsAPI Explorer

A modern, responsive news search application built with React, TypeScript, and Vite. Search and discover news articles from over 80,000 sources worldwide using the NewsAPI.

## Features

- **Advanced Search**: Search articles by keyword, date range, source domain, language, and sort preferences
- **Real-time Results**: Instant news article fetching from NewsAPI
- **Responsive Design**: Beautiful, mobile-friendly interface that works on all devices
- **Rich Article Display**: View article images, descriptions, authors, publication dates, and sources
- **Multiple Languages**: Support for 13 different languages including English, Spanish, French, German, and more
- **Smart Filtering**: Filter by publication date, source domain, and sort by relevancy, popularity, or date

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A NewsAPI key (get yours free at [https://newsapi.org](https://newsapi.org))

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your NewsAPI key to the `.env` file:
```
VITE_NEWS_API_KEY=your_actual_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and visit the local development URL shown in the terminal

### Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

1. **Enter a search keyword**: Type any topic you want to search for
2. **Optional filters**:
   - Select a date range to filter articles
   - Specify a source domain to search within
   - Choose your preferred language
   - Select how to sort results (by date, relevancy, or popularity)
3. **Click "Search News"** to view results
4. **Browse articles**: Click "Read Full Article" to view the complete story on the original website

## Project Structure

```
src/
├── components/
│   ├── SearchForm.tsx    # Search form with filters
│   └── NewsCard.tsx      # Individual article card component
├── services/
│   └── newsApi.ts        # NewsAPI service integration
├── types/
│   └── news.ts           # TypeScript type definitions
├── App.tsx               # Main application component
├── App.css               # Application styles
└── main.tsx              # Application entry point
```

## Technologies Used

- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **NewsAPI**: Global news data source
- **CSS3**: Custom responsive styling

## API Information

This application uses the [NewsAPI](https://newsapi.org) service. The free tier includes:
- Up to 100 requests per day
- Access to articles from the last 30 days
- 80,000+ news sources

For production use or higher limits, consider upgrading to a paid plan.

## License

MIT