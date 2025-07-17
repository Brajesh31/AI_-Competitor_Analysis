import { getJson } from "serpapi";

type Result = {
    title: string;
    link: string;
};

export async function POST(req: Request) {
    const { targetCompany, competitorCompany } = await req.json();

    if (!targetCompany || !competitorCompany) {
        return new Response(JSON.stringify({ error: 'Missing company names' }), { status: 400 });
    }

    const query = `${targetCompany} ${competitorCompany} collaboration`;

    const results: Result[] = [];

    try {
        // Wrap the callback-based getJson in a Promise
        const data = await new Promise<any>((resolve, reject) => {
            getJson({
                engine: "google",
                q: query,
                api_key: process.env.SERP_API_KEY
            }, (json) => {
                if (json.error) reject(json.error);
                else resolve(json);
            });
        });

        const organicResults = data["organic_results"];
        if (Array.isArray(organicResults)) {
            for (const item of organicResults) {
                if (item.title && item.link) {
                    results.push({
                        title: item.title,
                        link: item.link
                    });
                }
            }
        }

        return new Response(JSON.stringify({ count: results.length, results }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to scrape data', errorLog: error }), { status: 500 });
    }
}
