# Development

Use server-only modules for credentials and external provider calls. Keep API responses typed and validated, set timeouts for network requests, and handle provider rate limits explicitly.

Before a pull request:

```powershell
npm ci
npm run lint
npm run build
```

Test loading, empty input, provider failure, AI failure, partial results, and CSV export. Review logs for secrets and personal data.
