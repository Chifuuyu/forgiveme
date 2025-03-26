// routes/api/gif.ts
export async function handler(req: Request): Promise<Response> {
  // Get the query parameter "q" (defaulting to "I apologize")
  const urlParams = new URL(req.url).searchParams;
  const query = urlParams.get("q") || "I apologize";

  // Retrieve the API key from the environment
  const apikey = Deno.env.get("GIF");
  if (!apikey) {
    return new Response(
      JSON.stringify({ error: "API key not set" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Set other API parameters
  const clientkey = "my_test_app";
  const limit = 15;
  const apiUrl = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
    query
  )}&key=${apikey}&client_key=${clientkey}&limit=${limit}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      // Pick a random GIF from the results
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const newGifUrl = data.results[randomIndex].media_formats.gif.url;
      return new Response(
        JSON.stringify({ newGifUrl }),
        { headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ newGifUrl: "" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error fetching GIF:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching GIF" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
