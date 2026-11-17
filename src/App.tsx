import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { AnimatePresence, motion } from 'motion/react';
import Header from './layouts/parts/Header';
import Footer from './layouts/parts/Footer';
import { GeminiChatbot } from './components/GeminiChatbot';
import { ScrollAnimationProvider } from './components/ScrollAnimationProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SiteContentProvider, useSiteContent } from './contexts/SiteContentContext';

// Pages publiques
import HomePage from './pages/index';
import AProposPage from './pages/a-propos';
import NosActivitesPage from './pages/nos-activites';
import NosProjetsPage from './pages/nos-projets';
import NotreMethodePage from './pages/notre-methode';
import EngagementsHSEPage from './pages/engagements-hse';
import ActualitesPage from './pages/actualites';
import ContactPage from './pages/contact';
import CataloguesPage from './pages/catalogues';
import MentionsLegalesPage from './pages/MentionsLegalesPage';
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage';

// Back-Office Administration (lazy-loaded)
const AdminApp = lazy(() => import('./pages/admin/AdminApp'));

function ScrollProgressBar() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollWidth(totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#0B2C5C] via-[#1a498f] to-[#F5A623] dark:from-white dark:via-blue-300 dark:to-white transition-all duration-150 shadow-[0_0_10px_#F5A623] dark:shadow-[0_0_10px_#ffffff]"
        style={{ width: `${scrollWidth}%` }}
      />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AnimatedPublicRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/a-propos" element={<AProposPage />} />
          <Route path="/nos-activites" element={<NosActivitesPage />} />
          <Route path="/nos-projets" element={<NosProjetsPage />} />
          <Route path="/notre-methode" element={<NotreMethodePage />} />
          <Route path="/engagements-hse" element={<EngagementsHSEPage />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/catalogues" element={<CataloguesPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { isPreviewMode } = useSiteContent();

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dato_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isAdminRoute) {
      document.documentElement.classList.remove('dark');
      return;
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dato_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dato_theme', 'light');
    }
  }, [darkMode, isAdminRoute]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('dato_theme')) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isAdminRoute) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50 text-[#0B2C5C] text-sm font-medium">
            Chargement de l&apos;espace d&apos;administration...
          </div>
        }
      >
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <ScrollProgressBar />
      <ScrollToTop />
      <ScrollAnimationProvider />
      {isPreviewMode && (
        <div className="bg-amber-400 text-[#0B2C5C] text-xs font-bold text-center py-1.5 px-4 sticky top-0 z-[120] shadow-xs">
          Mode Prévisualisation Administrateur — Affichage du contenu en brouillon non publié
        </div>
      )}
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#071933] text-slate-800 dark:text-slate-100 font-sans selection:bg-white selection:text-[#0B2C5C] transition-colors duration-200">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-1 w-full flex flex-col pt-[78px] sm:pt-[88px]">
          <AnimatedPublicRoutes />
        </main>

        <Footer />
        <GeminiChatbot />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <SiteContentProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </SiteContentProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
