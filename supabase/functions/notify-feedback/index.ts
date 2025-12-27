import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const notifyEmail = Deno.env.get("FEEDBACK_NOTIFY_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FeedbackRequest {
  display_name: string | null;
  is_anonymous: boolean;
  feedback_type: string;
  content: string;
  rating: number | null;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const feedback: FeedbackRequest = await req.json();
    
    console.log("Received feedback:", feedback);

    if (!notifyEmail) {
      console.error("FEEDBACK_NOTIFY_EMAIL not configured");
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const author = feedback.is_anonymous ? "Anonymous" : (feedback.display_name || "Unknown");
    const ratingText = feedback.rating ? `${"⭐".repeat(feedback.rating)}` : "No rating";
    const typeLabel = feedback.feedback_type.replace("_", " ").toUpperCase();

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #4285F4; margin-bottom: 20px;">New Portfolio Feedback!</h2>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${author}</p>
          <p style="margin: 0 0 10px 0;"><strong>Type:</strong> ${typeLabel}</p>
          <p style="margin: 0 0 10px 0;"><strong>Rating:</strong> ${ratingText}</p>
        </div>
        
        <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
          <p style="margin: 0; color: #333; line-height: 1.6;">${feedback.content}</p>
        </div>
        
        <p style="color: #888; font-size: 12px; margin-top: 20px;">
          Sent from your Charchit Portfolio feedback system
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Portfolio Feedback <onboarding@resend.dev>",
      to: [notifyEmail],
      subject: `New ${typeLabel} Feedback from ${author}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Email sent successfully to", notifyEmail);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in notify-feedback:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
