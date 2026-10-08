import React, { useState } from 'react';
import { PageId, Article } from '../types';
import { ParallaxBanner } from '../components/ParallaxBanner';
import { ARTICLES_DEMO } from '../data/siteData';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Share2, 
  Check, 
  X, 
  BookOpen, 
  MessageSquare,
  Search
} from 'lucide-react';

interface NewsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ 
  onNavigate, 
  onOpenQuoteModal 
}) => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleShare = (network: string, article: Article) => {
    const shareUrl = window.location.href;
    const shareText = `${article.title} - DA-TO GUINEE SA Guinée`;

    switch (network) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopiedId(article.id);
        setTimeout(() => setCopiedId(null), 2500);
        break;
      default:
        break;
    }
  };

  const categories = ['all', 'Aménagement Foncier', 'BTP & Infrastructures', 'Engagements & HSE'];

  const filteredArticles = ARTICLES_DEMO.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full bg-white">
      {/* 1. Parallax Banner */}
      <ParallaxBanner
        title="Actualités & Vie des Chantiers"
        subtitle="Suivez les étapes majeures de nos réalisations, nos avancées techniques et la vie du DA-TO GUINEE SA en République de Guinée."
        image="/src/assets/images/pole_foncier_survey_1791447799775.jpg"
        badge="COMMUNIQUÉS OFFICIELS & JOURNAL DE CHANTIER"
        currentPageLabel="Actualités"
        onNavigateHome={() => onNavigate('accueil')}
      />

      {/* 2. Filter & Search Controls */}
      <div className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B2C5C] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'Toutes les actualités' : cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un chantier..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#0B2C5C] bg-white"
            />
          </div>

        </div>
      </div>

      {/* 3. Articles Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">
              Aucun article ne correspond à votre recherche.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-[#0B2C5C] hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between card-hover group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={`Article DA-TO GUINEE SA - ${article.title}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category unboxed tag */}
                    <div className="absolute top-3 left-3 bg-[#0B2C5C]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded backdrop-blur-sm">
                      {article.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Metadata: Date and Read time */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
                        {article.date}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0B2C5C] font-display leading-snug mb-3 group-hover:text-[#F5A623] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions & Social Sharing */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 space-y-4">
                  {/* "Lire la suite" Button */}
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="w-full btn-primary py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Lire la suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Social Share Buttons */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-600 font-medium">
                      Partager l'article :
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleShare('linkedin', article)}
                        className="p-1.5 rounded text-slate-500 hover:text-[#0B2C5C] hover:bg-slate-100 transition-colors"
                        title="Partager sur LinkedIn"
                        aria-label="Partager sur LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleShare('facebook', article)}
                        className="p-1.5 rounded text-slate-500 hover:text-[#0B2C5C] hover:bg-slate-100 transition-colors"
                        title="Partager sur Facebook"
                        aria-label="Partager sur Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleShare('twitter', article)}
                        className="p-1.5 rounded text-slate-500 hover:text-[#0B2C5C] hover:bg-slate-100 transition-colors"
                        title="Partager sur X / Twitter"
                        aria-label="Partager sur X"
                      >
                        <Twitter className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleShare('whatsapp', article)}
                        className="p-1.5 rounded text-slate-500 hover:text-[#1F7A3A] hover:bg-slate-100 transition-colors"
                        title="Partager sur WhatsApp"
                        aria-label="Partager sur WhatsApp"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleShare('copy', article)}
                        className="p-1.5 rounded text-slate-500 hover:text-[#F5A623] hover:bg-slate-100 transition-colors"
                        title="Copier le lien de l'article"
                        aria-label="Copier le lien"
                      >
                        {copiedId === article.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4 rotate-90" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Toast when copied */}
                  {copiedId === article.id && (
                    <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded text-center border border-emerald-200 animate-in fade-in">
                      Lien copié dans le presse-papier !
                    </div>
                  )}

                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Article In-Depth Reading Modal */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#0B2C5C] text-white p-5 flex items-center justify-between border-b border-blue-900">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#F5A623]" />
                <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  DA-TO GUINEE SA · {activeArticle.category}
                </span>
              </div>
              <button 
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-inner">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>Publié le {activeArticle.date}</span>
                <span>·</span>
                <span>Temps de lecture : {activeArticle.readTime}</span>
                <span>·</span>
                <span>Rédaction DA-TO GUINEE SA Guinée</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0B2C5C] leading-tight">
                {activeArticle.title}
              </h2>

              {activeArticle.quote && (
                <blockquote className="border-l-4 border-[#F5A623] pl-4 py-2 bg-amber-50/50 rounded-r-lg text-sm italic text-slate-700 font-medium">
                  {activeArticle.quote}
                </blockquote>
              )}

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Share in modal */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-600">
                  Partager cette communication officielle :
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare('linkedin', activeArticle)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-[#0B2C5C] hover:text-white text-slate-700 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook', activeArticle)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-[#0B2C5C] hover:text-white text-slate-700 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp', activeArticle)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-[#1F7A3A] hover:text-white text-slate-700 transition-colors"
                    title="WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="btn-primary px-5 py-2 rounded-lg text-xs font-bold"
              >
                Fermer l'article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
