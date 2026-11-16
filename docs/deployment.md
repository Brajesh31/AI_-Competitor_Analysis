# Deployment

## Runtime model

The project is a Next.js App Router application. Production deployment requires a Node.js-compatible Next.js host capable of running server route handlers. The API routes call external providers at runtime, so the hosting environment needs outbound network access.

## Build and run

```bash
npm ci
npm run build
npm run start
```

The production server listens on the configured Next.js port, defaulting to 3000 unless the hosting environment supplies another port.

## Environment variables

Configure the following as server-side secrets in the deployment platform:

- `GEMINI_API_KEY`
- `SERP_API_KEY`

Do not place secrets in client-visible variables or commit them to the repository. Configure separate values for preview and production environments.

## Pre-deployment checklist

- [ ] Production build succeeds.
- [ ] Required provider credentials are configured.
- [ ] API routes have request validation and rate limits.
- [ ] Provider timeouts and bounded response sizes are configured.
- [ ] Public error responses do not expose provider internals.
- [ ] Logs redact secrets and sensitive research inputs.
- [ ] Source terms and scraping policy have been reviewed.
- [ ] Health and error monitoring are configured.
- [ ] Expected provider cost and quota are understood.

## Current gaps

The repository does not include a Dockerfile, deployment manifest, infrastructure configuration, database, authentication system, or observability setup. Those should be added only for a defined hosting and operational requirement.

A successful Next.js build does not confirm that external providers will work from the deployment network.
