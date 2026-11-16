# Installation and local execution

## Requirements

- Node.js 20 or newer recommended.
- npm.
- Git.
- Google Gemini API key for AI-powered routes.
- SerpAPI key for the SerpAPI search route.

The repository includes `package-lock.json`. Use npm and `npm ci` to reproduce the dependency tree. Do not switch package managers without intentionally updating the lockfile.

## Clone

```bash
git clone https://github.com/Brajesh31/AI_-Competitor_Analysis.git
cd AI_-Competitor_Analysis
```

## Install dependencies

```bash
npm ci
```

## Create local secrets file

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS/Linux:

```bash
cp .env.example .env.local
```

Set the values in `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key
SERP_API_KEY=your_serpapi_key
```

Next.js loads `.env.local` for local development. Keep it out of Git and do not prefix server-side keys with `NEXT_PUBLIC_`.

## Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

## Type checking

```bash
npx tsc --noEmit
```

The package currently has a `lint` script defined as `next lint`. Next.js 15's current CLI workflow should not be assumed to support this legacy command. The repository CI uses TypeScript and production build validation until an ESLint flat configuration is added.

## Troubleshooting

See [troubleshooting.md](troubleshooting.md) for API key, provider, type-checking, and build issues.
