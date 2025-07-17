import axios from 'axios';
import * as cheerio from 'cheerio';

type Result = {
    title: string;
    link: string;
};

export async function POST(req: Request) {
    const { targetCompany, competitorCompany } = await req.json();

    if (!targetCompany || !competitorCompany) {
        return new Response(JSON.stringify({ error: 'Missing company names' }), { status: 400 });
    }

    // Add filetype:pdf to filter PDF documents
    const query = `${targetCompany} ${competitorCompany} collaboration filetype:pdf`;

    const results: Result[] = [];

    const duckUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

    try {
        const { data: html } = await axios.get(duckUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Referer': 'https://duckduckgo.com/',
                'DNT': '1',
                'Upgrade-Insecure-Requests': '1',
            }
        });

        const $ = cheerio.load(html);

        $('a.result__a').each((_, el) => {
            const title = $(el).text().trim();
            const rawLink = $(el).attr('href');

            if (title && rawLink) {
                const linkUrl = new URL(rawLink, "https://duckduckgo.com");
                const finalLink = decodeURIComponent(linkUrl.searchParams.get("uddg") || rawLink);

                if (finalLink.toLowerCase().endsWith(".pdf")) {
                    results.push({ title, link: finalLink });
                }
            }
        });

        return new Response(JSON.stringify({ count: results.length, results }), { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to scrape PDF links' }), { status: 500 });
    }
}
