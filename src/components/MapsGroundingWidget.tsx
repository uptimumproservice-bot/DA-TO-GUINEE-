import React, { useState } from 'react';
import { MapPin, Search, Compass, Loader2, Navigation, ExternalLink } from 'lucide-react';

export function MapsGroundingWidget() {
  const [query, setQuery] = useState('Siège social et chantiers du DA-TO GUINEE SA à Lambanyi Conakry');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const presets = [
    "Siège social Lambanyi Conakry",
    "Pôles d'activités BTP en Guinée",
    "Zones d'aménagement foncier Conakry",
    "Accès et axes routiers majeurs"
  ];

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.text);
      } else {
        setResult("Impossible de récupérer les données géographiques.");
      }
    } catch (err) {
      setResult("Erreur de connexion au service cartographique.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#071933] border-t border-b border-slate-200 dark:border-white/10 transition-colors">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#0B2C5C] dark:bg-[#0E3366] dark:text-white text-xs font-bold mb-3 border dark:border-white/20">
            <Compass className="w-3.5 h-3.5 text-[#F5A623] dark:text-blue-300" />
            <span>Cartographie & Grounding Google Maps</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0B2C5C] dark:text-white mb-3">
            Implantation & Projets en Guinée
          </h2>
          <p className="text-slate-600 dark:text-blue-100 max-w-2xl mx-auto text-sm">
            Explorez notre ancrage territorial à Conakry et en République de Guinée grâce aux données cartographiques en temps réel.
          </p>
        </div>

        {/* Search Bar & Presets */}
        <div className="bg-white dark:bg-[#0C254B] rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-white/10 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-[#F5A623] dark:text-blue-300" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une zone, un chantier ou un bureau..."
                className="w-full bg-slate-100 dark:bg-[#0B254E] border border-slate-200 dark:border-white/20 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-[#0B2C5C] dark:focus:ring-white"
              />
            </div>
            <button
              onClick={() => handleSearch(query)}
              disabled={loading || !query.trim()}
              className="btn-accent dark:bg-[#0E3E7E] dark:hover:bg-[#1455a8] dark:border dark:border-white/30 dark:text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Search className="w-4 h-4 text-white" />}
              <span>Rechercher</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-slate-500 dark:text-blue-200 mr-1">Suggestions :</span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset);
                  handleSearch(preset);
                }}
                className="text-xs bg-slate-100 dark:bg-[#0B254E] hover:bg-amber-100 dark:hover:bg-[#123b78] text-slate-700 dark:text-white hover:text-[#0B2C5C] dark:hover:text-blue-200 px-3 py-1.5 rounded-lg transition-colors border border-slate-200 dark:border-white/20"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Results Box */}
        {(result || loading) && (
          <div className="bg-[#0B2C5C] dark:bg-[#0C254B] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border dark:border-white/15">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Navigation className="w-32 h-32 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#F5A623] dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#F5A623] dark:text-blue-300" />
              <span>Résultats de géolocalisation & analyse</span>
            </h3>
            {loading ? (
              <div className="flex items-center gap-3 py-8 text-white/80">
                <Loader2 className="w-6 h-6 animate-spin text-[#F5A623] dark:text-white" />
                <span className="text-sm">Interrogation des cartes et des données de terrain...</span>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-200 whitespace-pre-line">
                {result}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
