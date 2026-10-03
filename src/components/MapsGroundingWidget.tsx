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
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#0B2C5C] text-xs font-bold mb-3">
            <Compass className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Cartographie & Grounding Google Maps</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0B2C5C] mb-3">
            Implantation & Projets en Guinée
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Explorez notre ancrage territorial à Conakry et en République de Guinée grâce aux données cartographiques en temps réel.
          </p>
        </div>

        {/* Search Bar & Presets */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-[#F5A623]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une zone, un chantier ou un bureau..."
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
            </div>
            <button
              onClick={() => handleSearch(query)}
              disabled={loading || !query.trim()}
              className="btn-accent px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Rechercher</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-slate-500 mr-1">Suggestions :</span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset);
                  handleSearch(preset);
                }}
                className="text-xs bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-[#0B2C5C] px-3 py-1.5 rounded-lg transition-colors border border-slate-200"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Results Box */}
        {(result || loading) && (
          <div className="bg-[#0B2C5C] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Navigation className="w-32 h-32 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#F5A623] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Résultats de géolocalisation & analyse</span>
            </h3>
            {loading ? (
              <div className="flex items-center gap-3 py-8 text-white/80">
                <Loader2 className="w-6 h-6 animate-spin text-[#F5A623]" />
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
