# CompetitorAnalysis - AI-Powered Competitive Intelligence Platform

CompetitorAnalysis is a modern web application that helps businesses uncover and analyze competitor relationships with target accounts using AI-powered research and analysis.

## 🚀 Features

- **AI-Powered Research**: Automatically scans millions of public sources to find connections between competitors and target accounts
- **Multi-Source Analysis**: Integrates data from multiple sources including:
  - DuckDuckGo Search
  - Google News
  - ScrapeAPI
- **Smart Analysis**: Uses Google's Generative AI to analyze and score relationship confidence
- **Export Capabilities**: Export findings to CSV for further analysis
- **Real-time Processing**: Get results in minutes instead of hours of manual research
- **Interactive UI**: Built with modern animations and responsive design
- **Sample Result in CSV**: ![CSV File](/results%20(1).csv)
## 🔄 Data Flow Architecture

![Data Flow Diagram](/public/Screenshot%202025-05-01%20160133.png)

The application follows a multi-stage data processing pipeline:

1. **Data Collection Layer**
   - DuckDuckGo Search API
   - Google News Scraping
   - SerpAPI Integration
   - PDF Document Analysis

2. **Processing Layer**
   - Parallel API requests
   - Data aggregation
   - Duplicate removal
   - Content extraction

3. **AI Analysis Layer**
   - Google Gemini AI processing
   - Confidence score calculation
   - Result ranking
   - Relationship analysis

4. **Presentation Layer**
   - Interactive UI components
   - Real-time updates
   - Data visualization
   - Export functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.1 with React 19
- **UI Animation**: Framer Motion
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **AI Integration**: Google GenAI
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Web Scraping**: Cheerio, SerpAPI

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
app/
├── analysis/          # Analysis components and CSV export
├── api/              # API routes for data fetching and analysis
├── components/       # Reusable UI components
├── competitors/      # Competitor analysis pages
└── store/           # Global state management
```

## 🔍 Key Features Explained

### Target Analysis
- Input target and competitor companies
- Select search scope (DuckDuckGo, GNews, ScrapeAPI)
- Get AI-analyzed results with confidence scores
- Export findings to CSV

### Competitor Finder
- Find relevant competitors in your industry
- Get detailed relationship information
- View historical engagement data
- Analyze partnership status

## 🎯 Use Cases

- **Sales Intelligence**: Understand competitor relationships with target accounts
- **Market Research**: Quick competitive analysis for new markets
- **Strategic Planning**: Identify partnership opportunities and gaps
- **Sales Approach**: Tailor your pitch based on competitor relationships

## 🔐 Environment Variables

To run this project, you'll need to add the following environment variables to your `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
SERP_API_KEY=your_serp_api_key
```
