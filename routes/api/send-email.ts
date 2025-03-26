// routes/api/send-email.ts
import { Handler } from "$fresh/server.ts";

const MAILJET_API_KEY = Deno.env.get("MAILJET_API");
const MAILJET_API_SECRET = Deno.env.get("MAILJET_SECRET");
const MAILJET_FROM_EMAIL = Deno.env.get("MY_EMAIL");
const MAILJET_FROM_NAME = "Forgiveness App";
const MAILJET_TO_EMAIL = Deno.env.get("MY_EMAIL");
const MAILJET_TO_NAME = "Paul";

export const handler = {
  async POST(req: Request, _ctx: Handler) {
    const body = await req.json();
    const { category, details, location } = body;
    console.log("Received email payload:", body);

    // Get client IP from headers
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("cf-connecting-ip") ||
      "Unknown IP";
    const currentDateTime = new Date().toLocaleString();

    const textPart = `You forgave Paul on ${currentDateTime} 😉❤️
Category: ${category}
Details: ${details}
Location: ${location}
IP Address: ${ip}`;

    const htmlPart = `
      <h3>You forgave Paul on ${currentDateTime} 😉❤️</h3>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Details:</strong> ${details}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>IP Address:</strong> ${ip}</p>
    `;

    const payload = {
      Messages: [
        {
          From: {
            Email: MAILJET_FROM_EMAIL,
            Name: MAILJET_FROM_NAME,
          },
          To: [
            {
              Email: MAILJET_TO_EMAIL,
              Name: MAILJET_TO_NAME,
            },
          ],
          Subject: "Your email flight plan!",
          TextPart: textPart,
          HTMLPart: htmlPart,
        },
      ],
    };

    console.log("Sending payload to Mailjet:", JSON.stringify(payload, null, 2));
    const authString = btoa(`${MAILJET_API_KEY}:${MAILJET_API_SECRET}`);

    try {
      const mailjetResponse = await fetch("https://api.mailjet.com/v3.1/send", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${authString}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await mailjetResponse.json();
      console.log("Mailjet response:", result);

      let emailSent = false;
      if (result && result.Messages && result.Messages.length > 0) {
        emailSent = result.Messages.every((msg: { Status: string }) => msg.Status === "success");
      }
      console.log("Email sent status:", emailSent);

      return new Response(JSON.stringify({ success: emailSent, result }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      console.error("Error sending email via Mailjet:", error);
      return new Response(JSON.stringify({ success: false, error: (error instanceof Error ? error.message : String(error)) }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }
  },
};
