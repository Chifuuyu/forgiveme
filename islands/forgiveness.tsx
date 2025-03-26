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
  { name: "Entertainment", img: "/fun.jpg" }
];

const sorryMessages: string[] = [
  "I'm really sorry... 😔",
  "Please forgive me, I know I've done wrong. 😢",
  "I truly regret my mistakes. 🙁",
  "I'm so, so sorry. 😟",
  "Your beauty radiates like a sunrise, captivating everyone around you. 😊",
  "I beg for your forgiveness. 😥",
  "I'm sorry from the depths of my soul. 😢",
  "Please give me another chance. 😔",
  "I can't live without your forgiveness. 😭",
  "This is the 10th time I'm sorry! 😭💔",
  "I am heartbroken, please forgive me. 😭",
  "I promise I'll make it right, please forgive me. 😢",
  "Every moment without your forgiveness hurts. 😔",
  "I'm on my knees, begging for forgiveness. 🙏",
  "Your kindness and grace inspire me every day. 🌸",
  "I miss you terribly, I'm so sorry. 😥",
  "I can't bear this pain without your forgiveness. 😭",
  "I am truly, deeply sorry. 😟",
  "I humbly ask for your mercy. 😢",
  "Your smile is as enchanting as a gentle melody. 💖",
  "I know I've hurt you deeply, I'm so sorry. 💔",
  "I am drowning in regret, please forgive me. 😭",
  "My heart aches for your forgiveness. 😢",
  "I would do anything to be forgiven. 🙏",
  "You light up every room you enter with your elegance. ✨",
  "I am sorry beyond words. 😟",
  "Every tear I shed is for you. 😢",
  "I long for your forgiveness like a lost soul. 😔",
  "I'm desperate for your pardon. 😭",
  "Your inner strength and charm make you truly remarkable. 🌟",
  "My sorrow is immeasurable. 😢",
  "I know I have failed you, I'm so sorry. 😞",
  "Please allow me to make amends. 🙏",
  "My heart is shattered without your forgiveness. 😔",
  "Your laughter is contagious and fills the world with joy. 😊",
  "I am truly, deeply sorry. 😭",
  "I implore you to forgive me. 🙏",
  "I am consumed by regret. 😞",
  "My apologies are sincere and endless. 😔",
  "Your presence is a beautiful blend of grace and warmth. 💕",
  "I am broken without your forgiveness. 😢",
  "Each apology comes from a broken heart. 😔",
  "I beseech you for mercy. 🙏",
  "I know I don't deserve it, but I'm sorry. 😞",
  "Your compassion and strength shine brightly, lighting up hearts. 🌹",
  "I'm crying out for your forgiveness. 😭",
  "I promise to change if you forgive me. 😔",
  "My soul is in torment without you. 😢",
  "Every second is filled with regret. 😭",
  "Your beauty and intelligence make you unforgettable. 🌼",
  "I grovel at your feet, please forgive me. 🙏",
  "I have no excuse, I'm just sorry. 😢",
  "I am truly penitent. 😔",
  "I wish I could take back every hurtful word. 😭",
  "Your vibrant spirit makes every moment a celebration. 🎉",
  "I am drowning in my sorrow. 😞",
  "I am humbled by my mistakes. 😢",
  "My apologies are all I have left. 😔",
  "I'm desperate for reconciliation. 😭",
  "Your elegance and charm are a constant inspiration. 🌷",
  "My regret is as vast as the ocean. 😢",
  "I plead for your compassion. 🙏",
  "I am lost without your forgiveness. 😔",
  "I am deeply, deeply sorry. 😭",
  "Your radiant smile brightens even the darkest days. ☀️",
  "I beg for a chance to be forgiven. 🙏",
  "My mistakes haunt me every moment. 😔",
  "I can't stop apologizing, please forgive me. 😭",
  "I am overwhelmed with remorse. 😢",
  "Your unique beauty captivates and inspires everyone around you. 🌺",
  "I feel the weight of my sins every day. 😔",
  "I need your forgiveness to live. 😢",
  "My soul is shattered without your pardon. 😭",
  "I beg you, please let me make things right. 🙏",
  "Your grace and confidence create a magnetic allure. 💫",
  "I am sorry beyond measure. 😢",
  "I can't find solace without your mercy. 😭",
  "I implore you to show me grace. 🙏",
  "My heart is heavy with regret. 😔",
  "Your eyes sparkle with the light of a thousand dreams. ✨",
  "I can't bear this emptiness without forgiveness. 😢",
  "I am utterly lost in sorrow. 😔",
  "I crave the healing power of your pardon. 😭",
  "Every moment without your forgiveness is agony. 😢",
  "Your warm heart and radiant soul make you truly special. 🌟",
  "I'm on my knees, begging for mercy. 😭",
  "I need your forgiveness like never before. 🙏",
  "I am lost without your understanding. 😢",
  "My regret consumes me entirely. 😔",
  "Your beauty transcends the ordinary, making life extraordinary. 💖",
  "My heart is heavy with sorrow. 😢",
  "I cannot live without your forgiveness. 😔",
  "I am torn apart by my mistakes. 😭",
  "I humbly ask for your mercy. 🙏",
  "Your elegance is timeless, and your spirit is endlessly captivating. 🌹",
  "Please, let this apology be the first step to healing. 😔",
  "I long for the day you forgive me. 😭",
  "My soul is crying out for redemption. 😢",
  "I am on the brink of despair without your forgiveness. 😔",
  "Your smile is the masterpiece that makes the world a better place. 😊"
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
  const [sorryCount, setSorryCount] = useState(0);
  const [sorryMessage, setSorryMessage] = useState("");
  const [noButtonDisabled, setNoButtonDisabled] = useState(false);

  // Request user's geolocation.
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

  // Fetch a GIF from Tenor API.
async function grabData(searchTerm = "I apologize") {
  try {
    const res = await fetch(`/api/gif?q=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    // Assume your server returns the GIF URL directly in data.newGifUrl, etc.
    setGifUrl(data.newGifUrl);
  } catch (error) {
    console.error("Error fetching GIF:", error);
  }
}

  // Load an initial GIF.
  useEffect(() => {
    grabData("I apologize");
  }, []);

  function handleYes() {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 500);
    setShowButtons(false);
    setShowSuggestions(true);
    grabData("thank you you are the best");
  }

  function handleNo() {
    if (noButtonDisabled) return;
    const newCount = sorryCount + 1;
    setSorryCount(newCount);
    const msg = newCount <= 100 ? sorryMessages[newCount - 1] : sorryMessages[99];
    setSorryMessage(msg);
    if (newCount >= 100) {
      setGifUrl("/depressed.gif");
      setNoButtonDisabled(true);
    } else if (newCount % 5 === 0 && newCount % 10 !== 0) {
      // For every multiple of 5 (but not multiple of 10), show a "you are pretty (cat)" GIF.
      grabData("you are pretty cat");
    } else {
      grabData("I apologize");
    }
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
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div class="container mx-auto max-w-xl bg-white p-6 rounded-lg shadow-lg text-center relative">
      {loading && (
        <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div class="text-white text-2xl font-bold">Sending email...</div>
        </div>
      )}
      {flashActive && (
        <div class="flash fixed inset-0 bg-white opacity-100 z-50"></div>
      )}
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
            disabled={noButtonDisabled}
          >
            No
          </button>
          {sorryMessage && (
            <p class="text-lg mt-2 text-red-600">{sorryMessage}</p>
          )}
        </div>
      )}
      {showSuggestions && (
        <div class="suggestion-section mt-4">
          {!selectedCategory && (
            <>
              <h2 class="text-xl font-bold mb-4">
                A Token of Apology: Please Choose an Option Below
              </h2>
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
            </>
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
