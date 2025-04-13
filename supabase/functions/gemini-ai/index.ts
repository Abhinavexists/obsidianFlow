
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, content, note } = await req.json();
    let prompt = "";
    let response;

    switch (action) {
      case "summarize":
        prompt = `Please provide a concise summary of the following note content in 3-5 bullet points:\n\n${content}`;
        break;
      case "suggest-tags":
        prompt = `Based on the following note content, suggest 3-5 relevant tags (single words or short phrases) that would be useful for categorizing this note. Return only the tags separated by commas without any explanation:\n\n${content}`;
        break;
      case "generate-content":
        prompt = `${content}`;
        break;
      case "find-connections":
        prompt = `Analyze the following note and identify 2-3 key concepts or topics that might be related to other notes. Focus on extracting main themes that could be linked to other content:\n\n${content}`;
        break;
      case "grammar-check":
        prompt = `Please correct any grammar or spelling issues in the following text, and return only the corrected text without explanations:\n\n${content}`;
        break;
      case "smart-search":
        // Content here is the search query
        prompt = `You are a search assistant looking through notes. The user is searching for "${content}". Extract 3-5 key search terms or concepts related to this query that would help find relevant notes.`;
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid action specified" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error(data.error?.message || "Unknown error from Gemini API");
    }

    // Extract the text from Gemini's response
    let result = "";
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      result = data.candidates[0].content.parts[0].text;
    }

    return new Response(
      JSON.stringify({ result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in gemini-ai function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
