import { useState, useRef } from "react";

function Codeforces() {
  const [handle, setHandle] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const resultRef = useRef(null);

  const handlePredict = async () => {
    if (!handle) {
      alert("Please enter a handle");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://cf-predictor-1-8kxz.onrender.com/forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ handle })
      });

      if (!res.ok) {
        throw new Error("Backend not responding");
      }

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      const predicted =
        data.forecast[data.forecast.length - 1];

      const resultData = {
        current: data.current_rating,
        predicted: predicted,
        increase: predicted - data.current_rating
      };

      setPrediction(resultData);

      // Scroll to result section
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (err) {
      console.error("API ERROR:", err);
      alert("Failed to fetch prediction from backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen text-white flex flex-col items-center pt-28 px-6 bg-black">

      {/* ===== Title ===== */}
      <h1 className="text-4xl md:text-5xl font-mono mb-10 text-center">
        Code<span className="text-red-500">forces</span>{" "}
        Rating <span className="text-green-400">Predictor</span>
      </h1>

      {/* ===== Input Card ===== */}
      <div className="w-full max-w-3xl bg-[#111827] rounded-2xl p-6 border border-gray-800 shadow-lg">

        <label className="block text-gray-300 mb-2">
          Codeforces Handle:
        </label>

        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="Enter handle (e.g. tourist)"
          className="w-full p-3 rounded-lg bg-[#1f2933] border border-gray-700 
                     focus:outline-none focus:border-green-400"
        />

        <button
          onClick={handlePredict}
          className="w-full mt-5 bg-green-500 hover:bg-green-400 
                     transition-all duration-200 text-black font-semibold 
                     p-3 rounded-lg"
        >
          {loading ? "Predicting..." : "Predict Rating"}
        </button>
      </div>

      {/* ===== RESULT SECTION ===== */}
      {prediction && (
        <>
          <div
            ref={resultRef}
            className="w-full max-w-5xl mt-16"
          >

            <div className="bg-[#0b1220] border border-green-500 rounded-2xl p-6 text-center">
              <h2 className="text-2xl mb-2">✅ Prediction Successful</h2>
              <p className="text-gray-400">
                Current rating: {prediction.current} → Predicted in 6 months:{" "}
                <span className="text-green-400">
                  {prediction.predicted}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center">

              <div className="bg-[#111827] p-6 rounded-xl">
                <p className="text-gray-400">Current Rating</p>
                <h3 className="text-4xl mt-2">
                  {prediction.current}
                </h3>
              </div>

              <div className="bg-[#111827] p-6 rounded-xl">
                <p className="text-gray-400">Increase</p>
                <h3 className="text-4xl mt-2 text-green-400">
                  +{prediction.increase}
                </h3>
              </div>

              <div className="bg-[#111827] p-6 rounded-xl">
                <p className="text-gray-400">Predicted Rating</p>
                <h3 className="text-4xl mt-2 text-green-400">
                  {prediction.predicted}
                </h3>
              </div>
            </div>

            <div className="mt-8 bg-green-900/40 border border-green-700 
                            text-center p-4 rounded-xl text-green-300">
              🔥 Amazing growth! Your dedication is paying off!
            </div>

            <div className="mt-6 bg-[#111827] border border-gray-800 
                            rounded-xl p-4 text-center text-gray-300">
              ⏰ Prediction for <span className="text-white">6 months</span> from now
            </div>
          </div>

          {/* ===== HOW IT WORKS (Appears AFTER Result) ===== */}
          <div className="w-full max-w-3xl mt-16 bg-[#111827] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-400">
              How It Works
            </h2>

            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Fetches your real contest history from Codeforces API</li>
              <li>Uses last 10 contests as model features</li>
              <li>Applies trained regression model</li>
              <li>Predicts rating trend for next 6 contests</li>
            </ul>

            <p className="text-gray-500 mt-4 text-sm">
              ⚠ This is a statistical projection based on past performance.
            </p>
          </div>
        </>
      )}

    </section>
  );
}

export default Codeforces;
