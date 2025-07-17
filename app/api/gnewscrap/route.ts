import axios from 'axios';
import * as cheerio from 'cheerio';

type Result = {
    title: string;
    link: string;
}


export async function POST(req: Request) {
    const { targetCompany, competitorCompany } = await req.json();

    if (!targetCompany || !competitorCompany) {
        return new Response(JSON.stringify({ error: 'Missing company names' }), { status: 400 });
    }

    const query = `${targetCompany} ${competitorCompany} collaboration`;

    const results: Result[] = [];

    const newsUrl = `https://news.google.com/search?q=${encodeURIComponent(query)}`;

    try {
        const { data: html } = await axios.get(newsUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Referer': 'https://duckduckgo.com/',
                'DNT': '1', // Do Not Track
                'Upgrade-Insecure-Requests': '1',
            }
        })

        const $ = cheerio.load(html);
        console.log("html", $.html()) // Log the first 1000 characters of the HTML
        console.log("newsUrl", newsUrl)

        $('article a').each((_, element) => {
            const title = $(element).text().trim();
            const relativeLink = $(element).attr('href') || '';
            const link = relativeLink.startsWith('http')
                ? relativeLink
                : `https://news.google.com${relativeLink.replace('./', '/')}`;

            if (!title || !link) {
                return; // Skip if title or link is not found
            }
            results.push({ title, link });
        });

        return new Response(JSON.stringify({ count: results.length, results }), { status: 200 });

        // return new Response($.html(), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to scrape data' }), { status: 500 });
    }
}