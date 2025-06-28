
import React from "react";
import { Lock, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-400 drop-shadow">Web3Hausa Analyzer</h1>
        <p className="text-gray-300 mt-2 text-lg">Binciken kasuwar crypto cikin Hausa da dabarun ciniki</p>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-2">🆓 Free Access</h2>
          <ul className="text-sm text-gray-300 space-y-2 mt-3">
            <li><CheckCircle className="inline mr-2 text-green-400" />Shigar da bayanai (market input)</li>
            <li><CheckCircle className="inline mr-2 text-green-400" />Nazarin yanayin kasuwa gaba ɗaya</li>
            <li><CheckCircle className="inline mr-2 text-green-400" />Score & matsayi (score/status)</li>
            <li><Lock className="inline mr-2 text-yellow-400" />Shawarar ciniki ta musamman (kulle)</li>
            <li><Lock className="inline mr-2 text-yellow-400" />Jeran duba PDF da sakonnin Telegram</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-800 to-indigo-900 rounded-xl p-6 border border-blue-500 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-2">🌟 Premium Access</h2>
          <ul className="text-sm text-gray-100 space-y-2 mt-3">
            <li><CheckCircle className="inline mr-2 text-green-300" />Dukkan fasalolin da ke cikin Free</li>
            <li><CheckCircle className="inline mr-2 text-green-300" />Shawarar dabarun ciniki: Scalping, Day, Swing</li>
            <li><CheckCircle className="inline mr-2 text-green-300" />Mafi kyawun pairs da za a yi ciniki</li>
            <li><CheckCircle className="inline mr-2 text-green-300" />Jagorar Hausa + PDF duba ciniki</li>
            <li><CheckCircle className="inline mr-2 text-green-300" />Ƙungiyar Telegram don tallafi da sigina</li>
          </ul>
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold">₦2,500 / wata ko ₦7,000 / wata 3</p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold transition">
              🔓 Bude Premium Yanzu
            </button>
          </div>
        </div>
      </section>

      <footer className="text-center mt-16 text-gray-500 text-sm">
        Hakkin mallaka © {new Date().getFullYear()} Web3Hausa | Duk haƙƙi na ajiye
      </footer>
    </div>
  );
}
