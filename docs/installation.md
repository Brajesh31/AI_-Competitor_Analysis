# Installation

Requirements: Node.js 18.18 or newer and npm.

```powershell
npm ci
Copy-Item .env.example .env.local
```

Set `GEMINI_API_KEY` and `SERP_API_KEY` in `.env.local`, never in source or client-visible configuration. Start development with:

```powershell
npm run dev
```

Open `http://localhost:3000`.
