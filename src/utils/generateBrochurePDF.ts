export interface BrochureDocument {
  id: string;
  title: string;
  category: string;
  version: string;
  pagesCount: number;
  sizeMB: string;
  imageUrl: string;
  galleryImages: string[];
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  sections: { title: string; content: string[] }[];
}

export const OFFICIAL_CONTACT_INFO = {
  address: 'Conakry, Lambanyi, Carrefour TMI, République de Guinée',
  phone: '+224 628 88 30 30',
  email: 'contact@datoguinee.com',
  website: 'datoguinee.com',
  companyName: 'DA-TO GUINÉE SA',
};

export const BROCHURES_DATA: BrochureDocument[] = [
  {
    id: 'corporate-profile',
    title: 'Plaquette Institutionnelle Groupe',
    category: 'Présentation Générale',
    version: '2026.1',
    pagesCount: 12,
    sizeMB: '3.2 Mo',
    imageUrl: '/assets/images/contact_office_team_1791410764644.jpg',
    galleryImages: [
      '/assets/images/african_engineers_office_digital_1791410135615.jpg',
      '/uploaded-images/hero_btp_engineers_1790975106455.jpg',
    ],
    address: OFFICIAL_CONTACT_INFO.address,
    phone: OFFICIAL_CONTACT_INFO.phone,
    email: OFFICIAL_CONTACT_INFO.email,
    website: OFFICIAL_CONTACT_INFO.website,
    description: 'Document de référence institutionnel détaillant la gouvernance, l’organisation stratégique, la vision d’aménagement du territoire et les capacités globales de DA-TO GUINÉE SA.',
    sections: [
      {
        title: '1. Ancrage Territorial & Identité Institutionnelle',
        content: [
          'DA-TO GUINÉE SA est une Société Anonyme de droit guinéen implantée à Conakry (Lambanyi, Carrefour TMI), spécialisée dans le BTP, le développement foncier et la valorisation immobilière.',
          'Notre ambition majeure : Participer activement à la modernisation durable des infrastructures guinéennes en apportant rigueur technique, maîtrise des coûts et responsabilité sociale.',
          'Une gouvernance structurée associant ingénieurs de travaux, juristes fonciers, experts HSE et gestionnaires de projets expérimentés.',
        ],
      },
      {
        title: '2. Organisation Métier en 3 Pôles d’Excellence',
        content: [
          'Pôle 01 — BTP & Infrastructures : Construction de bâtiments résidentiels, tertiaires et administratifs, réalisation de voiries, ponts, réseaux divers (VRD) et réhabilitation d’ouvrages d’art.',
          'Pôle 02 — Développement Foncier & Aménagement : Prospection, analyse de faisabilité, sécurisation juridique et foncière, travaux de décapage, viabilisation et lotissement structuré.',
          'Pôle 03 — Immobilier & Valorisation : Promotion immobilière, commercialisation de logements et parcelles viabilisées, gestion et valorisation de patrimoine à long terme.',
        ],
      },
      {
        title: '3. Engagement Social, Emploi Local & Politique HSE',
        content: [
          'Politique active de création d’emplois locaux avec plus de 100 collaborateurs et ouvriers qualifiés formés sur le terrain.',
          'Application stricte des directives HSE (Hygiène, Sécurité, Environnement) visant l’objectif zéro accident et la préservation de l’écosystème guinéen.',
        ],
      },
    ],
  },
  {
    id: 'pole-btp',
    title: 'Dossier Technique — BTP & Infrastructures',
    category: 'Spécifications Pôle 1',
    version: '2026.1',
    pagesCount: 10,
    sizeMB: '2.8 Mo',
    imageUrl: '/assets/images/chantier_route_btp.jpg',
    galleryImages: [
      '/assets/images/road_asphalt_paving_crew_1791411346218.jpg',
      '/assets/images/pont_en_construction.jpg',
    ],
    address: OFFICIAL_CONTACT_INFO.address,
    phone: OFFICIAL_CONTACT_INFO.phone,
    email: OFFICIAL_CONTACT_INFO.email,
    website: OFFICIAL_CONTACT_INFO.website,
    description: 'Spécifications techniques complètes, normes de calcul des bétons, procédés d’exécution des chaussées, réseaux VRD et suivi de chantier BTP.',
    sections: [
      {
        title: '1. Génie Civil & Construction de Bâtiments',
        content: [
          'Gros œuvre et second œuvre : fondations profondes, structures en béton armé conformes aux normes BAEL/Eurocodes, superstructures et finitions haute exigence.',
          'Domaines : Immeubles résidentiels, complexes commerciaux, sièges administratifs et bâtiments industriels.',
          'Contrôle systématique de la qualité des agrégats, des ciments et des armatures en acier galvanisé ou haute adhérence.',
        ],
      },
      {
        title: '2. VRD, Terrassement & Infrastructures Routières',
        content: [
          'Terrassement général : décapage, déblais/remblais, compactage contrôlé et stabilisation des sols par géotextile.',
          'Réseaux divers : Pose de buses d’assainissement, caniveaux préfabriqués en béton armé, chambres de visite et réseaux d’adduction d’eau pluviale/usée.',
          'Revêtements : Pose d’enrobé à chaud, goudronnage, chaussées pavées à forte durabilité et signalisation routière.',
        ],
      },
      {
        title: '3. Parc Équipements & Méthodologie d’Exécution',
        content: [
          'Mobilisation de compacteurs tandem, pelles hydrauliques, finisseurs de chaussée, camions bennes et centrales à béton sur site.',
          'Méthodologie en 7 étapes : Comprendre, Étudier, Concevoir, Planifier, Exécuter, Contrôler et Livrer avec procès-verbal de réception.',
        ],
      },
    ],
  },
  {
    id: 'pole-foncier',
    title: 'Guide Technique — Foncier & Aménagement',
    category: 'Guide Pratique Pôle 2',
    version: '2026.1',
    pagesCount: 8,
    sizeMB: '2.1 Mo',
    imageUrl: '/assets/images/amenagement_foncier.jpg',
    galleryImages: [
      '/airo-assets/images/pages/activites/pole-foncier.jpg',
      '/uploaded-images/hero_land_survey_1790975129590.jpg',
    ],
    address: OFFICIAL_CONTACT_INFO.address,
    phone: OFFICIAL_CONTACT_INFO.phone,
    email: OFFICIAL_CONTACT_INFO.email,
    website: OFFICIAL_CONTACT_INFO.website,
    description: 'Processus opérationnel de viabilisation des sols, levés topographiques, bornage contradictoire et viabilisation des lotissements en Guinée.',
    sections: [
      {
        title: '1. Audit & Traçabilité Juridique du Foncier',
        content: [
          'Diagnostic préalable : vérification systématique des titres de propriété, des plans cadastraux et de l’historique auprès des autorités domaniales.',
          'Bornage contradictoire et sécurisation des limites géographiques avec pose de bornes agréées.',
        ],
      },
      {
        title: '2. Travaux d’Aménagement & Décapage des Site',
        content: [
          'Décapage de la couche végétale, reprofilage des voies d’accès et terrassement des zones destinées aux futurs ouvrages.',
          'Création du maillage de voies de circulation internes avec réservation des emprises pour l’électricité et l’eau potable.',
        ],
      },
      {
        title: '3. Lotissement Structuré & Valeur à Long Terme',
        content: [
          'Découpage cohérent des parcelles assurant accessibilité, drainage pluvial naturel et valorisation foncière immédiate.',
        ],
      },
    ],
  },
  {
    id: 'pole-immobilier',
    title: 'Catalogue Immobilier & Valorisation d’Actifs',
    category: 'Catalogue Pôle 3',
    version: '2026.1',
    pagesCount: 9,
    sizeMB: '2.5 Mo',
    imageUrl: '/airo-assets/images/pages/activites/pole-immobilier.jpg',
    galleryImages: [
      '/uploaded-images/hero_real_estate_1790975118410.jpg',
      '/airo-assets/images/pages/home/carousel-immobilier.jpg',
    ],
    address: OFFICIAL_CONTACT_INFO.address,
    phone: OFFICIAL_CONTACT_INFO.phone,
    email: OFFICIAL_CONTACT_INFO.email,
    website: OFFICIAL_CONTACT_INFO.website,
    description: 'Programmes de promotion immobilière, offre de parcelles viabilisées, gestion locative et stratégie d’optimisation patrimoniale.',
    sections: [
      {
        title: '1. Promotion & Programmes Immobiliers',
        content: [
          'Conception et réalisation de résidences modernes, appartements et villas d’architecte adaptés aux réalités climatiques de Conakry.',
          'Choix d’emplacements stratégiques bénéficiant de voies d’accès praticables et de la proximité des commodités urbaines.',
        ],
      },
      {
        title: '2. Commercialisation & Vente de Parcelles',
        content: [
          'Vente de parcelles viabilisées sécurisées avec documentation administrative transparente.',
          'Accompagnement personnalisé des acquéreurs dans la concrétisation de leur projet de construction.',
        ],
      },
      {
        title: '3. Valorisation & Gestion de Patrimoine',
        content: [
          'Optimisation de l’usage, du coût et du potentiel de plus-value immobilière à long terme pour chaque actif.',
        ],
      },
    ],
  },
  {
    id: 'charte-hse',
    title: 'Manuel HSE & Sécurité des Chantiers',
    category: 'Normes & Protection',
    version: '2026.1',
    pagesCount: 6,
    sizeMB: '1.9 Mo',
    imageUrl: '/assets/images/professional_site_inspector_ppe_1791409620212.jpg',
    galleryImages: [
      '/uploaded-images/hse_safety_team_1790975150296.jpg',
      '/assets/images/worker_ppe_harness_1791408931536.jpg',
    ],
    address: OFFICIAL_CONTACT_INFO.address,
    phone: OFFICIAL_CONTACT_INFO.phone,
    email: OFFICIAL_CONTACT_INFO.email,
    website: OFFICIAL_CONTACT_INFO.website,
    description: 'Guide des protocoles de sécurité, équipements de protection individuelle (EPI), gestion des déchets et mesures environnementales.',
    sections: [
      {
        title: '1. Équipements de Protection Individuelle (EPI)',
        content: [
          'Casque de sécurité certifié, gilet rétro-réfléchissant haute visibilité, chaussures de sécurité montantes et lunettes de protection obligatoires.',
          'Harnais antichute avec absorbeur d’énergie pour tout travail en hauteur au-delà de 2 mètres.',
        ],
      },
      {
        title: '2. Causeries Sécurité & Contrôle des Risques',
        content: [
          'Briefing quotidien de sécurité avant la prise de poste (Quart d’heure HSE).',
          'Inspecteurs HSE dédiés sur chaque chantier assurant le respect des périmètres de sécurité et la maintenance du matériel.',
        ],
      },
      {
        title: '3. Charte Environnementale & Gestion des Déchets',
        content: [
          'Collecte sélective et évacuation contrôlée des gravats et produits résiduels.',
          'Protection stricte des sols contre les fuites d’hydrocarbures et préservation des réseaux d’assainissement naturels.',
        ],
      },
    ],
  },
];

export function downloadBrochurePDF(doc: BrochureDocument) {
  const origin = window.location.origin;
  const fullImgUrl = doc.imageUrl.startsWith('http') ? doc.imageUrl : `${origin}${doc.imageUrl}`;
  const galleryHtml = doc.galleryImages
    .map((img) => {
      const fullUrl = img.startsWith('http') ? img : `${origin}${img}`;
      return `<div class="gallery-item"><img src="${fullUrl}" alt="${doc.title}" /></div>`;
    })
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>${doc.title} — DA-TO GUINÉE SA</title>
      <style>
        @page { size: A4; margin: 12mm; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.5; margin: 0; padding: 10px; background: #ffffff; }
        
        .header { border-bottom: 3px solid #F5A623; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
        .brand-title { font-size: 24px; font-weight: 900; color: #0B2C5C; letter-spacing: 1px; }
        .brand-sub { font-size: 11px; text-transform: uppercase; color: #F5A623; font-weight: bold; margin-top: 2px; }
        .doc-category { font-size: 10px; font-weight: bold; background: #0B2C5C; color: #ffffff; padding: 5px 10px; border-radius: 4px; text-transform: uppercase; display: inline-block; }
        
        .hero-banner { margin-bottom: 16px; border-radius: 8px; overflow: hidden; height: 160px; position: relative; border: 1px solid #cbd5e1; }
        .hero-banner img { width: 100%; height: 100%; object-fit: cover; }
        
        .gallery-grid { display: flex; gap: 10px; margin-bottom: 16px; }
        .gallery-item { flex: 1; height: 100px; border-radius: 6px; overflow: hidden; border: 1px solid #cbd5e1; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; }
        
        .doc-title { font-size: 20px; color: #0B2C5C; font-weight: 800; margin: 10px 0 4px 0; }
        .doc-meta { font-size: 10.5px; color: #64748b; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        
        .intro-box { background: #f8fafc; border-left: 4px solid #F5A623; padding: 10px 14px; margin-bottom: 18px; font-size: 12px; color: #334155; border-radius: 0 6px 6px 0; }
        .section-title { font-size: 13px; font-weight: bold; color: #0B2C5C; border-bottom: 1.5px solid #0B2C5C; padding-bottom: 3px; margin-top: 14px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        
        ul { margin: 0 0 12px 18px; padding: 0; font-size: 11.5px; }
        li { margin-bottom: 5px; color: #334155; }
        
        .seal-box { margin-top: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
        .contact-card { background: #f1f5f9; padding: 10px 14px; border-radius: 6px; font-size: 10.5px; color: #1e293b; border: 1px solid #cbd5e1; width: 62%; }
        .contact-card strong { color: #0B2C5C; }
        
        .seal-badge { border: 2px solid #0B2C5C; color: #0B2C5C; padding: 8px 12px; font-weight: bold; font-size: 9.5px; text-transform: uppercase; letter-spacing: 1px; text-align: center; border-radius: 4px; background: #fafafa; }
        
        .footer { margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 10px; font-size: 9px; color: #64748b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand-title">DA-TO GUINÉE SA</div>
          <div class="brand-sub">BTP · Développement Foncier · Immobilier</div>
        </div>
        <div>
          <span class="doc-category">${doc.category}</span>
        </div>
      </div>

      <div class="hero-banner">
        <img src="${fullImgUrl}" alt="${doc.title}" />
      </div>

      <div class="gallery-grid">
        ${galleryHtml}
      </div>

      <div class="doc-title">${doc.title}</div>
      <div class="doc-meta">Catalogue Officiel Groupe DA-TO GUINÉE SA — Version ${doc.version} | ${doc.address}</div>

      <div class="intro-box">
        <strong>Synthèse & Cadrage :</strong> ${doc.description}
      </div>

      ${doc.sections
        .map(
          (sec) => `
        <div class="section-title">${sec.title}</div>
        <ul>
          ${sec.content.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      `
        )
        .join('')}

      <div class="seal-box">
        <div class="contact-card">
          <strong>Siège Social DA-TO GUINÉE SA</strong><br/>
          Adresse : ${doc.address}<br/>
          Tél : ${doc.phone} | Email : ${doc.email}<br/>
          Site Web Officiel : ${doc.website}
        </div>

        <div class="seal-badge">
          Document Conforme & Certifié<br/>
          <span style="font-size: 8px; color: #64748b; font-weight: normal;">DA-TO GUINÉE SA — Conakry</span>
        </div>
      </div>

      <div class="footer">
        DA-TO GUINÉE SA — Adresse : ${doc.address} | Tél : ${doc.phone} | Email : ${doc.email} | Web : ${doc.website}
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 400);
        };
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}
