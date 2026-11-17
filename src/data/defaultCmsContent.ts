import siteContent from './siteContent.json';
import { SitePageId, SiteSettings } from '../types/cms';

export interface DefaultPageSeed {
  pageId: SitePageId;
  title: string;
  slug: string;
  content: Record<string, any>;
}

export const DEFAULT_SITE_SETTINGS: Omit<SiteSettings, 'updatedBy' | 'updatedAt'> = {
  companyName: 'DA-TO GUINEE SA',
  legalName: "Société Anonyme à Conseil d'Administration",
  slogan: 'Construire durablement. Créer de la valeur.',
  logoLightUrl: '/logo.png',
  logoDarkUrl: '/logo-dark.png',
  phone: '+224 628 88 30 30',
  email: 'contact@datoguinee.com',
  address: 'Conakry, Lambanyi, Carrefour TMI',
  headquarters: 'Lambanyi, Carrefour TMI, Commune de Ratoma, Conakry, République de Guinée',
  hours: 'Lundi – Vendredi : 8h00 – 17h00',
  footerCopyright:
    "© 2026 DA-TO GUINEE SA · Société Anonyme à Conseil d'Administration. Tous droits réservés.",
  socialLinks: {
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
  },
  seoTitle: 'DA-TO GUINEE SA | BTP, Foncier & Immobilier en Guinée',
  seoDescription:
    "Portail web officiel de DA-TO GUINEE SA, entreprise guinéenne de référence spécialisée dans le BTP, le développement foncier et l'immobilier.",
  seoKeywords: 'DA-TO GUINEE SA, BTP Guinée, Développement Foncier Conakry, Immobilier Guinée, Génie Civil',
};

const rawPages = siteContent.pages;

export const DEFAULT_PAGES_SEED: Record<SitePageId, DefaultPageSeed> = {
  accueil: {
    pageId: 'accueil',
    title: 'Accueil',
    slug: '/',
    content: {
      hero: {
        ...rawPages.home.hero,
        secondaryCtaLabel: 'Contactez-nous',
        secondaryCtaHref: '/contact',
        ctaHref: '/nos-activites',
        posterImage: '/airo-assets/images/pages/home/hero-poster.jpg',
      },
      accroche: rawPages.home.accroche,
      poles: {
        ...rawPages.home.poles,
        items: rawPages.home.poles.items.map((item, i) => ({
          ...item,
          image:
            i === 0
              ? '/airo-assets/images/pages/home/pole-btp.jpg'
              : i === 1
                ? '/airo-assets/images/pages/home/pole-foncier.png'
                : '/airo-assets/images/pages/home/pole-immobilier.jpg',
          href:
            i === 0
              ? '/nos-activites#btp'
              : i === 1
                ? '/nos-activites#foncier'
                : '/nos-activites#immobilier',
        })),
      },
      atouts: rawPages.home.atouts,
      ctaContact: {
        ...rawPages.home.ctaContact,
        ctaHref: '/contact',
      },
      customSections: [],
    },
  },
  'a-propos': {
    pageId: 'a-propos',
    title: 'À propos',
    slug: '/a-propos',
    content: {
      banner: {
        ...rawPages.about.banner,
        image: '/airo-assets/images/pages/about/banner.jpg',
      },
      quiSommesNous: {
        titre: 'Qui sommes-nous ?',
        slogan: '"Construire durablement. Créer de la valeur."',
        paragraphe1:
          "DA-TO GUINÉE SA est une entreprise guinéenne intervenant dans le BTP, le développement foncier et l’immobilier. Nos activités s’inscrivent dans une même dynamique : organiser les espaces, développer les infrastructures et valoriser le potentiel foncier et immobilier.",
        paragraphe2:
          "Nous abordons chaque opération en tenant compte de sa finalité, de ses contraintes techniques et de ses enjeux économiques, avec une attention particulière portée à la qualité de réalisation, à la maîtrise des ressources et à la pérennité des ouvrages.",
        accroche:
          "Notre force : Une maîtrise complète de la chaîne de valeur, allant de l'aménagement des terrains à la valorisation des actifs immobiliers.",
        image: '/assets/images/btp_building_construction_1791408048105.jpg',
        imageAlt: 'Équipe DA-TO Guinée SA sur le terrain et vue de chantier BTP',
      },
      vision: {
        ...rawPages.about.vision,
        image: '/assets/images/vision_urban_btp_1791407884147.jpg',
        imageAlt: 'Vision DA-TO GUINEE SA - Aménagement urbain et infrastructures durables',
      },
      mission: rawPages.about.mission,
      philosophieSection: {
        titre: 'Notre philosophie',
        paragraphe:
          'Nous considérons qu’un projet ne se résume pas à sa réalisation matérielle. Sa pertinence tient également à sa fonctionnalité, à sa qualité d’exécution, à sa capacité à répondre à un besoin et à la valeur qu’il peut générer dans le temps.',
        citation:
          '"C’est cette exigence qui guide notre approche : concevoir avec discernement, réaliser avec rigueur et valoriser dans la durée."',
        image: '/assets/images/chantier_route_btp.jpg',
        imageAlt: 'Chantier de bitumage et construction routière en Guinée - DA-TO GUINEE SA',
      },
      domaines: rawPages.about.domaines,
      approche: rawPages.about.approche,
      engagementCta: {
        eyebrow: 'Construire durablement',
        titre: 'Le projet comme engagement, le territoire comme potentiel',
        texte:
          "Pour DA-TO GUINÉE SA, chaque projet doit produire de l'utilité, de la durabilité et de la valeur pour la Guinée.",
        ctaLabel: 'Découvrir nos activités',
        ctaHref: '/nos-activites',
        image: '/airo-assets/images/pages/about/team-construction.jpg',
      },
      customSections: [],
    },
  },
  'nos-activites': {
    pageId: 'nos-activites',
    title: 'Nos activités',
    slug: '/nos-activites',
    content: {
      banner: {
        ...rawPages.activites.banner,
        image: '/airo-assets/images/pages/activites/banner.jpg',
      },
      intro: {
        titre: 'Trois pôles d’activité. Une même exigence de réalisation.',
        texte:
          'DA-TO GUINÉE SA développe ses activités autour de trois domaines complémentaires : le BTP et les infrastructures, le développement foncier et l’aménagement, ainsi que l’immobilier et la valorisation. Cette organisation permet d’aborder les projets selon leur nature, leurs contraintes et leurs objectifs.',
      },
      btp: {
        ...rawPages.activites.btp,
        images: [
          '/assets/images/btp_building_construction_1791408048105.jpg',
          '/assets/images/road_asphalt_paving_crew_1791411346218.jpg',
          '/assets/images/pont_en_construction.jpg',
        ],
      },
      foncier: {
        ...rawPages.activites.foncier,
        images: [
          '/airo-assets/images/pages/activites/pole-foncier.jpg',
          '/assets/images/amenagement_foncier.jpg',
        ],
      },
      immobilier: {
        ...rawPages.activites.immobilier,
        images: [
          '/airo-assets/images/pages/activites/pole-immobilier.jpg',
          '/airo-assets/images/pages/home/carousel-immobilier.jpg',
        ],
      },
      cta: {
        titre: 'Un projet en tête ?',
        texte:
          'Contactez notre équipe pour discuter de votre projet et découvrir comment nous pouvons vous accompagner.',
        ctaLabel: 'Contactez-nous',
        ctaHref: '/contact',
      },
      customSections: [],
    },
  },
  'nos-projets': {
    pageId: 'nos-projets',
    title: 'Nos projets',
    slug: '/nos-projets',
    content: {
      banner: {
        titre: 'Nos Projets',
        sousTitre: 'Portefeuille d’opérations en BTP, foncier et immobilier',
        image: '/airo-assets/images/pages/activites/banner.jpg',
      },
      intro: {
        eyebrow: 'Réalisations & Chantiers',
        titre: 'Des projets structurants au service du développement territorial',
        texte:
          'Retrouvez ici les projets officiellement publiés par DA-TO GUINÉE SA : chantiers en cours, ouvrages achevés et programmes à venir en République de Guinée.',
      },
      emptyState: {
        titre: 'Portefeuille en cours de mise à jour',
        texte:
          "Aucun projet n'est encore publié dans cette vitrine. Nos équipes publient uniquement des opérations officiellement validées par la direction.",
        ctaLabel: 'Nous contacter pour un projet',
        ctaHref: '/contact',
      },
      customSections: [],
    },
  },
  'notre-approche': {
    pageId: 'notre-approche',
    title: 'Notre approche',
    slug: '/notre-methode',
    content: {
      banner: {
        ...rawPages.methode.banner,
        image: '/airo-assets/images/pages/methode/banner.jpg',
      },
      intro: rawPages.methode.intro,
      etapes: rawPages.methode.etapes,
      conclusionSection: {
        titre: 'Une démarche adaptée à chaque projet',
        texte: rawPages.methode.conclusion,
      },
      ctaSection: {
        titre: 'Un projet livré est un projet réussi.',
        texte:
          'Notre méthode garantit que chaque projet est livré dans les délais, dans le budget et avec la qualité attendue.',
        ctaLabel: 'Discuter de votre projet',
        ctaHref: '/contact',
        image: '/assets/images/project_delivery_success_1791408340290.jpg',
      },
      customSections: [],
    },
  },
  'nos-engagements': {
    pageId: 'nos-engagements',
    title: 'Nos engagements',
    slug: '/engagements-hse',
    content: {
      banner: {
        ...rawPages.engagements.banner,
        image: '/airo-assets/images/pages/engagements/banner.jpg',
      },
      engagements: rawPages.engagements.engagements,
      hse: {
        ...rawPages.engagements.hse,
        image: '/assets/images/professional_site_inspector_ppe_1791409620212.jpg',
        imageAlt: 'Ingénieur de chantier et agent HSE avec EPI complet et harnais - DA-TO GUINEE SA',
      },
      technologie: {
        ...rawPages.engagements.technologie,
        image: '/assets/images/african_engineers_office_digital_1791410135615.jpg',
        imageAlt: 'Ingénieurs africains au bureau travaillant sur les solutions numériques - DA-TO GUINEE SA',
      },
      cta: {
        titre: 'Un projet qui respecte ces engagements ?',
        texte:
          'Contactez-nous pour discuter de votre projet et découvrir comment DA-TO GUINEE SA peut vous accompagner.',
        ctaLabel: 'Contactez-nous',
        ctaHref: '/contact',
      },
      customSections: [],
    },
  },
  actualites: {
    pageId: 'actualites',
    title: 'Actualités',
    slug: '/actualites',
    content: {
      banner: {
        ...rawPages.actualites.banner,
        image: '/airo-assets/images/pages/actualites/banner.jpg',
      },
      articles: rawPages.actualites.articles.map((art, i) => ({
        ...art,
        image:
          i === 0
            ? '/airo-assets/images/pages/actualites/article-immobilier.jpg'
            : i === 1
              ? '/airo-assets/images/pages/actualites/article-viabilisation.jpg'
              : '/airo-assets/images/pages/actualites/article-partenariat.jpg',
      })),
      newsletter: {
        titre: 'Restez informé',
        texte:
          'Suivez nos actualités, projets et réalisations. Contactez-nous pour en savoir plus sur nos activités en Guinée.',
      },
      customSections: [],
    },
  },
  contact: {
    pageId: 'contact',
    title: 'Contact',
    slug: '/contact',
    content: {
      banner: {
        ...rawPages.contact.banner,
        image: '/airo-assets/images/pages/contact/banner.jpg',
      },
      coordonnees: rawPages.contact.coordonnees,
      formulaire: {
        titre: 'Envoyez-nous un message',
        boutonLabel: 'Envoyer le message',
        messageSuccesTitre: 'Message envoyé !',
        messageSuccesTexte: 'Nous vous répondrons dans les meilleurs délais.',
        imageBureau: '/assets/images/contact_office_team_1791410764644.jpg',
        imageBureauAlt: 'Équipe professionnelle DA-TO GUINEE SA à Conakry',
      },
      clients: rawPages.contact.clients,
      contribution: {
        ...rawPages.contact.contribution,
        backgroundImage: '/airo-assets/images/pages/contact/conakry.jpg',
      },
      customSections: [],
    },
  },
};

export const ADMIN_PAGE_LIST: { pageId: SitePageId; label: string; route: string }[] = [
  { pageId: 'accueil', label: 'Accueil', route: '/' },
  { pageId: 'a-propos', label: 'À propos', route: '/a-propos' },
  { pageId: 'nos-activites', label: 'Nos activités', route: '/nos-activites' },
  { pageId: 'nos-projets', label: 'Nos projets', route: '/nos-projets' },
  { pageId: 'notre-approche', label: 'Notre approche', route: '/notre-methode' },
  { pageId: 'nos-engagements', label: 'Nos engagements', route: '/engagements-hse' },
  { pageId: 'actualites', label: 'Actualités', route: '/actualites' },
  { pageId: 'contact', label: 'Contact', route: '/contact' },
];
