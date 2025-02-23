import { useState, useEffect } from "preact/hooks";

interface Suggestion {
  name: string;
  img: string;
}

const suggestionsData: Suggestion[] = [
  { name: "Food", img: "/food.jpg" },
  { name: "Drink", img: "/drink.jpg" },
  { name: "Dress", img: "/dress.jpg" },
  { name: "Travel", img: "/travel.jpg" },
  { name: "Entertainment", img: "/fun.jpg" },
];

export default function Forgiveness() {
  const [gifUrl, setGifUrl] = useState("");
  const [showButtons, setShowButtons] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showInputBox, setShowInputBox] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [receiptMessage, setReceiptMessage] = useState("");
  const [flashActive, setFlashActive] = useState(false);
  const [locationData, setLocationData] = useState("Unknown location");
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);

  // Request user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setLocationData(
            `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`
          ),
        (error) => {
          console.error("Geolocation error:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError(
              "Location permission has been blocked. Please enable location access in your browser settings."
            );
          } else {
            setLocationError("Unable to get location.");
          }
          setLocationData("Unavailable");
        }
      );
    } else {
      setLocationData("Not supported");
    }
  }, []);

  // Fetch a GIF from Tenor API
  async function grabData(searchTerm = "please forgive me") {
    const apikey = "AIzaSyBWWo7AYx5FBmtunnDFAYt2ZHoNOUI2GUQ";
    const clientkey = "my_test_app";
    const limit = 8;
    const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
      searchTerm
    )}&key=${apikey}&client_key=${clientkey}&limit=${limit}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setGifUrl(data.results[randomIndex].media_formats.gif.url);
      }
    } catch (error) {
      console.error("Error fetching GIF:", error);
    }
  }

  // Load an initial GIF
  useEffect(() => {
    grabData("please forgive me");
  }, []);

  function handleYes() {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 500);
    setShowButtons(false);
    setShowSuggestions(true);
    grabData("thank you you are the best");
  }

  function handleNo() {
    grabData("please forgive me");
  }

  function handleSelectCategory(category: string) {
    setSelectedCategory(category);
    setShowInputBox(true);
  }

  function handleBack() {
    setSelectedCategory("");
    setShowInputBox(false);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          details: userInput,
          location: locationData,
        }),
      });
      const result = await res.json();
      const currentDateTime = new Date().toLocaleString();
      setReceiptMessage(`You forgave Paul on ${currentDateTime} 😉❤️`);
      // Hide suggestions and buttons after submission
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="container mx-auto max-w-xl bg-white p-6 rounded-lg shadow-lg text-center relative">
      {/* Loading overlay */}
      {loading && (
        <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div class="text-white text-2xl font-bold">Sending email...</div>
        </div>
      )}
      {/* Flash overlay */}
      {flashActive && (
        <div class="flash fixed inset-0 bg-white opacity-100 z-50"></div>
      )}
      {/* Location error modal */}
      {locationError && (
        <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <p class="mb-4 text-lg">{locationError}</p>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => setLocationError("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showButtons && (
        <div class="button-container mt-4">
          <button
            class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mr-4"
            onClick={handleYes}
          >
            Yes
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            onClick={handleNo}
          >
            No
          </button>
        </div>
      )}

      {showSuggestions && (
        <div class="suggestion-section mt-4">
          {!selectedCategory && (
            <div class="suggestion-container flex flex-wrap justify-center gap-4">
              {suggestionsData.map((s) => (
                <div
                  key={s.name}
                  class="suggestion-item w-36 cursor-pointer"
                  onClick={() => handleSelectCategory(s.name)}
                >
                  <img
                    src={s.img}
                    alt={s.name}
                    class="w-36 h-36 rounded-lg object-cover"
                  />
                  <p class="mt-2 text-lg font-bold">{s.name}</p>
                </div>
              ))}
            </div>
          )}
          {selectedCategory && (
            <div class="mt-4">
              <p class="text-xl font-bold">Selected: {selectedCategory}</p>
              <div class="input-box mt-2">
                <input
                  type="text"
                  placeholder="Enter details..."
                  class="border border-gray-300 rounded p-2 w-64"
                  value={userInput}
                  onInput={(e) =>
                    setUserInput((e.target as HTMLInputElement).value)
                  }
                />
                <button
                  class="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <button
                class="back-button mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          )}
        </div>
      )}

      <div class="gif-container mt-4">
        {gifUrl && (
          <img src={gifUrl} alt="GIF" class="mx-auto rounded-lg" />
        )}
      </div>

      {receiptMessage && (
        <div id="receipt" class="mt-4 text-2xl font-bold">
          {receiptMessage}
        </div>
      )}
    </div>
  );
}
