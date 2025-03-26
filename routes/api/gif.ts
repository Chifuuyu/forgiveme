export async function handler(req: Request): Promise<Response> {
  const apikey = Deno.env.get("GIF");
  if (!apikey) {
    return new Response("API key not set", { status: 500 });
  }
  const clientkey = "my_test_app";
  const limit = 15;
  const searchTerm = new URL(req.url).searchParams.get("q") || "I apologize";
  const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
    searchTerm
  )}&key=${apikey}&client_key=${clientkey}&limit=${limit}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    // Process and return data as JSON
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching GIF:", error);
    return new Response("Error fetching GIF", { status: 500 });
  }
}
