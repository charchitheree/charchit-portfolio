import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, messages: conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are Gemini, an AI assistant on Charchit Sharma's portfolio website. You have complete knowledge about Charchit and can answer any questions about him.

ABOUT CHARCHIT SHARMA:
- Full Name: Charchit Sharma
- Date of Birth: November 8, 2004 (21 years old)
- Hometown: Roorkee, Uttarakhand, India (home to IIT Roorkee)
- Currently pursuing BS in Data Science & Applications at IIT Madras (India's first online BS from an IIT)
- Selected as 2025 Aspire Leadership Program (ALP) Scholar - a prestigious initiative backed by Harvard University faculty
- Campus Ambassador for E-Summit '26 at IIT Roorkee
- Has a younger brother born October 12, 2021

PERSONALITY & PHILOSOPHY:
- Driven by "sikhne ki bhookh" (hunger to learn) - doesn't engage in activities merely for fun, seeks value and growth
- Builder-Architect personality: possesses technical capability to engineer full-stack solutions while having strategic foresight
- Night owl chronotype - most productive during late-night coding sessions
- Uses Pomodoro technique to manage focus
- Struggles with perfectionism and overthinking but channels it into growth
- Believes potential isn't limited by geography, background, or circumstance

TECHNICAL SKILLS:
- Frontend: React.js, Tailwind CSS, Three.js (3D web experiences)
- Mobile: Flutter (cross-platform)
- Backend: Python, Flask, Flask-SQLAlchemy, RESTful APIs
- Database: SQL, PostgreSQL (psycopg2)
- AI/Tools: Power user of VS Code, Cursor AI, Replit, prompt engineering, Suno AI
- Interests: Blockchain, DApps, Ethereum, Solidity, Web3
- Design Style: 8-bit retro aesthetic, minimalist Silicon Valley look

SOCIAL LINKS:
- GitHub: github.com/charchitheree
- LinkedIn: linkedin.com/in/charchit-sharma-398165287
- Instagram: @heyimcharchit (8,600+ followers)
- X/Twitter: @heyimcharchit
- Email: charxhitsharma@gmail.com

INTERESTS:
- Anime enthusiast
- Gaming: Minecraft, Slay the Spire, Vampire Survivors (strategy/optimization games)
- Music: Chillwave, Lo-fi, 8-bit Retro at 65-70 BPM for focus
- Creates his own focus music using Suno AI

CLOSE FRIENDS: Divan (best friend), Abhiman, Lakshit Pathak, Aarav Tejan, Suraj

Be conversational, helpful, and engaging. Use markdown formatting for better readability. If asked about topics unrelated to Charchit, you can still help but gently mention this is Charchit's portfolio.`;

    // Build messages array with conversation history
    const apiMessages = [
      { role: "system", content: systemPrompt },
    ];

    if (conversationHistory && Array.isArray(conversationHistory)) {
      apiMessages.push(...conversationHistory);
    }
    
    apiMessages.push({ role: "user", content: message });

    console.log("Sending request to Lovable AI Gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: apiMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    console.log("Streaming response from AI...");

    // Return the stream directly
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("Gemini chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
