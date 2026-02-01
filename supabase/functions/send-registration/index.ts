import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  city: string;
  experience: string;
  committee: string;
}

const experienceLabels: Record<string, string> = {
  "none": "No prior experience",
  "1-2": "1-2 conferences",
  "3-5": "3-5 conferences",
  "5+": "5+ conferences",
};

const committeeLabels: Record<string, string> = {
  "unep": "UN Environment Programme (UNEP)",
  "unfpa": "UN Population Fund (UNFPA)",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const data: RegistrationData = await req.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.school || !data.city || !data.experience || !data.committee) {
      throw new Error("Missing required fields");
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B7355; border-bottom: 2px solid #8B7355; padding-bottom: 10px;">
          OrdaMUN 2025 - Жаңа тіркелу
        </h1>
        
        <h2 style="color: #333; margin-top: 20px;">Жеке ақпарат</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Аты-жөні:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Телефон:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Мектеп/Университет:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.school}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Қала:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.city}</td>
          </tr>
        </table>
        
        <h2 style="color: #333; margin-top: 20px;">MUN ақпараты</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Тәжірибе:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${experienceLabels[data.experience] || data.experience}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Комитет:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${committeeLabels[data.committee] || data.committee}</td>
          </tr>
        </table>
        
        <p style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 8px; color: #666;">
          Бұл хабарлама OrdaMUN 2025 тіркелу формасынан автоматты түрде жіберілді.
        </p>
      </div>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "OrdaMUN Registration <onboarding@resend.dev>",
        to: ["adinaa.beisekovaa00@mail.ru"],
        subject: `Жаңа тіркелу: ${data.fullName}`,
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailResult);
      throw new Error(`Email sending failed: ${JSON.stringify(emailResult)}`);
    }

    console.log("Registration email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-registration function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
