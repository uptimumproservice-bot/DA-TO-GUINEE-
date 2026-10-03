import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { AnimatePresence, motion } from 'motion/react';
import Header from './layouts/parts/Header';
import Footer from './layouts/parts/Footer';
import { GeminiChatbot } from './components/GeminiChatbot';
import { ScrollAnimationProvider } from './components/ScrollAnimationProvider';

// Pages
import HomePage from './pages/index';
import AProposPage from './pages/a-propos';
import NosActivitesPage from './pages/nos-activites';
import NotreMethodePage from './pages/notre-methode';
import EngagementsHSEPage from './pages/engagements-hse';
import ActualitesPage from './pages/actualites';
import ContactPage from './pages/contact';
import MentionsLegalesPage from './pages/MentionsLegalesPage';
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage';

// Automatically scroll to top on route change or hash target
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

function AnimatedRoutes() {
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
          <Route path="/notre-methode" element={<NotreMethodePage />} />
          <Route path="/engagements-hse" element={<EngagementsHSEPage />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ScrollAnimationProvider />
        <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#F5A623] selection:text-[#0B2C5C]">
          <Header />
          
          <main className="flex-1 w-full flex flex-col">
            <AnimatedRoutes />
          </main>

          <Footer />
          <GeminiChatbot />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
