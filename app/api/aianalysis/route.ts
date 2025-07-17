import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

type Result = {
    title: string;
    link: string;
};

type ResultWithConfidence = Result & {
    confidence: number; // A value between 0 and 1
};

// Init Gemini
const genAI = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY }) ;

export async function POST(req: Request) {
    const body = await req.json();
    const inputArray: Result[] = body.results;

    if (!inputArray || !Array.isArray(inputArray)) {
        return new Response(JSON.stringify({ error: "Invalid input format" }), { status: 400 });
    }

    // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are an AI assistant that analyzes news headlines and their corresponding URLs. Your job is to assign a confidence score between 0.0 and 1.0 for how strongly each item suggests a **direct collaboration or partnership between two companies**.
    The score should be based on the content of the title and the URL. A score of 1.0 indicates a very strong indication of collaboration, while a score of 0.0 indicates no indication at all.
    IF the title or url has any thing like pdf check if that indicates any collaboration and rank them hgher else give low score.
    You should also consider the context of the title and URL, including any keywords that suggest collaboration or partnership.
    For example, if the title contains words like "merger", "acquisition", "joint venture", or "collaboration", you should assign a higher score. Similarly, if the URL contains these keywords, you should also assign a higher score.
    Return a JSON array like:
    [
      {
        "title": "...",
        "confidence": 0.42
      },
      ...
    ]
    
    Input:
    ${inputArray.map((r, i) => `${i + 1}. Title: ${r.title}\n   Link: ${r.link}`).join("\n")}
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

        if ( text && text.trim() === "") {
            return new Response(JSON.stringify({ error: "Empty response from Gemini" }), { status: 500 });
            
        }
        // Try to parse the JSON-like response from Gemini
        const parsed: { title: string; confidence: number }[] = JSON.parse(
            text?.trim().match(/\[[\s\S]*\]/)?.[0] || "[]"
        );

        const enriched: ResultWithConfidence[] = inputArray.map((item) => {
            const found = parsed.find((r) => r.title === item.title);
            return {
                ...item,
                confidence: found?.confidence ?? 0.0, // default to 0 if not found
            };
        });

        return new Response(JSON.stringify({count: enriched.length, result:enriched}), { status: 200 });
    } catch (error) {
        console.error("Gemini error:", error);
        return new Response(JSON.stringify({ error: "Failed to generate analysis" }), { status: 500 });
    }
}
