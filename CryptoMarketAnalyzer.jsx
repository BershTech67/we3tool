import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Loader,
  Info,
  Lock
} from "lucide-react";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom"; // Linking support

const getStatusIcon = (score) => {
  if (score > 75) return <CheckCircle className="text-green-400" />;
  if (score >= 40) return <Info className="text-yellow-400" />;
  return <XCircle className="text-red-400" />;
};

const getStatusText = (score) => {
  if (score > 75) return "Nagari sosai";
  if (score >= 40) return "Mai Kyau";
  return "Matsala";
};

const formatPercentage = (val) => `${parseFloat(val).toFixed(2)}%`;

const analyzeStrategy = (inputs, type) => {
  const volatilityScore = Math.abs(inputs.volumeChange) < 10 ? 30 : 10;
  const dominanceScore = type === "scalping" ? 20 - inputs.btcDominance * 0.1 : 15;
  const sentimentScore = inputs.sentiment > 50 ? 30 : 10;
  const volumeScore = inputs.totalVolume > 10000000000 ? 40 : 20;
  const baseScore = volatilityScore + dominanceScore + sentimentScore + volumeScore;

  let recommendation = [];
  let riskFactors = [];
  let bestPairs = [];

  if (type === "scalping") {
    recommendation = ["Yi amfani da 'stop loss' kusa", "Yi ma'amala da BTC/USDT"];
    riskFactors = ["Babban canjin farashi", "Rashin daidaito"];
    bestPairs = ["BTC/USDT", "ETH/USDT"];
  } else if (type === "day") {
    recommendation = ["Bi layin yanayin kasuwa", "Tabbatar da yawan ciniki"];
    riskFactors = ["Sauyin matsayi na rana"];
    bestPairs = ["ETH/USDT", "SOL/USDT"];
  } else {
    recommendation = ["Rike kasuwanci na kwana 1-7", "Duba al'amuran tattalin arziki"];
    riskFactors = ["Labaran gaggawa"];
    bestPairs = ["ADA/USDT", "AVAX/USDT"];
  }

  return {
    score: baseScore,
    status: getStatusText(baseScore),
    recommendation,
    riskFactors,
    bestPairs,
  };
};

export default function CryptoMarketAnalyzer() {
  const [inputs, setInputs] = useState({
    totalCap: 0,
    capChange: 0,
    totalVolume: 0,
    volumeChange: 0,
    btcDominance: 0,
    ethDominance: 0,
    sentiment: 50,
    activeCoins: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const isPremium = false; // Simulate premium status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) });
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      const scalping = analyzeStrategy(inputs, "scalping");
      const day = analyzeStrategy(inputs, "day");
      const swing = analyzeStrategy(inputs, "swing");
      const overall = (scalping.score + day.score + swing.score) / 3;
      setResult({ scalping, day, swing, overall });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-6 flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 bg-gray-900 bg-opacity-60 rounded-2xl p-6 shadow-xl backdrop-blur-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">📊 Shigar da Bayanai</h2>
        <div className="space-y-3">
          {Object.keys(inputs).map((key) => (
            <input
              key={key}
              name={key}
              type="number"
              step="any"
              placeholder={key}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
          <button
            onClick={handleAnalyze}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            🚀 Fara Bincike
          </button>
          <div className="text-sm text-gray-400">
            <strong>Tunatarwa:</strong> Domin ilimi ne kawai. Yi nazari da kanka.
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">Kana son ƙarin fasali? Duba <Link to="/premium" className="text-blue-400 underline hover:text-blue-300">Premium vs Free</Link></p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full animate-pulse">
            <Loader className="w-16 h-16 text-blue-400 animate-spin" />
            <p className="mt-4 text-lg">Ana nazarin kasuwa...</p>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="text-center text-3xl font-bold text-green-400 drop-shadow-md">📈 Yanayin Kasuwa</div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <p className="text-xl font-semibold">Mak'ala: <span className="text-blue-300">{Math.round(result.overall)}</span></p>
              <p>Mataki: <span className="text-yellow-300">{getStatusText(result.overall)}</span></p>
            </div>
            {Object.entries(result).map(([key, data]) => {
              if (key === "overall") return null;
              return (
                <div key={key} className="bg-gray-900 p-5 rounded-2xl shadow-inner border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold capitalize">🧠 Dabarar {key}</h3>
                    {getStatusIcon(data.score)}
                  </div>
                  <div className="text-sm text-blue-300 mb-1">Mak'ala: {Math.round(data.score)}</div>
                  <div className="text-sm text-yellow-400 mb-1">Mataki: {data.status}</div>
                  <div className="text-sm text-white mb-1">Shawara: <span className="text-gray-300">{data.recommendation.join(", ")}</span></div>
                  <div className="text-sm text-red-300 mb-1">Hatsari: <span className="text-gray-300">{data.riskFactors.join(", ")}</span></div>
                  <div className="text-sm text-green-300">Mafi Kyawun Pairs: <span className="text-gray-300">{data.bestPairs.join(", ")}</span></div>
                </div>
              );
            })}

            <div className="relative bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-xl text-center border border-gray-600 overflow-hidden">
              {!isPremium && (
                <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md flex flex-col items-center justify-center rounded-xl z-10 animate-pulse">
                  <Lock className="w-8 h-8 text-white mb-2" />
                  <p className="text-white font-medium">Cikakken Bayanin Dabaru an Kulle 🔒</p>
                  <p className="text-sm text-gray-400 mt-1">Bude shi domin samun PDF, sakonnin Telegram da ƙari.</p>
                </div>
              )}
              <div className={`${!isPremium ? 'opacity-20 blur-sm' : ''}`}>
                <h4 className="text-xl font-semibold mb-2">📘 Jagorar Premium</h4>
                <ul className="text-sm space-y-1 text-left">
                  <li>✅ Taswirar shiga/fita</li>
                  <li>✅ Mai tace ma'auratan kasuwa kai tsaye</li>
                  <li>✅ Jerin duba ciniki na Hausa (PDF)</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-12 text-lg">Shigar da bayanai domin fara nazari.</div>
        )}
      </div>
    </div>
  );
}