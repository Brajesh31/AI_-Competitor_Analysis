# Architecture

The application is a Next.js 15 app-router project using React 19. The browser collects analysis inputs and renders results; server-side API routes coordinate provider calls and Gemini analysis.

```text
Browser UI
  -> Next.js API routes
      -> search/news/scraping providers
      -> Gemini analysis
  <- normalized findings and CSV export
```

Keep provider credentials and AI calls on the server. Validate user input before querying external services and normalize provider failures into explicit errors.
