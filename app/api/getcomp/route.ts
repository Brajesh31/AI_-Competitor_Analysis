import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenAI } from "@google/genai";


type Result = {
  title: string;
  snippet: string; // Added snippet field
  confidence?: number; // Optional confidence field
};




export async function POST(req: Request) {
  const { targetCompany } = await req.json();
  // Init Gemini
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });




  if (!targetCompany) {
    return new Response(JSON.stringify({ error: 'Missing company names' }), { status: 400 });
  }

  const query = `${targetCompany} competitor`;

  const results: Result[] = [];

  const duckUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  try {
    const { data: html } = await axios.get(duckUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Referer': 'https://duckduckgo.com/',
        'DNT': '1', // Do Not Track
        'Upgrade-Insecure-Requests': '1',
      }
    });

    const $ = cheerio.load(html);
    // console.log("html", $.html()) // Log the first 1000 characters of the HTML
    console.log("duckUrl", duckUrl)
    $('div.result').each((_, el) => {
      const title = $(el).find('a.result__a').text().trim();
      const snippet = $(el).find('.result__snippet').text().trim();
      console.log(snippet)

      if (title) {
        results.push({ title, snippet }); // Optionally include snippet
        // You could also include the snippet: { title, snippet }
      }
    });

    const prompt = `
        You are an AI that evaluates news headlines and snippets, on basis of that you indentify the competitor companies with confidence metric and Return a JSON array with the following structure:
        
        [
          {
            "title": "company name here",
            "confidence": 0.85
          },
          ...
        ]
        
        Here are the headlines and snippets array:
        ${results.map((r, i) => `${i + 1}. ${r.title}`).join("\n")}
        `;

    try {
      // const result = await model.generateContent(prompt);
      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      })
      // const response = await result.response;
      console.log("Gemini response:", result); // Log the response for debugging
      const text = result.text;

      console.log("Gemini response:", text); // Log the response for debugging

      if (text && text.trim() === "") {
        return new Response(JSON.stringify({ error: "Empty response from Gemini" }), { status: 500 });

      }
      // Try to parse the JSON-like response from Gemini
      const parsed: { title: string, confidence: number }[] = JSON.parse(
        text?.trim().match(/\[[\s\S]*\]/)?.[0] || "[]"
      );

      return new Response(JSON.stringify({ count: parsed.length, result: parsed }), { status: 200 });
    } catch (error) {
      console.error("Gemini error:", error);
      return new Response(JSON.stringify({ error: "Failed to generate analysis" }), { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to scrape data' }), { status: 500 });
  }
}
