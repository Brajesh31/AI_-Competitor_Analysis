# Database and Storage

## Current implementation

The repository does not configure or connect to a database. There are no database clients, schema migrations, ORM models, SQL scripts, or database environment variables in the current application.

Research data is handled as follows:

| Data | Current handling | Persistence |
|---|---|---|
| Competitor candidates | Zustand client store | In-memory browser state |
| Search results | React component state | In-memory browser state |
| AI confidence scores | Added to current result objects | In-memory browser state |
| CSV export | Browser-generated Blob download | User-managed local file |
| Provider credentials | Server environment variables | Managed by deployment environment |

## Implications

- Reloading or starting a fresh browser session may discard in-memory research state.
- There is no multi-user workspace or shared research history.
- There is no server-side record of searches or exports.
- There is no database backup or restore procedure in this repository.
- The CSV file is an export artifact, not a synchronized database.

## If persistence is introduced

Choose a database only after defining the actual product requirement. A future design should specify:
- User identity, authorization, and tenant isolation.
- Research workspace and result ownership.
- Source URL, provider, query, and retrieval timestamp.
- Publication timestamp where available.
- AI model, prompt version, and score provenance.
- Retention, export, correction, and deletion behavior.
- Encryption, access logging, backup, and recovery.
- Data minimization and applicable privacy obligations.

Do not store API keys or provider credentials in research records. Avoid storing full scraped pages when a title, URL, short excerpt, and provenance metadata are sufficient.

## Current status

No database is required to run the current project. Do not add a database dependency merely to make the architecture appear more complete.
