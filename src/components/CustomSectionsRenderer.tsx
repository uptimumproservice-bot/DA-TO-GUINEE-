import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { CustomSection } from '../types/cms';

export function CustomSectionsRenderer({ sections }: { sections?: CustomSection[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((sec) => {
        const isNavy = sec.theme === 'navy';
        const isMuted = sec.theme === 'muted';
        const bgClass = isNavy
          ? 'bg-[#0B2C5C] text-white'
          : isMuted
            ? 'bg-slate-100 dark:bg-[#0C254B]/50 text-slate-800 dark:text-white'
            : 'bg-white dark:bg-[#071933] text-slate-800 dark:text-white';

        return (
          <section key={sec.id} className={`py-16 transition-colors ${bgClass}`}>
            <div className="container mx-auto px-4 lg:px-8">
              <div
                className={`grid grid-cols-1 ${
                  sec.imageUrl ? 'lg:grid-cols-2 gap-12 items-center' : 'max-w-4xl mx-auto text-center'
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-1 mb-5 rounded-full ${sec.imageUrl ? '' : 'mx-auto'}`}
                    style={{ background: 'hsl(var(--accent))' }}
                  />
                  {sec.eyebrow && (
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: 'hsl(var(--accent))' }}
                    >
                      {sec.eyebrow}
                    </p>
                  )}
                  <h2
                    className={`text-2xl sm:text-3xl font-extrabold mb-4 leading-tight ${
                      isNavy ? 'text-white' : 'text-[#0B2C5C] dark:text-white'
                    }`}
                  >
                    {sec.titre}
                  </h2>
                  <p
                    className={`text-base leading-relaxed whitespace-pre-line ${
                      isNavy ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {sec.contenu}
                  </p>
                  {sec.ctaLabel && sec.ctaHref && (
                    <div className="mt-6">
                      <Link
                        to={sec.ctaHref}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
                        style={{ background: 'hsl(var(--accent))' }}
                      >
                        <span>{sec.ctaLabel}</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  )}
                </div>

                {sec.imageUrl && (
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-white/10">
                    <img
                      src={sec.imageUrl}
                      alt={sec.imageAlt || sec.titre}
                      className="w-full h-72 sm:h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
