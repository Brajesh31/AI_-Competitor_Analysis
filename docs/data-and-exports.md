# Data, result records and CSV export

## Collected result shape

Most source collection routes return records with:

| Field | Type | Meaning |
|---|---|---|
| `title` | string | Headline or search result title |
| `link` | string | URL associated with the result |
| `confidence` | number, optional | Gemini-generated collaboration relevance score added by AI analysis |

The competitor-discovery route returns `title` and `confidence` for candidate companies. Other source routes return `title` and `link`.

## Confidence values

The Gemini prompt asks for a value from 0.0 to 1.0 based on whether a title and URL suggest a direct collaboration or partnership. This number should be treated as a heuristic model output.

It is not a probability that a partnership exists. The prompt, model version, source text, and model output can influence it. Confirm important relationships against primary sources and record evidence separately.

## CSV export

The UI component `app/analysis/exporttocsv.tsx` exports the current result array with these column headings:

- `Title`
- `Link`
- `Confidence`

The export is generated in the browser using a Blob and downloaded as `results.csv`. It does not call a server export endpoint.

The current implementation wraps title and link values in double quotes but does not escape embedded double quotes. CSV consumers should be aware that unusual source titles or URLs could produce malformed fields. A future implementation should use a proper CSV serializer and consider spreadsheet formula injection.

## Included sample file

The root file `results (1).csv` is an example output snapshot. It contains repeated/similar findings and confidence values. It is not a clean benchmark set, curated dataset, or live feed. The included records should be treated as examples only.

## Source provenance

A responsible research record should preserve source URL, retrieved date/time, query terms, provider, and any available publication date. The current record shape stores only title, link, and optional confidence. It does not persist provider identity or fetch timestamp in a common schema.
