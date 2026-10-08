import { 
  ActivityPole, 
  WhyChooseUsItem, 
  TimelineStep, 
  HseCommitment, 
  Article 
} from '../types';

export const HERO_SLIDES = [
  {
    id: 'btp',
    image: '/uploaded-images/hero_btp_engineers_1790975106455.jpg',
    category: 'Génie Civil & BTP en Guinée',
    title: 'Construire durablement. Créer de la valeur.',
    subtitle: 'Expertise technique de pointe pour les grands chantiers d’infrastructures, bâtiments tertiaires et voiries urbaines à Conakry et en provinces.',
  },
  {
    id: 'foncier',
    image: '/uploaded-images/hero_land_survey_1790975129590.jpg',
    category: 'Développement Foncier & Aménagement',
    title: 'Aménager le territoire guinéen avec rigueur.',
    subtitle: 'Sécurisation juridique rigoureuse, topographie géospatiale de pointe et viabilisation intégrale pour des lotissements modernes et durables.',
  },
  {
    id: 'immobilier',
    image: '/uploaded-images/hero_real_estate_1790975118410.jpg',
    category: 'Immobilier & Valorisation d’Actifs',
    title: 'Bâtir des cadres de vie d’exception.',
    subtitle: 'Conception, promotion et gestion patrimoniale de résidences modernes et de complexes commerciaux à haute rentabilité patrimoniale.',
  },
];

export const ACTIVITY_POLES: ActivityPole[] = [
  {
    id: 'btp-infrastructures',
    title: 'BTP & Infrastructures',
    shortTitle: 'BTP & Génie Civil',
    tagline: 'Ouvrages d’art, routes et bâtiments industriels pérennes',
    description: 'Le pôle BTP & Infrastructures de DA-TO GUINEE SA pilote la conception et l’exécution de projets structurants sur l’ensemble du territoire guinéen. Nous allions rigueur d’ingénierie, conformité aux normes internationales et maîtrise stricte des délais d’exécution.',
    image: '/assets/images/btp_building_construction_1791408048105.jpg',
    accentColor: '#0B2C5C',
    services: [
      'Génie civil lourd et terrassements de grande masse',
      'Voiries et Réseaux Divers (VRD), assainissement pluvial et caniveaux bétonnés',
      'Construction de bâtiments industriels, entrepôts logistiques et bureaux tertiaires',
      'Ouvrages d’art, dalots hydrauliques, ponts et radiers de franchissement',
      'Rénovation lourde et réhabilitation de structures d’envergure',
      'Contrôle technique géotechnique et essais laboratoire béton/sols'
    ],
    keyFigures: [
      { label: 'Projets livrés', value: '120+' },
      { label: 'Taux de conformité', value: '100%' },
      { label: 'Matériel en régie', value: '35+ engins' }
    ]
  },
  {
    id: 'developpement-foncier',
    title: 'Développement Foncier & Aménagement',
    shortTitle: 'Développement Foncier',
    tagline: 'Sécurisation, viabilisation et aménagement de réserves foncières',
    description: 'DA-TO GUINEE SA est un acteur de référence dans la sécurisation juridique et l’aménagement d’espaces fonciers en République de Guinée. De la levée topographique par drone à la viabilisation complète en eau, énergie et voirie, nous transformons des terrains bruts en actifs viabilisés de haute qualité.',
    image: '/uploaded-images/hero_land_survey_1790975129590.jpg',
    accentColor: '#F5A623',
    services: [
      'Bornage contradictoire, levés topographiques haute précision (RTK/Drones)',
      'Sécurisation juridique, audit de titres et immatriculation foncière (TF)',
      'Décapage, terrassement de plateformes et nivellement de terrains',
      'Viabilisation technique intégrée : adduction d’eau potable et réseaux d’électricité',
      'Création et ouverture de voiries d’accès bitumées ou en pavés autobloquants',
      'Aménagement de lotissements résidentiels et zones d’activités économiques'
    ],
    keyFigures: [
      { label: 'Hectares aménagés', value: '450 ha' },
      { label: 'Titres sécurisés', value: '1 200+' },
      { label: 'Réseaux déployés', value: '80+ km' }
    ]
  },
  {
    id: 'immobilier-valorisation',
    title: 'Immobilier & Valorisation',
    shortTitle: 'Immobilier & Promotion',
    tagline: 'Promotion de standing et optimisation d’investissements',
    description: 'Notre pôle Immobilier développe des projets architecturaux modernes respectueux de l’environnement guinéen. Nous concevons, construisons et administrons des résidences contemporaines, des immeubles de standing et accompagnons les investisseurs dans la valorisation maximale de leur portefeuille.',
    image: '/uploaded-images/hero_real_estate_1790975118410.jpg',
    accentColor: '#1F7A3A',
    services: [
      'Promotion immobilière résidentielle haut de standing et intermédiaire',
      'Développement d’immeubles de bureaux modernes et centres d’affaires',
      'Gestion locative, syndic de copropriété et maintenance technique',
      'Conseil en investissement immobilier et montages de financements',
      'Valorisation et restructuration d’actifs immobiliers existants',
      'Études de rentabilité foncière et programmation immobilière'
    ],
    keyFigures: [
      { label: 'Logements conçus', value: '380+' },
      { label: 'Taux d’occupation', value: '96%' },
      { label: 'Rendement moyen', value: '11.8%' }
    ]
  }
];

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: 'qualite',
    title: 'Excellence Technique',
    keyword: 'Qualité',
    description: 'Une stricte conformité aux normes internationales de construction, appuyée par des essais systématiques en laboratoire et des matériaux certifiés.',
    iconName: 'Award'
  },
  {
    id: 'durabilite',
    title: 'Impact Éco-responsable',
    keyword: 'Durabilité',
    description: 'Des ouvrages conçus pour résister au climat tropical guinéen, intégrant gestion des eaux, efficacité énergétique et préservation des écosystèmes.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'maitrise',
    title: 'Rigueur & Délais',
    keyword: 'Maîtrise',
    description: 'Un pilotage d’ingénierie intégré garantissant le respect rigoureux des budgets initiaux, des plannings d’exécution et des engagements contractuels.',
    iconName: 'Target'
  },
  {
    id: 'valeur',
    title: 'Rentabilité Tangible',
    keyword: 'Valeur',
    description: 'Création d’actifs durables à forte plus-value pour nos clients institutionnels, investisseurs privés et les collectivités guinéennes.',
    iconName: 'TrendingUp'
  }
];

export const GUINEA_CONTRIBUTION_STATS = [
  {
    value: 120,
    suffix: '+',
    label: 'Projets d’infrastructures & BTP livrés',
    subtext: 'Bâtiments, routes, ouvrages d’art en Guinée'
  },
  {
    value: 450,
    suffix: ' ha',
    label: 'Réserves foncières aménagées',
    subtext: 'Terrains sécurisés, viabilisés et valorisés'
  },
  {
    value: 850,
    suffix: '+',
    label: 'Emplois locaux créés et valorisés',
    subtext: 'Ingénieurs, techniciens et artisans formés'
  },
  {
    value: 99.4,
    suffix: '%',
    label: 'Indice de conformité & sécurité HSE',
    subtext: 'Zéro accident majeur sur nos chantiers'
  }
];

export const VALUE_CHAIN_STEPS = [
  { id: '1', name: 'FONCIER', desc: 'Identification, audit juridique et sécurisation de réserves territoriales stratégiques.' },
  { id: '2', name: 'AMÉNAGEMENT', desc: 'Conception urbaine, master plan, topographie géoréférencée et bornage.' },
  { id: '3', name: 'VIABILISATION', desc: 'Terrassement, VRD, adduction d’eau, électrification et réseaux pluviaux.' },
  { id: '4', name: 'CONSTRUCTION', desc: 'Génie civil, gros œuvre et second œuvre aux standards internationaux.' },
  { id: '5', name: 'PROMOTION', desc: 'Commercialisation, valorisation de lots et commercialisation de programmes.' },
  { id: '6', name: 'GESTION', desc: 'Syndic, maintenance technique et gestion locative institutionnelle.' },
  { id: '7', name: 'VALORISATION', desc: 'Optimisation patrimoniale continue et plus-value sur le long terme.' }
];

export const ABOUT_INTERVENTION_DOMAINS = [
  {
    title: 'Génie Civil & Infrastructures Routières',
    desc: 'Ouvrages de franchissement, voiries urbaines en bitume et pavés, plateformes industrielles adaptées à la saison des pluies.',
    icon: 'HardHat'
  },
  {
    title: 'Bâtiments Résidentiels & Tertiaires',
    desc: 'Immeubles de standing, sièges d’entreprises, complexes hôteliers et résidences privées sécurisées.',
    icon: 'Building2'
  },
  {
    title: 'Aménagement de Zones Résidentielles',
    desc: 'Conception de quartiers modernes dotés de voiries dimensionnées, d’espaces verts et d’équipements publics.',
    icon: 'Trees'
  },
  {
    title: 'Sécurisation Foncier & Géomatique',
    desc: 'Levés par drone RTK, immatriculation foncière, constitution de dossiers de Titre Foncier (TF) inattaquables.',
    icon: 'MapPin'
  },
  {
    title: 'Voiries et Réseaux Divers (VRD)',
    desc: 'Caniveaux bétonnés, dalots, réseaux enterrés d’eau potable, bassins d’orage et éclairage public solaire.',
    icon: 'Layers'
  },
  {
    title: 'Gestion de Patrimoine & Syndic',
    desc: 'Préservation des actifs bâtis, maintenance préventive, exploitation technique et relation locataires de premier ordre.',
    icon: 'Briefcase'
  },
  {
    title: 'Ingénierie Géotechnique & Essais Sols',
    desc: 'Sondages pressiométriques, carottages, essais Proctor et formulations de bétons haute performance.',
    icon: 'CheckCircle2'
  },
  {
    title: 'Conseil en Investissement & Partenariats',
    desc: 'Structuration de partenariats public-privé (PPP), études d’opportunités foncières et modélisation de cash-flows.',
    icon: 'BarChart3'
  }
];

export const METHOD_TIMELINE: TimelineStep[] = [
  {
    number: '01',
    title: 'Comprendre',
    shortDesc: 'Écoute active, cadrage stratégique et diagnostic territorial initial.',
    description: 'Chaque projet commence par une immersion complète dans vos objectifs et les réalités du site. Nous analysons l’environnement physique, social et réglementaire en Guinée pour fixer un cadre d’intervention sur-mesure.',
    deliverables: ['Note de cadrage stratégique', 'Analyse contextuelle du site', 'Matrice d’identification des risques'],
    tools: ['Visites de reconnaissance terrain', 'Entretiens avec les parties prenantes', 'Enquêtes de voisinage']
  },
  {
    number: '02',
    title: 'Étudier',
    shortDesc: 'Études géotechniques approfondies, cadrage juridique et faisabilité économique.',
    description: 'Nos ingénieurs et juristes fonciers réalisent les sondages géologiques indispensables et vérifient la traçabilité des titres fonciers. Cette rigueur initiale élimine tout aléa futur.',
    deliverables: ['Rapport géotechnique G1/G2', 'Audit juridique du titre foncier', 'Bilan de faisabilité financière'],
    tools: ['Pénétromètres et carottiers', 'Stations totales de précision', 'Recherches à la conservation foncière']
  },
  {
    number: '03',
    title: 'Concevoir',
    shortDesc: 'Modélisation architecturale, plans d’exécution et calculs de structures.',
    description: 'Nous concevons des plans optimisés pour le climat tropical de Conakry et des régions guinéennes : ventilation naturelle, isolation thermique, résistance structurelle et gestion des eaux.',
    deliverables: ['Plans d’architecture 2D/3D', 'Notes de calcul de structure BAEL/Eurocodes', 'Cahier des clauses techniques particulières'],
    tools: ['Modélisation BIM 3D', 'Logiciels d’analyse structurale', 'Simulations d’écoulement hydrologique']
  },
  {
    number: '04',
    title: 'Planifier',
    shortDesc: 'Ordonnancement rigoureux, logistique d’approvisionnement et plan HSE.',
    description: 'Une planification au cordeau tenant compte des cycles saisonniers (hivernage guinéen) et de la sécurisation des approvisionnements en ciment, aciers et granulats certifiés.',
    deliverables: ['Planning directeur Gantt détaillé', 'Plan d’Assurance Qualité (PAQ)', 'Plan Particulier de Sécurité et Santé (PPSPS)'],
    tools: ['Logiciels de gestion de projets', 'Protocoles de sécurisation des stocks', 'Cartographie des flux logistiques']
  },
  {
    number: '05',
    title: 'Exécuter',
    shortDesc: 'Mobilisation d’équipes expertes, engins de pointe et pilotage direct.',
    description: 'Déploiement sur site de notre parc matériel et d’encadrements techniques chevronnés. Réunions de chantier hebdomadaires, suivi rigoureux de chaque coulage et traçabilité totale.',
    deliverables: ['Comptes-rendus hebdomadaires avec photos', 'Fiches de contrôle des réceptions partielles', 'Journal de bord de chantier'],
    tools: ['Engins de terrassement et grues', 'Topographie temps réel GPS-RTK', 'Laboratoire mobile d’essais béton']
  },
  {
    number: '06',
    title: 'Contrôler',
    shortDesc: 'Audits de conformité, essais en laboratoire et supervision continue.',
    description: 'Aucune approximation n’est tolérée. Chaque composant est testé : écrasement d’éprouvettes béton à 7 et 28 jours, compacité des remblais, étanchéité des réseaux pluviaux.',
    deliverables: ['Certificats d’essais mécaniques', 'Rapports d’audit de sécurité HSE', 'Procès-verbaux de contrôle non destructif'],
    tools: ['Presses d’écrasement certifiées', 'Contrôles dimensionnels laser', 'Inspections par caméras endoscopiques']
  },
  {
    number: '07',
    title: 'Livrer',
    shortDesc: 'Réception finale, remise des dossiers d’ouvrages exécutés et accompagnement.',
    description: 'Livraison dans les règles de l’art sans réserves. Remise de l’ensemble des plans de recollement et activation de nos garanties contractuelles avec un SAV d’ingénierie réactif.',
    deliverables: ['Procès-verbal de réception sans réserves', 'Dossier des Ouvrages Exécutés (DOE complet)', 'Attestations de garanties de parfait achèvement'],
    tools: ['Plans de recollement DAO/BIM', 'Guide d’entretien et d’exploitation du bâtiment', 'Assistance technique post-livraison']
  }
];

export const HSE_COMMITMENTS: HseCommitment[] = [
  {
    id: 'zero-accident',
    title: 'Sécurité Zéro Compromis',
    description: 'Port obligatoire de l’ensemble des Équipements de Protection Individuelle (EPI certifiés), balisage strict des zones à risque et formation continue des ouvriers.',
    iconName: 'ShieldAlert',
    badge: 'Priorité Absolue'
  },
  {
    id: 'environnement',
    title: 'Préservation des Écosystèmes',
    description: 'Gestion responsable des déblais, limitation drastique des rejets polluants, bassins de rétention et reboisement systématique des abords de lotissements.',
    iconName: 'Leaf',
    badge: 'Éco-Action'
  },
  {
    id: 'capital-humain',
    title: 'Valorisation du Savoir-Faire Guinéen',
    description: 'Recrutement prioritaire de talents locaux, programmes de tutorat d’ingénieurs guinéens et respect scrupuleux du code du travail de la République de Guinée.',
    iconName: 'Users',
    badge: 'Ancrage Local'
  },
  {
    id: 'securite-juridique',
    title: 'Transparence & Intégrité Foncière',
    description: 'Vérification sans concession des titres de propriété foncière auprès des services domaniaux et cadastraux pour prémunir nos clients de tout litige.',
    iconName: 'FileCheck',
    badge: 'Conformité 100%'
  },
  {
    id: 'materiaux-certifies',
    title: 'Contrôle des Matériaux & Normes ISO',
    description: 'Sélection rigoureuse des aciers FE E500, ciments haute résistance CEM II et granulats lavés, avec traçabilité complète des bordereaux d’approvisionnement.',
    iconName: 'Boxes',
    badge: 'Certification'
  },
  {
    id: 'dialogue-social',
    title: 'Responsabilité Sociétale (RSE)',
    description: 'Concertation proactive avec les chefferies locales et les communautés riveraines pour garantir une cohabitation harmonieuse durant les travaux.',
    iconName: 'HeartHandshake',
    badge: 'Impact Social'
  },
  {
    id: 'innovation-climat',
    title: 'Adaptation au Climat Tropical',
    description: 'Dimensionnement renforcé des évacuations des eaux pluviales face aux fortes précipitations côtières de Conakry et choix de revêtements anti-corrosion saline.',
    iconName: 'SunMedium',
    badge: 'Ingénierie Durable'
  }
];

export const ARTICLES_DEMO: Article[] = [
  {
    id: 'inauguration-lotissement-conakry',
    title: 'Développement foncier : Lancement du nouveau pôle résidentiel viabilisé dans le Grand Conakry',
    date: '28 Septembre 2026',
    category: 'Aménagement Foncier',
    readTime: '4 min',
    summary: 'DA-TO GUINEE SA franchit une étape majeure dans l’urbanisation durable avec la viabilisation intégrale d’un lotissement moderne de 35 hectares, doté de voiries pavées et d’électrification solaire.',
    image: '/uploaded-images/hero_real_estate_1790975118410.jpg',
    quote: '« Notre ambition est d’offrir aux familles et aux investisseurs guinéens des terrains avec une sécurité juridique absolue et un niveau d’équipement digne des standards internationaux. »',
    content: [
      'Face à la croissance démographique et urbaine rapide de l’agglomération de Conakry, DA-TO GUINEE SA a inauguré la première phase d’un programme d’aménagement novateur. Ce projet intègre dès sa genèse l’ensemble des réseaux primaires et secondaires indispensables au confort des résidents.',
      'Grâce à nos équipes de géomètres-experts et à l’utilisation de drones de cartographie géospatiale, l’ensemble des parcelles bénéficie d’un bornage contradictoire inaltérable et d’un statut foncier validé par les autorités compétentes.',
      'Les travaux comprennent également la réalisation de 12 kilomètres de voiries internes maçonnées, la pose de canalisations en béton armé pour l’évacuation des eaux pluviales et l’installation d’un réseau d’éclairage public autonome à haute efficacité énergétique.'
    ]
  },
  {
    id: 'infrastructure-routiere-vrd',
    title: 'Génie civil : DA-TO GUINEE SA achève avec succès un tronçon routier stratégique et ses ouvrages d’art',
    date: '14 Août 2026',
    category: 'BTP & Infrastructures',
    readTime: '5 min',
    summary: 'Les équipes travaux de DA-TO GUINEE SA ont réceptionné sans réserves un important chantier de désenclavement économique combinant terrassement rocheux, dalots hydrauliques et revêtement haute durabilité.',
    image: '/uploaded-images/hero_btp_engineers_1790975106455.jpg',
    quote: '« La résistance d’une infrastructure en Guinée repose sur la maîtrise de l’eau. Nos ouvrages d’art sont calibrés pour résister aux crues décennales les plus intenses. »',
    content: [
      'Mobilisant plus de 25 engins lourds et une cinquantaine de techniciens et compagnons spécialisés, ce chantier s’est distingué par une organisation logistique exemplaire durant la saison des pluies.',
      'Les études géotechniques préliminaires ont permis de stabiliser les talus à l’aide de gabions renforcés et d’implanter trois ouvrages de franchissement en béton armé calculés selon les normes les plus exigeantes.',
      'La réception des travaux a été saluée par les partenaires institutionnels pour le respect rigoureux du calendrier contractuel et l’absence totale d’accidents de travail sur les 180 jours d’intervention.'
    ]
  },
  {
    id: 'bilan-hse-excellence-securite',
    title: 'Engagements & RSE : Bilan annuel sécurité et formation continue de nos techniciens de chantier',
    date: '05 Juillet 2026',
    category: 'Engagements & HSE',
    readTime: '3 min',
    summary: 'Avec plus de 450 000 heures de travail cumulées sans accident majeur, DA-TO GUINEE SA réaffirme sa politique volontariste en matière de santé, sécurité et promotion des compétences guinéennes.',
    image: '/uploaded-images/hse_safety_team_1790975150296.jpg',
    quote: '« La performance technique d’un chantier n’a de valeur que si elle garantit le retour de chaque travailleur sain et sauf auprès des siens chaque soir. »',
    content: [
      'Lors de la journée d’entreprise organisée à Conakry, la direction de DA-TO GUINEE SA a remis les diplômes de certification interne HSE à une trentaine de chefs de chantier et ouvriers spécialisés.',
      'Ce programme s’inscrit dans un plan pluriannuel de montée en compétences axé sur le travail en hauteur, la manipulation des engins de terrassement et les gestes de premiers secours en milieu isolé.',
      'En parallèle, de nouvelles dotations d’équipements de sécurité innovants et thermo-ventilés ont été attribuées aux équipes de terrain pour conjuguer protection maximale et ergonomie sous le climat tropical.'
    ]
  }
];

export const CONTACT_COORDINATES = {
  address: 'Lambanyi Carrefour TMI, Conakry, République de Guinée',
  phone1: '+224 628 88 30 30',
  phone2: '+224 628 88 30 30',
  email: 'contact@datoguinee.com',
  emailDevis: 'contact@datoguinee.com',
  hours: 'Lundi au Vendredi : 08h00 - 17h00 | Samedi : 09h00 - 13h00 (sur rendez-vous)',
  coordinates: {
    lat: 9.5092,
    lng: -13.7122,
    city: 'Conakry',
    country: 'Guinée'
  },
  socialLinks: [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', followers: '5,2k abonnés' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', followers: '18k abonnés' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', followers: 'Chaîne officielle' },
    { name: 'TikTok', url: 'https://tiktok.com', icon: 'Share2', followers: 'Vidéos de chantiers' },
    { name: 'Twitter / X', url: 'https://twitter.com', icon: 'Twitter', followers: 'Actualités directes' }
  ]
};
