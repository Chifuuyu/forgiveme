import { h } from "preact";
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
  { name: "Technology", img: "/technology.jpg" },
];

const sorryMessages: string[] = [
  "1. I'm really sorry... 😔",
  "2. Please forgive me, I know I've done wrong. 😢",
  "3. I truly regret my mistakes. 🙁",
  "4. I'm so, so sorry. 😟",
  "5. My apologies are endless. 😞",
  "6. I beg for your forgiveness. 😥",
  "7. I'm sorry from the depths of my soul. 😢",
  "8. Please give me another chance. 😔",
  "9. I can't live without your forgiveness. 😭",
  "10. This is the 10th time I'm sorry! 😭💔",
  "11. I am heartbroken, please forgive me. 😭",
  "12. I promise I'll make it right, please forgive me. 😢",
  "13. Every moment without your forgiveness hurts. 😔",
  "14. I'm on my knees, begging for forgiveness. 🙏",
  "15. My regret is endless, please forgive me. 😞",
  "16. I miss you terribly, I'm so sorry. 😥",
  "17. I can't bear this pain without your forgiveness. 😭",
  "18. I am truly, deeply sorry. 😟",
  "19. I humbly ask for your mercy. 😢",
  "20. This is my 20th apology, please let me in. 😔",
  "21. I know I've hurt you deeply, I'm so sorry. 💔",
  "22. I am drowning in regret, please forgive me. 😭",
  "23. My heart aches for your forgiveness. 😢",
  "24. I would do anything to be forgiven. 🙏",
  "25. Please, let this apology reach you. 😞",
  "26. I am sorry beyond words. 😟",
  "27. Every tear I shed is for you. 😢",
  "28. I long for your forgiveness like a lost soul. 😔",
  "29. I'm desperate for your pardon. 😭",
  "30. 30 apologies and counting... Please forgive me! 😭💔",
  "31. My sorrow is immeasurable. 😢",
  "32. I know I have failed you, I'm so sorry. 😞",
  "33. Please allow me to make amends. 🙏",
  "34. My heart is shattered without your forgiveness. 😔",
  "35. I regret every moment that caused you pain. 😢",
  "36. I am truly, deeply sorry. 😭",
  "37. I implore you to forgive me. 🙏",
  "38. I am consumed by regret. 😞",
  "39. My apologies are sincere and endless. 😔",
  "40. 40 times I've said sorry; please, please forgive me. 😭💔",
  "41. I am broken without your forgiveness. 😢",
  "42. Each apology comes from a broken heart. 😔",
  "43. I beseech you for mercy. 🙏",
  "44. I know I don't deserve it, but I'm sorry. 😞",
  "45. My remorse is real and deep. 😢",
  "46. I'm crying out for your forgiveness. 😭",
  "47. I promise to change if you forgive me. 😔",
  "48. My soul is in torment without you. 😢",
  "49. Every second is filled with regret. 😭",
  "50. Half a hundred apologies for my sins. 😭💔",
  "51. I grovel at your feet, please forgive me. 🙏",
  "52. I have no excuse, I'm just sorry. 😢",
  "53. I am truly penitent. 😔",
  "54. I wish I could take back every hurtful word. 😭",
  "55. Please give me one more chance. 🙏",
  "56. I am drowning in my sorrow. 😞",
  "57. I am humbled by my mistakes. 😢",
  "58. My apologies are all I have left. 😔",
  "59. I'm desperate for reconciliation. 😭",
  "60. 60 heartfelt apologies, please forgive me. 😭💔",
  "61. My regret is as vast as the ocean. 😢",
  "62. I plead for your compassion. 🙏",
  "63. I am lost without your forgiveness. 😔",
  "64. I am deeply, deeply sorry. 😭",
  "65. Every beat of my heart cries for you. 😢",
  "66. I beg for a chance to be forgiven. 🙏",
  "67. My mistakes haunt me every moment. 😔",
  "68. I can't stop apologizing, please forgive me. 😭",
  "69. I am overwhelmed with remorse. 😢",
  "70. 70 apologies and still longing for your forgiveness. 😭💔",
  "71. I feel the weight of my sins every day. 😔",
  "72. I need your forgiveness to live. 😢",
  "73. My soul is shattered without your pardon. 😭",
  "74. I beg you, please let me make things right. 🙏",
  "75. I am a wreck without your forgiveness. 😔",
  "76. I am sorry beyond measure. 😢",
  "77. I can't find solace without your mercy. 😭",
  "78. I implore you to show me grace. 🙏",
  "79. My heart is heavy with regret. 😔",
  "80. 80 apologies and I still need you. 😭💔",
  "81. I can't bear this emptiness without forgiveness. 😢",
  "82. I am utterly lost in sorrow. 😔",
  "83. I crave the healing power of your pardon. 😭",
  "84. Every moment without your forgiveness is agony. 😢",
  "85. I am lost in my regret. 😔",
  "86. I'm on my knees, begging for mercy. 😭",
  "87. I need your forgiveness like never before. 🙏",
  "88. I am lost without your understanding. 😢",
  "89. My regret consumes me entirely. 😔",
  "90. 90 apologies for all my wrongs; please, please forgive me. 😭💔",
  "91. My heart is heavy with sorrow. 😢",
  "92. I cannot live without your forgiveness. 😔",
  "93. I am torn apart by my mistakes. 😭",
  "94. I humbly ask for your mercy. 🙏",
  "95. I am overwhelmed by my regret. 😢",
  "96. Please, let this apology be the first step to healing. 😔",
  "97. I long for the day you forgive me. 😭",
  "98. My soul is crying out for redemption. 😢",
  "99. I am on the brink of despair without your forgiveness. 😔",
  "100. This is the 100th apology; I'm utterly heartbroken and begging for your forgiveness. 😭💔"
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
  async function grabData(searchTerm = "sorry") {
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

  // Load an initial GIF.
  useEffect(() => {
    grabData("sorry");
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
    } else {
      grabData("sorry");
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
