export const pages = {
  "about": (schemas.pages?.about ?? schemas.about ?? identity).parse({
  "banner": {
    "titre": "À Propos",
    "sousTitre": "Qui sommes-nous ?"
  },
  "vision": {
    "eyebrow": "Notre Vision",
    "texte": "Nous voulons participer à la construction d'une Guinée où les infrastructures, les espaces urbains et les projets immobiliers sont pensés pour répondre aux besoins réels des populations et de l'économie. Un projet réussi ne se limite pas à ce qui est construit. Il se mesure à la valeur qu'il crée et à sa capacité à durer."
  },
  "mission": {
    "eyebrow": "Notre Mission",
    "texte": "Concevoir, aménager, construire et valoriser des projets et infrastructures adaptés aux besoins de nos clients et aux réalités de leur environnement."
  },
  "domaines": {
    "eyebrow": "Nos Domaines d'Intervention",
    "items": [
      {
        "id": "d1",
        "texte": "Développer et aménager des terrains"
      },
      {
        "id": "d2",
        "texte": "Réaliser des opérations de lotissement et de viabilisation"
      },
      {
        "id": "d3",
        "texte": "Construire des bâtiments et infrastructures"
      },
      {
        "id": "d4",
        "texte": "Réaliser des travaux d'aménagement et de Voirie et Réseaux Divers (VRD)"
      },
      {
        "id": "d5",
        "texte": "Rénover et réhabiliter des ouvrages existants"
      },
      {
        "id": "d6",
        "texte": "Développer des projets immobiliers"
      },
      {
        "id": "d7",
        "texte": "Commercialiser et valoriser des actifs immobiliers"
      },
      {
        "id": "d8",
        "texte": "Accompagner nos clients dans la réalisation de leurs projets"
      }
    ]
  },
  "approche": {
    "eyebrow": "Notre Approche Intégrée",
    "titre": "De la terre au projet livré",
    "etapes": [
      {
        "id": "e1",
        "label": "Foncier"
      },
      {
        "id": "e2",
        "label": "Aménagement"
      },
      {
        "id": "e3",
        "label": "Viabilisation"
      },
      {
        "id": "e4",
        "label": "Construction"
      },
      {
        "id": "e5",
        "label": "Promotion"
      },
      {
        "id": "e6",
        "label": "Gestion"
      },
      {
        "id": "e7",
        "label": "Valorisation"
      }
    ]
  },
  "philosophie": {
    "eyebrow": "Notre Philosophie",
    "lignes": [
      {
        "id": "p1",
        "texte": "Construire avec davantage de préparation."
      },
      {
        "id": "p2",
        "texte": "Construire avec davantage de maîtrise."
      },
      {
        "id": "p3",
        "texte": "Construire avec davantage de transparence."
      },
      {
        "id": "p4",
        "texte": "Construire avec davantage de responsabilité."
      }
    ],
    "conclusion": "Pour DA-TO, le développement immobilier ne doit pas uniquement produire des bâtiments ou des terrains. Il doit produire de l'utilité, de la durabilité et de la valeur."
  }
}),
  "activites": (schemas.pages?.activites ?? schemas.activites ?? identity).parse({
  "banner": {
    "titre": "Nos Activités",
    "sousTitre": "Trois pôles d'expertise au service de vos projets"
  },
  "btp": {
    "eyebrow": "Pôle 1",
    "titre": "BTP & Infrastructures",
    "intro": "Le BTP constitue l'un des principaux domaines d'intervention de DA-TO. Nous développons et réalisons des projets de construction et d'infrastructures en recherchant un équilibre entre qualité, fonctionnalité, coût, délai et durabilité.",
    "objectif": "Faire de chaque chantier un projet maîtrisé, depuis sa préparation jusqu'à sa livraison.",
    "services": [
      {
        "id": "btp1",
        "titre": "Construction de bâtiments",
        "desc": "Résidentiels, commerciaux, administratifs, professionnels, ouvrages et infrastructures diverses."
      },
      {
        "id": "btp2",
        "titre": "Travaux publics",
        "desc": "Terrassement, préparation et aménagement des sites, voiries, réseaux divers, ouvrages d'assainissement, aménagements extérieurs, infrastructures associées aux projets."
      },
      {
        "id": "btp3",
        "titre": "Rénovation et réhabilitation",
        "desc": "Remise en état, modernisation, transformation, réhabilitation de bâtiments et ouvrages existants."
      },
      {
        "id": "btp4",
        "titre": "Gestion de projets de construction",
        "desc": "Planification, coordination des intervenants, suivi des travaux, contrôle de la qualité, suivi des coûts, suivi des délais, réception des ouvrages."
      }
    ]
  },
  "foncier": {
    "eyebrow": "Pôle 2",
    "titre": "Développement Foncier & Aménagement",
    "intro": "Le foncier constitue une composante essentielle de notre activité. DA-TO intervient dans la transformation et la valorisation des terrains à travers des opérations structurées d'aménagement et de développement.",
    "conclusion": "Nous considérons le foncier comme une base de développement qui doit être organisée, sécurisée et valorisée dans une perspective durable.",
    "services": [
      {
        "id": "f1",
        "texte": "Identification et analyse des opportunités foncières"
      },
      {
        "id": "f2",
        "texte": "Structuration des projets"
      },
      {
        "id": "f3",
        "texte": "Lotissement"
      },
      {
        "id": "f4",
        "texte": "Aménagement des terrains"
      },
      {
        "id": "f5",
        "texte": "Viabilisation"
      },
      {
        "id": "f6",
        "texte": "Création et organisation des espaces"
      },
      {
        "id": "f7",
        "texte": "Préparation des terrains à la construction"
      },
      {
        "id": "f8",
        "texte": "Développement de projets fonciers"
      }
    ]
  },
  "immobilier": {
    "eyebrow": "Pôle 3",
    "titre": "Immobilier & Valorisation",
    "intro": "DA-TO développe également des activités liées à la promotion, à la commercialisation et à la gestion immobilière.",
    "conclusion": "Notre approche vise à établir une cohérence entre emplacement, conception, qualité, fonctionnalité, coût et potentiel de valorisation.",
    "services": [
      {
        "id": "i1",
        "texte": "Promotion immobilière"
      },
      {
        "id": "i2",
        "texte": "Développement de programmes immobiliers"
      },
      {
        "id": "i3",
        "texte": "Vente de parcelles"
      },
      {
        "id": "i4",
        "texte": "Vente de bâtiments et biens immobiliers"
      },
      {
        "id": "i5",
        "texte": "Gestion immobilière"
      },
      {
        "id": "i6",
        "texte": "Valorisation d'actifs"
      },
      {
        "id": "i7",
        "texte": "Accompagnement des investisseurs"
      },
      {
        "id": "i8",
        "texte": "Accompagnement des particuliers dans leurs projets immobiliers"
      }
    ]
  }
}),
  "actualites": (schemas.pages?.actualites ?? schemas.actualites ?? identity).parse({
  "banner": {
    "titre": "Actualités",
    "sousTitre": "Nos projets, réalisations et annonces"
  },
  "articles": [
    {
      "id": "art1",
      "date": "15 septembre 2026",
      "titre": "DA-TO GUINEE SA lance un nouveau programme immobilier en Guinée",
      "resume": "DA-TO GUINEE SA annonce le lancement d'un nouveau programme immobilier destiné à répondre à la demande croissante de logements modernes et accessibles en Guinée.",
      "slug": "programme-immobilier-guinee"
    },
    {
      "id": "art2",
      "date": "2 septembre 2026",
      "titre": "Nos équipes mobilisées sur un chantier de viabilisation",
      "resume": "Les équipes de DA-TO sont pleinement engagées sur un important chantier de viabilisation, contribuant à la préparation de nouveaux espaces constructibles.",
      "slug": "chantier-viabilisation"
    },
    {
      "id": "art3",
      "date": "20 août 2026",
      "titre": "DA-TO renforce ses partenariats avec les acteurs locaux",
      "resume": "Dans le cadre de sa stratégie de développement, DA-TO GUINEE SA consolide ses relations avec les entreprises, prestataires et institutions guinéens.",
      "slug": "partenariats-acteurs-locaux"
    }
  ]
}),
  "contact": (schemas.pages?.contact ?? schemas.contact ?? identity).parse({
  "banner": {
    "titre": "Contact",
    "sousTitre": "Parlons de votre projet"
  },
  "coordonnees": {
    "adresse": "Conakry, Lambanyi, Carrefour TMI",
    "telephone": "+224 600 00 00 00",
    "email": "contact@datoguinee.com",
    "horaires": "Lundi – Vendredi : 8h00 – 17h00"
  },
  "clients": {
    "eyebrow": "Nos Clients & Partenaires",
    "titre": "Avec qui nous travaillons",
    "clients": {
      "label": "Nos clients",
      "items": [
        {
          "id": "c1",
          "texte": "Particuliers"
        },
        {
          "id": "c2",
          "texte": "Entreprises"
        },
        {
          "id": "c3",
          "texte": "Investisseurs"
        },
        {
          "id": "c4",
          "texte": "Propriétaires fonciers"
        },
        {
          "id": "c5",
          "texte": "Promoteurs"
        },
        {
          "id": "c6",
          "texte": "Institutions et organisations"
        }
      ]
    },
    "partenaires": {
      "label": "Nos partenaires",
      "items": [
        {
          "id": "p1",
          "texte": "Architectes & ingénieurs"
        },
        {
          "id": "p2",
          "texte": "Bureaux d'études & géomètres"
        },
        {
          "id": "p3",
          "texte": "Entreprises spécialisées"
        },
        {
          "id": "p4",
          "texte": "Fournisseurs & prestataires techniques"
        },
        {
          "id": "p5",
          "texte": "Investisseurs & établissements financiers"
        },
        {
          "id": "p6",
          "texte": "Partenaires institutionnels"
        }
      ]
    }
  },
  "contribution": {
    "eyebrow": "Notre Contribution au Développement de la Guinée",
    "items": [
      {
        "id": "con1",
        "texte": "Création d'infrastructures"
      },
      {
        "id": "con2",
        "texte": "Développement de logements et d'espaces professionnels"
      },
      {
        "id": "con3",
        "texte": "Aménagement des territoires"
      },
      {
        "id": "con4",
        "texte": "Valorisation du foncier"
      },
      {
        "id": "con5",
        "texte": "Création d'emplois directs et indirects"
      },
      {
        "id": "con6",
        "texte": "Développement des compétences locales"
      },
      {
        "id": "con7",
        "texte": "Collaboration avec les entreprises guinéennes"
      },
      {
        "id": "con8",
        "texte": "Création de valeur économique durable"
      }
    ]
  }
}),
  "engagements": (schemas.pages?.engagements ?? schemas.engagements ?? identity).parse({
  "banner": {
    "titre": "Engagements & HSE",
    "sousTitre": "Notre responsabilité envers nos projets, nos équipes et notre territoire"
  },
  "engagements": {
    "eyebrow": "Nos Engagements",
    "titre": "Ce qui guide chacun de nos projets",
    "items": [
      {
        "id": "eng1",
        "titre": "Construire durablement",
        "desc": "Solutions pensées pour durer et répondre aux conditions réelles de leur environnement."
      },
      {
        "id": "eng2",
        "titre": "Maîtriser les coûts",
        "desc": "Efficience à chaque étape pour éviter les dépenses inutiles et préserver l'équilibre économique des projets."
      },
      {
        "id": "eng3",
        "titre": "Garantir la qualité",
        "desc": "Attention particulière à la conception, aux matériaux, à l'exécution et au contrôle des travaux."
      },
      {
        "id": "eng4",
        "titre": "Respecter les délais",
        "desc": "La planification et le suivi sont essentiels à notre gestion de projet."
      },
      {
        "id": "eng5",
        "titre": "Travailler avec transparence",
        "desc": "Relations claires avec clients, partenaires, fournisseurs et collaborateurs."
      },
      {
        "id": "eng6",
        "titre": "Préserver la valeur",
        "desc": "Un ouvrage ou un actif immobilier doit conserver son utilité et sa valeur aussi longtemps que possible."
      },
      {
        "id": "eng7",
        "titre": "Agir avec responsabilité",
        "desc": "Chaque projet doit tenir compte de son environnement, de ses utilisateurs et de son impact sur le territoire."
      }
    ]
  },
  "hse": {
    "eyebrow": "Qualité, Sécurité & HSE",
    "titre": "Une culture de chantier responsable",
    "pratiques": [
      {
        "id": "h1",
        "texte": "Sécurité des travailleurs"
      },
      {
        "id": "h2",
        "texte": "Prévention des risques"
      },
      {
        "id": "h3",
        "texte": "Protection des personnes et des biens"
      },
      {
        "id": "h4",
        "texte": "Organisation des chantiers"
      },
      {
        "id": "h5",
        "texte": "Qualité des travaux"
      },
      {
        "id": "h6",
        "texte": "Gestion des matériaux et équipements"
      },
      {
        "id": "h7",
        "texte": "Protection de l'environnement"
      }
    ],
    "objectif": "Développer une culture de chantier où la performance ne se fait pas au détriment de la sécurité ou de la qualité."
  },
  "technologie": {
    "eyebrow": "Notre Rapport à la Technologie",
    "titre": "Nous Intégrons la technologie et solutions numeriques",
    "domaines": [
      {
        "id": "t1",
        "texte": "Gestion des projets"
      },
      {
        "id": "t2",
        "texte": "Planification des travaux"
      },
      {
        "id": "t3",
        "texte": "Suivi des chantiers"
      },
      {
        "id": "t4",
        "texte": "Gestion documentaire"
      },
      {
        "id": "t5",
        "texte": "Gestion financière"
      },
      {
        "id": "t6",
        "texte": "Relation client"
      },
      {
        "id": "t7",
        "texte": "Gestion immobilière"
      },
      {
        "id": "t8",
        "texte": "Reporting & prise de décision"
      }
    ]
  }
}),
  "home": (schemas.pages?.home ?? schemas.home ?? identity).parse({
  "hero": {
    "tagline": "BTP • Développement Foncier • Immobilier",
    "titre": "Construire durablement.",
    "titreAccent": "Créer de la valeur.",
    "sousTitre": "Votre partenaire de confiance pour tous vos projets de construction, d’aménagement et d’immobilier en Guinée.",
    "cta": "Découvrir nos activités",
    "scrollLabel": "Défiler"
  },
  "carousel": [
    {
      "id": "slide-btp",
      "titre": "BTP & Infrastructures",
      "description": "Nous réalisons des ouvrages de qualité — bâtiments, routes, ponts et infrastructures — qui structurent le développement de la Guinée."
    },
    {
      "id": "slide-foncier",
      "titre": "Développement Foncier & Aménagement",
      "description": "Nous valorisons le foncier guinéen à travers des opérations d’aménagement, de lotissement et de viabilisation durables."
    },
    {
      "id": "slide-immobilier",
      "titre": "Immobilier & Valorisation",
      "description": "Nous concevons et commercialisons des programmes immobiliers modernes, adaptés aux besoins du marché africain."
    }
  ],
  "accroche": {
    "ligne1": "DA-TO GUINEE SA est une entreprise guinéenne spécialisée dans le BTP, le développement foncier et l’immobilier.",
    "ligne2": "Nous concevons, développons et réalisons des projets qui créent de la valeur durable."
  },
  "poles": {
    "eyebrow": "Expertise",
    "titre": "Nos 3 Pôles d’Activité",
    "items": [
      {
        "id": "pole-btp",
        "titre": "BTP & Infrastructures"
      },
      {
        "id": "pole-foncier",
        "titre": "Développement Foncier & Aménagement"
      },
      {
        "id": "pole-immobilier",
        "titre": "Immobilier & Valorisation"
      }
    ]
  },
  "atouts": {
    "eyebrow": "Notre différence",
    "titre": "Pourquoi nous choisir ?",
    "items": [
      {
        "id": "qualite",
        "titre": "Qualité",
        "desc": "Des standards rigoureux à chaque étape de nos projets."
      },
      {
        "id": "durabilite",
        "titre": "Durabilité",
        "desc": "Des solutions pensées pour durer et respecter l’environnement."
      },
      {
        "id": "maitrise",
        "titre": "Maîtrise",
        "desc": "Une expertise technique et managériale reconnue."
      },
      {
        "id": "valeur",
        "titre": "Valeur",
        "desc": "Chaque projet crée une valeur tangible et durable."
      }
    ]
  },
  "contribution": {
    "eyebrow": "",
    "titre": "Notre contribution au développement de la Guinée",
    "para1": "DA-TO GUINEE SA s’engage à bâtir une Guinée moderne, en contribuant activement à la création d’infrastructures solides, de logements accessibles et d’espaces aménagés qui améliorent le cadre de vie des populations.",
    "para2": "Chaque projet que nous réalisons est une pierre posée sur le chemin du développement durable de notre pays.",
    "cta": "En savoir plus"
  },
  "ctaContact": {
    "eyebrow": "Passez à l’action",
    "titre": "Prêt à concrétiser votre projet ?",
    "desc": "Notre équipe est à votre disposition pour étudier votre projet et vous proposer les meilleures solutions.",
    "cta": "Contactez-nous",
    "slogan": "“Construire durablement. Créer de la valeur.”"
  }
}),
  "methode": (schemas.pages?.methode ?? schemas.methode ?? identity).parse({
  "banner": {
    "titre": "Notre Méthode",
    "sousTitre": "Un processus rigoureux, du besoin à la livraison"
  },
  "intro": {
    "eyebrow": "Notre Approche",
    "texte": "Chaque projet que nous réalisons suit une méthodologie structurée qui garantit la qualité, la maîtrise des délais et la satisfaction de nos clients."
  },
  "etapes": [
    {
      "id": "m1",
      "num": "01",
      "titre": "Comprendre",
      "desc": "Nous analysons le besoin, le contexte, les contraintes et les objectifs du projet."
    },
    {
      "id": "m2",
      "num": "02",
      "titre": "Étudier",
      "desc": "Nous examinons les caractéristiques du terrain, les contraintes techniques, les exigences réglementaires et les différentes options envisageables."
    },
    {
      "id": "m3",
      "num": "03",
      "titre": "Concevoir",
      "desc": "Nous recherchons des solutions adaptées à la destination du projet, à son environnement et aux moyens disponibles."
    },
    {
      "id": "m4",
      "num": "04",
      "titre": "Planifier",
      "desc": "Nous définissons les différentes étapes du projet, les ressources nécessaires, les délais et les modalités de suivi."
    },
    {
      "id": "m5",
      "num": "05",
      "titre": "Exécuter",
      "desc": "Nous coordonnons la réalisation des travaux dans le respect des exigences définies."
    },
    {
      "id": "m6",
      "num": "06",
      "titre": "Contrôler",
      "desc": "Nous suivons l'avancement, la qualité, les coûts, les délais et les éventuelles difficultés rencontrées."
    },
    {
      "id": "m7",
      "num": "07",
      "titre": "Livrer",
      "desc": "Nous veillons à ce que le résultat final corresponde aux exigences convenues et aux objectifs du projet."
    }
  ]
}),
};
export const about = pages.about;
export const activites = pages.activites;
export const actualites = pages.actualites;
export const contact = pages.contact;
export const engagements = pages.engagements;
export const home = pages.home;
export const methode = pages.methode;

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    import.meta.hot.invalidate();
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpcnR1YWw6Y29udGVudCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVIb3RDb250ZXh0IGFzIF9fdml0ZV9fY3JlYXRlSG90Q29udGV4dCB9IGZyb20gXCIvQHZpdGUvY2xpZW50XCI7aW1wb3J0Lm1ldGEuaG90ID0gX192aXRlX19jcmVhdGVIb3RDb250ZXh0KFwiL0BpZC9fX3gwMF9fdmlydHVhbDpjb250ZW50XCIpO2ltcG9ydCB7IHNjaGVtYXMgfSBmcm9tIFwiL3NyYy9jb250ZW50L3NjaGVtYXMudHNcIjtcbmNvbnN0IGlkZW50aXR5ID0geyBwYXJzZTogKHYpID0+IHYgfTtcblxuZXhwb3J0IGNvbnN0IHBhZ2VzID0ge1xuICBcImFib3V0XCI6IChzY2hlbWFzLnBhZ2VzPy5hYm91dCA/PyBzY2hlbWFzLmFib3V0ID8/IGlkZW50aXR5KS5wYXJzZSh7XG4gIFwiYmFubmVyXCI6IHtcbiAgICBcInRpdHJlXCI6IFwiw4AgUHJvcG9zXCIsXG4gICAgXCJzb3VzVGl0cmVcIjogXCJRdWkgc29tbWVzLW5vdXMgP1wiXG4gIH0sXG4gIFwidmlzaW9uXCI6IHtcbiAgICBcImV5ZWJyb3dcIjogXCJOb3RyZSBWaXNpb25cIixcbiAgICBcInRleHRlXCI6IFwiTm91cyB2b3Vsb25zIHBhcnRpY2lwZXIgw6AgbGEgY29uc3RydWN0aW9uIGQndW5lIEd1aW7DqWUgb8O5IGxlcyBpbmZyYXN0cnVjdHVyZXMsIGxlcyBlc3BhY2VzIHVyYmFpbnMgZXQgbGVzIHByb2pldHMgaW1tb2JpbGllcnMgc29udCBwZW5zw6lzIHBvdXIgcsOpcG9uZHJlIGF1eCBiZXNvaW5zIHLDqWVscyBkZXMgcG9wdWxhdGlvbnMgZXQgZGUgbCfDqWNvbm9taWUuIFVuIHByb2pldCByw6l1c3NpIG5lIHNlIGxpbWl0ZSBwYXMgw6AgY2UgcXVpIGVzdCBjb25zdHJ1aXQuIElsIHNlIG1lc3VyZSDDoCBsYSB2YWxldXIgcXUnaWwgY3LDqWUgZXQgw6Agc2EgY2FwYWNpdMOpIMOgIGR1cmVyLlwiXG4gIH0sXG4gIFwibWlzc2lvblwiOiB7XG4gICAgXCJleWVicm93XCI6IFwiTm90cmUgTWlzc2lvblwiLFxuICAgIFwidGV4dGVcIjogXCJDb25jZXZvaXIsIGFtw6luYWdlciwgY29uc3RydWlyZSBldCB2YWxvcmlzZXIgZGVzIHByb2pldHMgZXQgaW5mcmFzdHJ1Y3R1cmVzIGFkYXB0w6lzIGF1eCBiZXNvaW5zIGRlIG5vcyBjbGllbnRzIGV0IGF1eCByw6lhbGl0w6lzIGRlIGxldXIgZW52aXJvbm5lbWVudC5cIlxuICB9LFxuICBcImRvbWFpbmVzXCI6IHtcbiAgICBcImV5ZWJyb3dcIjogXCJOb3MgRG9tYWluZXMgZCdJbnRlcnZlbnRpb25cIixcbiAgICBcIml0ZW1zXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImQxXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJEw6l2ZWxvcHBlciBldCBhbcOpbmFnZXIgZGVzIHRlcnJhaW5zXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJkMlwiLFxuICAgICAgICBcInRleHRlXCI6IFwiUsOpYWxpc2VyIGRlcyBvcMOpcmF0aW9ucyBkZSBsb3Rpc3NlbWVudCBldCBkZSB2aWFiaWxpc2F0aW9uXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJkM1wiLFxuICAgICAgICBcInRleHRlXCI6IFwiQ29uc3RydWlyZSBkZXMgYsOidGltZW50cyBldCBpbmZyYXN0cnVjdHVyZXNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImQ0XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJSw6lhbGlzZXIgZGVzIHRyYXZhdXggZCdhbcOpbmFnZW1lbnQgZXQgZGUgVm9pcmllIGV0IFLDqXNlYXV4IERpdmVycyAoVlJEKVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZDVcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIlLDqW5vdmVyIGV0IHLDqWhhYmlsaXRlciBkZXMgb3V2cmFnZXMgZXhpc3RhbnRzXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJkNlwiLFxuICAgICAgICBcInRleHRlXCI6IFwiRMOpdmVsb3BwZXIgZGVzIHByb2pldHMgaW1tb2JpbGllcnNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImQ3XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJDb21tZXJjaWFsaXNlciBldCB2YWxvcmlzZXIgZGVzIGFjdGlmcyBpbW1vYmlsaWVyc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZDhcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIkFjY29tcGFnbmVyIG5vcyBjbGllbnRzIGRhbnMgbGEgcsOpYWxpc2F0aW9uIGRlIGxldXJzIHByb2pldHNcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJhcHByb2NoZVwiOiB7XG4gICAgXCJleWVicm93XCI6IFwiTm90cmUgQXBwcm9jaGUgSW50w6lncsOpZVwiLFxuICAgIFwidGl0cmVcIjogXCJEZSBsYSB0ZXJyZSBhdSBwcm9qZXQgbGl2csOpXCIsXG4gICAgXCJldGFwZXNcIjogW1xuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZTFcIixcbiAgICAgICAgXCJsYWJlbFwiOiBcIkZvbmNpZXJcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImUyXCIsXG4gICAgICAgIFwibGFiZWxcIjogXCJBbcOpbmFnZW1lbnRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImUzXCIsXG4gICAgICAgIFwibGFiZWxcIjogXCJWaWFiaWxpc2F0aW9uXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJlNFwiLFxuICAgICAgICBcImxhYmVsXCI6IFwiQ29uc3RydWN0aW9uXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJlNVwiLFxuICAgICAgICBcImxhYmVsXCI6IFwiUHJvbW90aW9uXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJlNlwiLFxuICAgICAgICBcImxhYmVsXCI6IFwiR2VzdGlvblwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZTdcIixcbiAgICAgICAgXCJsYWJlbFwiOiBcIlZhbG9yaXNhdGlvblwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcInBoaWxvc29waGllXCI6IHtcbiAgICBcImV5ZWJyb3dcIjogXCJOb3RyZSBQaGlsb3NvcGhpZVwiLFxuICAgIFwibGlnbmVzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcInAxXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJDb25zdHJ1aXJlIGF2ZWMgZGF2YW50YWdlIGRlIHByw6lwYXJhdGlvbi5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcInAyXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJDb25zdHJ1aXJlIGF2ZWMgZGF2YW50YWdlIGRlIG1hw650cmlzZS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcInAzXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJDb25zdHJ1aXJlIGF2ZWMgZGF2YW50YWdlIGRlIHRyYW5zcGFyZW5jZS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcInA0XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJDb25zdHJ1aXJlIGF2ZWMgZGF2YW50YWdlIGRlIHJlc3BvbnNhYmlsaXTDqS5cIlxuICAgICAgfVxuICAgIF0sXG4gICAgXCJjb25jbHVzaW9uXCI6IFwiUG91ciBEQS1UTywgbGUgZMOpdmVsb3BwZW1lbnQgaW1tb2JpbGllciBuZSBkb2l0IHBhcyB1bmlxdWVtZW50IHByb2R1aXJlIGRlcyBiw6J0aW1lbnRzIG91IGRlcyB0ZXJyYWlucy4gSWwgZG9pdCBwcm9kdWlyZSBkZSBsJ3V0aWxpdMOpLCBkZSBsYSBkdXJhYmlsaXTDqSBldCBkZSBsYSB2YWxldXIuXCJcbiAgfVxufSksXG4gIFwiYWN0aXZpdGVzXCI6IChzY2hlbWFzLnBhZ2VzPy5hY3Rpdml0ZXMgPz8gc2NoZW1hcy5hY3Rpdml0ZXMgPz8gaWRlbnRpdHkpLnBhcnNlKHtcbiAgXCJiYW5uZXJcIjoge1xuICAgIFwidGl0cmVcIjogXCJOb3MgQWN0aXZpdMOpc1wiLFxuICAgIFwic291c1RpdHJlXCI6IFwiVHJvaXMgcMO0bGVzIGQnZXhwZXJ0aXNlIGF1IHNlcnZpY2UgZGUgdm9zIHByb2pldHNcIlxuICB9LFxuICBcImJ0cFwiOiB7XG4gICAgXCJleWVicm93XCI6IFwiUMO0bGUgMVwiLFxuICAgIFwidGl0cmVcIjogXCJCVFAgJiBJbmZyYXN0cnVjdHVyZXNcIixcbiAgICBcImludHJvXCI6IFwiTGUgQlRQIGNvbnN0aXR1ZSBsJ3VuIGRlcyBwcmluY2lwYXV4IGRvbWFpbmVzIGQnaW50ZXJ2ZW50aW9uIGRlIERBLVRPLiBOb3VzIGTDqXZlbG9wcG9ucyBldCByw6lhbGlzb25zIGRlcyBwcm9qZXRzIGRlIGNvbnN0cnVjdGlvbiBldCBkJ2luZnJhc3RydWN0dXJlcyBlbiByZWNoZXJjaGFudCB1biDDqXF1aWxpYnJlIGVudHJlIHF1YWxpdMOpLCBmb25jdGlvbm5hbGl0w6ksIGNvw7t0LCBkw6lsYWkgZXQgZHVyYWJpbGl0w6kuXCIsXG4gICAgXCJvYmplY3RpZlwiOiBcIkZhaXJlIGRlIGNoYXF1ZSBjaGFudGllciB1biBwcm9qZXQgbWHDrnRyaXPDqSwgZGVwdWlzIHNhIHByw6lwYXJhdGlvbiBqdXNxdSfDoCBzYSBsaXZyYWlzb24uXCIsXG4gICAgXCJzZXJ2aWNlc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJidHAxXCIsXG4gICAgICAgIFwidGl0cmVcIjogXCJDb25zdHJ1Y3Rpb24gZGUgYsOidGltZW50c1wiLFxuICAgICAgICBcImRlc2NcIjogXCJSw6lzaWRlbnRpZWxzLCBjb21tZXJjaWF1eCwgYWRtaW5pc3RyYXRpZnMsIHByb2Zlc3Npb25uZWxzLCBvdXZyYWdlcyBldCBpbmZyYXN0cnVjdHVyZXMgZGl2ZXJzZXMuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJidHAyXCIsXG4gICAgICAgIFwidGl0cmVcIjogXCJUcmF2YXV4IHB1YmxpY3NcIixcbiAgICAgICAgXCJkZXNjXCI6IFwiVGVycmFzc2VtZW50LCBwcsOpcGFyYXRpb24gZXQgYW3DqW5hZ2VtZW50IGRlcyBzaXRlcywgdm9pcmllcywgcsOpc2VhdXggZGl2ZXJzLCBvdXZyYWdlcyBkJ2Fzc2Fpbmlzc2VtZW50LCBhbcOpbmFnZW1lbnRzIGV4dMOpcmlldXJzLCBpbmZyYXN0cnVjdHVyZXMgYXNzb2Npw6llcyBhdXggcHJvamV0cy5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImJ0cDNcIixcbiAgICAgICAgXCJ0aXRyZVwiOiBcIlLDqW5vdmF0aW9uIGV0IHLDqWhhYmlsaXRhdGlvblwiLFxuICAgICAgICBcImRlc2NcIjogXCJSZW1pc2UgZW4gw6l0YXQsIG1vZGVybmlzYXRpb24sIHRyYW5zZm9ybWF0aW9uLCByw6loYWJpbGl0YXRpb24gZGUgYsOidGltZW50cyBldCBvdXZyYWdlcyBleGlzdGFudHMuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJidHA0XCIsXG4gICAgICAgIFwidGl0cmVcIjogXCJHZXN0aW9uIGRlIHByb2pldHMgZGUgY29uc3RydWN0aW9uXCIsXG4gICAgICAgIFwiZGVzY1wiOiBcIlBsYW5pZmljYXRpb24sIGNvb3JkaW5hdGlvbiBkZXMgaW50ZXJ2ZW5hbnRzLCBzdWl2aSBkZXMgdHJhdmF1eCwgY29udHLDtGxlIGRlIGxhIHF1YWxpdMOpLCBzdWl2aSBkZXMgY2/Du3RzLCBzdWl2aSBkZXMgZMOpbGFpcywgcsOpY2VwdGlvbiBkZXMgb3V2cmFnZXMuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiZm9uY2llclwiOiB7XG4gICAgXCJleWVicm93XCI6IFwiUMO0bGUgMlwiLFxuICAgIFwidGl0cmVcIjogXCJEw6l2ZWxvcHBlbWVudCBGb25jaWVyICYgQW3DqW5hZ2VtZW50XCIsXG4gICAgXCJpbnRyb1wiOiBcIkxlIGZvbmNpZXIgY29uc3RpdHVlIHVuZSBjb21wb3NhbnRlIGVzc2VudGllbGxlIGRlIG5vdHJlIGFjdGl2aXTDqS4gREEtVE8gaW50ZXJ2aWVudCBkYW5zIGxhIHRyYW5zZm9ybWF0aW9uIGV0IGxhIHZhbG9yaXNhdGlvbiBkZXMgdGVycmFpbnMgw6AgdHJhdmVycyBkZXMgb3DDqXJhdGlvbnMgc3RydWN0dXLDqWVzIGQnYW3DqW5hZ2VtZW50IGV0IGRlIGTDqXZlbG9wcGVtZW50LlwiLFxuICAgIFwiY29uY2x1c2lvblwiOiBcIk5vdXMgY29uc2lkw6lyb25zIGxlIGZvbmNpZXIgY29tbWUgdW5lIGJhc2UgZGUgZMOpdmVsb3BwZW1lbnQgcXVpIGRvaXQgw6p0cmUgb3JnYW5pc8OpZSwgc8OpY3VyaXPDqWUgZXQgdmFsb3Jpc8OpZSBkYW5zIHVuZSBwZXJzcGVjdGl2ZSBkdXJhYmxlLlwiLFxuICAgIFwic2VydmljZXNcIjogW1xuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZjFcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIklkZW50aWZpY2F0aW9uIGV0IGFuYWx5c2UgZGVzIG9wcG9ydHVuaXTDqXMgZm9uY2nDqHJlc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZjJcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIlN0cnVjdHVyYXRpb24gZGVzIHByb2pldHNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImYzXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJMb3Rpc3NlbWVudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZjRcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIkFtw6luYWdlbWVudCBkZXMgdGVycmFpbnNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImY1XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJWaWFiaWxpc2F0aW9uXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJmNlwiLFxuICAgICAgICBcInRleHRlXCI6IFwiQ3LDqWF0aW9uIGV0IG9yZ2FuaXNhdGlvbiBkZXMgZXNwYWNlc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZjdcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIlByw6lwYXJhdGlvbiBkZXMgdGVycmFpbnMgw6AgbGEgY29uc3RydWN0aW9uXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJmOFwiLFxuICAgICAgICBcInRleHRlXCI6IFwiRMOpdmVsb3BwZW1lbnQgZGUgcHJvamV0cyBmb25jaWVyc1wiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcImltbW9iaWxpZXJcIjoge1xuICAgIFwiZXllYnJvd1wiOiBcIlDDtGxlIDNcIixcbiAgICBcInRpdHJlXCI6IFwiSW1tb2JpbGllciAmIFZhbG9yaXNhdGlvblwiLFxuICAgIFwiaW50cm9cIjogXCJEQS1UTyBkw6l2ZWxvcHBlIMOpZ2FsZW1lbnQgZGVzIGFjdGl2aXTDqXMgbGnDqWVzIMOgIGxhIHByb21vdGlvbiwgw6AgbGEgY29tbWVyY2lhbGlzYXRpb24gZXQgw6AgbGEgZ2VzdGlvbiBpbW1vYmlsacOocmUuXCIsXG4gICAgXCJjb25jbHVzaW9uXCI6IFwiTm90cmUgYXBwcm9jaGUgdmlzZSDDoCDDqXRhYmxpciB1bmUgY29ow6lyZW5jZSBlbnRyZSBlbXBsYWNlbWVudCwgY29uY2VwdGlvbiwgcXVhbGl0w6ksIGZvbmN0aW9ubmFsaXTDqSwgY2/Du3QgZXQgcG90ZW50aWVsIGRlIHZhbG9yaXNhdGlvbi5cIixcbiAgICBcInNlcnZpY2VzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImkxXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJQcm9tb3Rpb24gaW1tb2JpbGnDqHJlXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJpMlwiLFxuICAgICAgICBcInRleHRlXCI6IFwiRMOpdmVsb3BwZW1lbnQgZGUgcHJvZ3JhbW1lcyBpbW1vYmlsaWVyc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiaTNcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIlZlbnRlIGRlIHBhcmNlbGxlc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiaTRcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIlZlbnRlIGRlIGLDonRpbWVudHMgZXQgYmllbnMgaW1tb2JpbGllcnNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImk1XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJHZXN0aW9uIGltbW9iaWxpw6hyZVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiaTZcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIlZhbG9yaXNhdGlvbiBkJ2FjdGlmc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiaTdcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIkFjY29tcGFnbmVtZW50IGRlcyBpbnZlc3Rpc3NldXJzXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJpOFwiLFxuICAgICAgICBcInRleHRlXCI6IFwiQWNjb21wYWduZW1lbnQgZGVzIHBhcnRpY3VsaWVycyBkYW5zIGxldXJzIHByb2pldHMgaW1tb2JpbGllcnNcIlxuICAgICAgfVxuICAgIF1cbiAgfVxufSksXG4gIFwiYWN0dWFsaXRlc1wiOiAoc2NoZW1hcy5wYWdlcz8uYWN0dWFsaXRlcyA/PyBzY2hlbWFzLmFjdHVhbGl0ZXMgPz8gaWRlbnRpdHkpLnBhcnNlKHtcbiAgXCJiYW5uZXJcIjoge1xuICAgIFwidGl0cmVcIjogXCJBY3R1YWxpdMOpc1wiLFxuICAgIFwic291c1RpdHJlXCI6IFwiTm9zIHByb2pldHMsIHLDqWFsaXNhdGlvbnMgZXQgYW5ub25jZXNcIlxuICB9LFxuICBcImFydGljbGVzXCI6IFtcbiAgICB7XG4gICAgICBcImlkXCI6IFwiYXJ0MVwiLFxuICAgICAgXCJkYXRlXCI6IFwiMTUgc2VwdGVtYnJlIDIwMjZcIixcbiAgICAgIFwidGl0cmVcIjogXCJHcm91cGUgREEtVE8gbGFuY2UgdW4gbm91dmVhdSBwcm9ncmFtbWUgaW1tb2JpbGllciBlbiBHdWluw6llXCIsXG4gICAgICBcInJlc3VtZVwiOiBcIkdyb3VwZSBEQS1UTyBhbm5vbmNlIGxlIGxhbmNlbWVudCBkJ3VuIG5vdXZlYXUgcHJvZ3JhbW1lIGltbW9iaWxpZXIgZGVzdGluw6kgw6AgcsOpcG9uZHJlIMOgIGxhIGRlbWFuZGUgY3JvaXNzYW50ZSBkZSBsb2dlbWVudHMgbW9kZXJuZXMgZXQgYWNjZXNzaWJsZXMgZW4gR3VpbsOpZS5cIixcbiAgICAgIFwic2x1Z1wiOiBcInByb2dyYW1tZS1pbW1vYmlsaWVyLWd1aW5lZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IFwiYXJ0MlwiLFxuICAgICAgXCJkYXRlXCI6IFwiMiBzZXB0ZW1icmUgMjAyNlwiLFxuICAgICAgXCJ0aXRyZVwiOiBcIk5vcyDDqXF1aXBlcyBtb2JpbGlzw6llcyBzdXIgdW4gY2hhbnRpZXIgZGUgdmlhYmlsaXNhdGlvblwiLFxuICAgICAgXCJyZXN1bWVcIjogXCJMZXMgw6lxdWlwZXMgZGUgREEtVE8gc29udCBwbGVpbmVtZW50IGVuZ2Fnw6llcyBzdXIgdW4gaW1wb3J0YW50IGNoYW50aWVyIGRlIHZpYWJpbGlzYXRpb24sIGNvbnRyaWJ1YW50IMOgIGxhIHByw6lwYXJhdGlvbiBkZSBub3V2ZWF1eCBlc3BhY2VzIGNvbnN0cnVjdGlibGVzLlwiLFxuICAgICAgXCJzbHVnXCI6IFwiY2hhbnRpZXItdmlhYmlsaXNhdGlvblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IFwiYXJ0M1wiLFxuICAgICAgXCJkYXRlXCI6IFwiMjAgYW/Du3QgMjAyNlwiLFxuICAgICAgXCJ0aXRyZVwiOiBcIkRBLVRPIHJlbmZvcmNlIHNlcyBwYXJ0ZW5hcmlhdHMgYXZlYyBsZXMgYWN0ZXVycyBsb2NhdXhcIixcbiAgICAgIFwicmVzdW1lXCI6IFwiRGFucyBsZSBjYWRyZSBkZSBzYSBzdHJhdMOpZ2llIGRlIGTDqXZlbG9wcGVtZW50LCBHcm91cGUgREEtVE8gY29uc29saWRlIHNlcyByZWxhdGlvbnMgYXZlYyBsZXMgZW50cmVwcmlzZXMsIHByZXN0YXRhaXJlcyBldCBpbnN0aXR1dGlvbnMgZ3VpbsOpZW5zLlwiLFxuICAgICAgXCJzbHVnXCI6IFwicGFydGVuYXJpYXRzLWFjdGV1cnMtbG9jYXV4XCJcbiAgICB9XG4gIF1cbn0pLFxuICBcImNvbnRhY3RcIjogKHNjaGVtYXMucGFnZXM/LmNvbnRhY3QgPz8gc2NoZW1hcy5jb250YWN0ID8/IGlkZW50aXR5KS5wYXJzZSh7XG4gIFwiYmFubmVyXCI6IHtcbiAgICBcInRpdHJlXCI6IFwiQ29udGFjdFwiLFxuICAgIFwic291c1RpdHJlXCI6IFwiUGFybG9ucyBkZSB2b3RyZSBwcm9qZXRcIlxuICB9LFxuICBcImNvb3Jkb25uZWVzXCI6IHtcbiAgICBcImFkcmVzc2VcIjogXCJDb25ha3J5LCBMYW1iYW55aSwgQ2FycmVmb3VyIFRNSVwiLFxuICAgIFwidGVsZXBob25lXCI6IFwiKzIyNCA2MDAgMDAgMDAgMDBcIixcbiAgICBcImVtYWlsXCI6IFwiY29udGFjdEBncm91cGUtZGF0by5jb21cIixcbiAgICBcImhvcmFpcmVzXCI6IFwiTHVuZGkg4oCTIFZlbmRyZWRpIDogOGgwMCDigJMgMTdoMDBcIlxuICB9LFxuICBcImNsaWVudHNcIjoge1xuICAgIFwiZXllYnJvd1wiOiBcIk5vcyBDbGllbnRzICYgUGFydGVuYWlyZXNcIixcbiAgICBcInRpdHJlXCI6IFwiQXZlYyBxdWkgbm91cyB0cmF2YWlsbG9uc1wiLFxuICAgIFwiY2xpZW50c1wiOiB7XG4gICAgICBcImxhYmVsXCI6IFwiTm9zIGNsaWVudHNcIixcbiAgICAgIFwiaXRlbXNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJpZFwiOiBcImMxXCIsXG4gICAgICAgICAgXCJ0ZXh0ZVwiOiBcIlBhcnRpY3VsaWVyc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImlkXCI6IFwiYzJcIixcbiAgICAgICAgICBcInRleHRlXCI6IFwiRW50cmVwcmlzZXNcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpZFwiOiBcImMzXCIsXG4gICAgICAgICAgXCJ0ZXh0ZVwiOiBcIkludmVzdGlzc2V1cnNcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpZFwiOiBcImM0XCIsXG4gICAgICAgICAgXCJ0ZXh0ZVwiOiBcIlByb3ByacOpdGFpcmVzIGZvbmNpZXJzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaWRcIjogXCJjNVwiLFxuICAgICAgICAgIFwidGV4dGVcIjogXCJQcm9tb3RldXJzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaWRcIjogXCJjNlwiLFxuICAgICAgICAgIFwidGV4dGVcIjogXCJJbnN0aXR1dGlvbnMgZXQgb3JnYW5pc2F0aW9uc1wiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIFwicGFydGVuYWlyZXNcIjoge1xuICAgICAgXCJsYWJlbFwiOiBcIk5vcyBwYXJ0ZW5haXJlc1wiLFxuICAgICAgXCJpdGVtc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcImlkXCI6IFwicDFcIixcbiAgICAgICAgICBcInRleHRlXCI6IFwiQXJjaGl0ZWN0ZXMgJiBpbmfDqW5pZXVyc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImlkXCI6IFwicDJcIixcbiAgICAgICAgICBcInRleHRlXCI6IFwiQnVyZWF1eCBkJ8OpdHVkZXMgJiBnw6lvbcOodHJlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImlkXCI6IFwicDNcIixcbiAgICAgICAgICBcInRleHRlXCI6IFwiRW50cmVwcmlzZXMgc3DDqWNpYWxpc8OpZXNcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpZFwiOiBcInA0XCIsXG4gICAgICAgICAgXCJ0ZXh0ZVwiOiBcIkZvdXJuaXNzZXVycyAmIHByZXN0YXRhaXJlcyB0ZWNobmlxdWVzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaWRcIjogXCJwNVwiLFxuICAgICAgICAgIFwidGV4dGVcIjogXCJJbnZlc3Rpc3NldXJzICYgw6l0YWJsaXNzZW1lbnRzIGZpbmFuY2llcnNcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpZFwiOiBcInA2XCIsXG4gICAgICAgICAgXCJ0ZXh0ZVwiOiBcIlBhcnRlbmFpcmVzIGluc3RpdHV0aW9ubmVsc1wiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiY29udHJpYnV0aW9uXCI6IHtcbiAgICBcImV5ZWJyb3dcIjogXCJOb3RyZSBDb250cmlidXRpb24gYXUgRMOpdmVsb3BwZW1lbnQgZGUgbGEgR3VpbsOpZVwiLFxuICAgIFwiaXRlbXNcIjogW1xuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiY29uMVwiLFxuICAgICAgICBcInRleHRlXCI6IFwiQ3LDqWF0aW9uIGQnaW5mcmFzdHJ1Y3R1cmVzXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJjb24yXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJEw6l2ZWxvcHBlbWVudCBkZSBsb2dlbWVudHMgZXQgZCdlc3BhY2VzIHByb2Zlc3Npb25uZWxzXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJjb24zXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJBbcOpbmFnZW1lbnQgZGVzIHRlcnJpdG9pcmVzXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJjb240XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJWYWxvcmlzYXRpb24gZHUgZm9uY2llclwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiY29uNVwiLFxuICAgICAgICBcInRleHRlXCI6IFwiQ3LDqWF0aW9uIGQnZW1wbG9pcyBkaXJlY3RzIGV0IGluZGlyZWN0c1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiY29uNlwiLFxuICAgICAgICBcInRleHRlXCI6IFwiRMOpdmVsb3BwZW1lbnQgZGVzIGNvbXDDqXRlbmNlcyBsb2NhbGVzXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJjb243XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJDb2xsYWJvcmF0aW9uIGF2ZWMgbGVzIGVudHJlcHJpc2VzIGd1aW7DqWVubmVzXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJjb244XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJDcsOpYXRpb24gZGUgdmFsZXVyIMOpY29ub21pcXVlIGR1cmFibGVcIlxuICAgICAgfVxuICAgIF1cbiAgfVxufSksXG4gIFwiZW5nYWdlbWVudHNcIjogKHNjaGVtYXMucGFnZXM/LmVuZ2FnZW1lbnRzID8/IHNjaGVtYXMuZW5nYWdlbWVudHMgPz8gaWRlbnRpdHkpLnBhcnNlKHtcbiAgXCJiYW5uZXJcIjoge1xuICAgIFwidGl0cmVcIjogXCJFbmdhZ2VtZW50cyAmIEhTRVwiLFxuICAgIFwic291c1RpdHJlXCI6IFwiTm90cmUgcmVzcG9uc2FiaWxpdMOpIGVudmVycyBub3MgcHJvamV0cywgbm9zIMOpcXVpcGVzIGV0IG5vdHJlIHRlcnJpdG9pcmVcIlxuICB9LFxuICBcImVuZ2FnZW1lbnRzXCI6IHtcbiAgICBcImV5ZWJyb3dcIjogXCJOb3MgRW5nYWdlbWVudHNcIixcbiAgICBcInRpdHJlXCI6IFwiQ2UgcXVpIGd1aWRlIGNoYWN1biBkZSBub3MgcHJvamV0c1wiLFxuICAgIFwiaXRlbXNcIjogW1xuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZW5nMVwiLFxuICAgICAgICBcInRpdHJlXCI6IFwiQ29uc3RydWlyZSBkdXJhYmxlbWVudFwiLFxuICAgICAgICBcImRlc2NcIjogXCJTb2x1dGlvbnMgcGVuc8OpZXMgcG91ciBkdXJlciBldCByw6lwb25kcmUgYXV4IGNvbmRpdGlvbnMgcsOpZWxsZXMgZGUgbGV1ciBlbnZpcm9ubmVtZW50LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZW5nMlwiLFxuICAgICAgICBcInRpdHJlXCI6IFwiTWHDrnRyaXNlciBsZXMgY2/Du3RzXCIsXG4gICAgICAgIFwiZGVzY1wiOiBcIkVmZmljaWVuY2Ugw6AgY2hhcXVlIMOpdGFwZSBwb3VyIMOpdml0ZXIgbGVzIGTDqXBlbnNlcyBpbnV0aWxlcyBldCBwcsOpc2VydmVyIGwnw6lxdWlsaWJyZSDDqWNvbm9taXF1ZSBkZXMgcHJvamV0cy5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImVuZzNcIixcbiAgICAgICAgXCJ0aXRyZVwiOiBcIkdhcmFudGlyIGxhIHF1YWxpdMOpXCIsXG4gICAgICAgIFwiZGVzY1wiOiBcIkF0dGVudGlvbiBwYXJ0aWN1bGnDqHJlIMOgIGxhIGNvbmNlcHRpb24sIGF1eCBtYXTDqXJpYXV4LCDDoCBsJ2V4w6ljdXRpb24gZXQgYXUgY29udHLDtGxlIGRlcyB0cmF2YXV4LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZW5nNFwiLFxuICAgICAgICBcInRpdHJlXCI6IFwiUmVzcGVjdGVyIGxlcyBkw6lsYWlzXCIsXG4gICAgICAgIFwiZGVzY1wiOiBcIkxhIHBsYW5pZmljYXRpb24gZXQgbGUgc3Vpdmkgc29udCBlc3NlbnRpZWxzIMOgIG5vdHJlIGdlc3Rpb24gZGUgcHJvamV0LlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZW5nNVwiLFxuICAgICAgICBcInRpdHJlXCI6IFwiVHJhdmFpbGxlciBhdmVjIHRyYW5zcGFyZW5jZVwiLFxuICAgICAgICBcImRlc2NcIjogXCJSZWxhdGlvbnMgY2xhaXJlcyBhdmVjIGNsaWVudHMsIHBhcnRlbmFpcmVzLCBmb3Vybmlzc2V1cnMgZXQgY29sbGFib3JhdGV1cnMuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJlbmc2XCIsXG4gICAgICAgIFwidGl0cmVcIjogXCJQcsOpc2VydmVyIGxhIHZhbGV1clwiLFxuICAgICAgICBcImRlc2NcIjogXCJVbiBvdXZyYWdlIG91IHVuIGFjdGlmIGltbW9iaWxpZXIgZG9pdCBjb25zZXJ2ZXIgc29uIHV0aWxpdMOpIGV0IHNhIHZhbGV1ciBhdXNzaSBsb25ndGVtcHMgcXVlIHBvc3NpYmxlLlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiZW5nN1wiLFxuICAgICAgICBcInRpdHJlXCI6IFwiQWdpciBhdmVjIHJlc3BvbnNhYmlsaXTDqVwiLFxuICAgICAgICBcImRlc2NcIjogXCJDaGFxdWUgcHJvamV0IGRvaXQgdGVuaXIgY29tcHRlIGRlIHNvbiBlbnZpcm9ubmVtZW50LCBkZSBzZXMgdXRpbGlzYXRldXJzIGV0IGRlIHNvbiBpbXBhY3Qgc3VyIGxlIHRlcnJpdG9pcmUuXCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiaHNlXCI6IHtcbiAgICBcImV5ZWJyb3dcIjogXCJRdWFsaXTDqSwgU8OpY3VyaXTDqSAmIEhTRVwiLFxuICAgIFwidGl0cmVcIjogXCJVbmUgY3VsdHVyZSBkZSBjaGFudGllciByZXNwb25zYWJsZVwiLFxuICAgIFwicHJhdGlxdWVzXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImgxXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJTw6ljdXJpdMOpIGRlcyB0cmF2YWlsbGV1cnNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImgyXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJQcsOpdmVudGlvbiBkZXMgcmlzcXVlc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiaDNcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIlByb3RlY3Rpb24gZGVzIHBlcnNvbm5lcyBldCBkZXMgYmllbnNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImg0XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJPcmdhbmlzYXRpb24gZGVzIGNoYW50aWVyc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwiaDVcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIlF1YWxpdMOpIGRlcyB0cmF2YXV4XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJoNlwiLFxuICAgICAgICBcInRleHRlXCI6IFwiR2VzdGlvbiBkZXMgbWF0w6lyaWF1eCBldCDDqXF1aXBlbWVudHNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImg3XCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJQcm90ZWN0aW9uIGRlIGwnZW52aXJvbm5lbWVudFwiXG4gICAgICB9XG4gICAgXSxcbiAgICBcIm9iamVjdGlmXCI6IFwiRMOpdmVsb3BwZXIgdW5lIGN1bHR1cmUgZGUgY2hhbnRpZXIgb8O5IGxhIHBlcmZvcm1hbmNlIG5lIHNlIGZhaXQgcGFzIGF1IGTDqXRyaW1lbnQgZGUgbGEgc8OpY3VyaXTDqSBvdSBkZSBsYSBxdWFsaXTDqS5cIlxuICB9LFxuICBcInRlY2hub2xvZ2llXCI6IHtcbiAgICBcImV5ZWJyb3dcIjogXCJOb3RyZSBSYXBwb3J0IMOgIGxhIFRlY2hub2xvZ2llXCIsXG4gICAgXCJ0aXRyZVwiOiBcIk5vdXMgSW50w6lncm9ucyBsYSB0ZWNobm9sb2dpZSBldCBzb2x1dGlvbnMgbnVtZXJpcXVlc1wiLFxuICAgIFwiZG9tYWluZXNcIjogW1xuICAgICAge1xuICAgICAgICBcImlkXCI6IFwidDFcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIkdlc3Rpb24gZGVzIHByb2pldHNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcInQyXCIsXG4gICAgICAgIFwidGV4dGVcIjogXCJQbGFuaWZpY2F0aW9uIGRlcyB0cmF2YXV4XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJ0M1wiLFxuICAgICAgICBcInRleHRlXCI6IFwiU3VpdmkgZGVzIGNoYW50aWVyc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwidDRcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIkdlc3Rpb24gZG9jdW1lbnRhaXJlXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJ0NVwiLFxuICAgICAgICBcInRleHRlXCI6IFwiR2VzdGlvbiBmaW5hbmNpw6hyZVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwidDZcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIlJlbGF0aW9uIGNsaWVudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwidDdcIixcbiAgICAgICAgXCJ0ZXh0ZVwiOiBcIkdlc3Rpb24gaW1tb2JpbGnDqHJlXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJ0OFwiLFxuICAgICAgICBcInRleHRlXCI6IFwiUmVwb3J0aW5nICYgcHJpc2UgZGUgZMOpY2lzaW9uXCJcbiAgICAgIH1cbiAgICBdXG4gIH1cbn0pLFxuICBcImhvbWVcIjogKHNjaGVtYXMucGFnZXM/LmhvbWUgPz8gc2NoZW1hcy5ob21lID8/IGlkZW50aXR5KS5wYXJzZSh7XG4gIFwiaGVyb1wiOiB7XG4gICAgXCJ0YWdsaW5lXCI6IFwiQlRQIOKAoiBEw6l2ZWxvcHBlbWVudCBGb25jaWVyIOKAoiBJbW1vYmlsaWVyXCIsXG4gICAgXCJ0aXRyZVwiOiBcIkNvbnN0cnVpcmUgZHVyYWJsZW1lbnQuXCIsXG4gICAgXCJ0aXRyZUFjY2VudFwiOiBcIkNyw6llciBkZSBsYSB2YWxldXIuXCIsXG4gICAgXCJzb3VzVGl0cmVcIjogXCJWb3RyZSBwYXJ0ZW5haXJlIGRlIGNvbmZpYW5jZSBwb3VyIHRvdXMgdm9zIHByb2pldHMgZGUgY29uc3RydWN0aW9uLCBk4oCZYW3DqW5hZ2VtZW50IGV0IGTigJlpbW1vYmlsaWVyIGVuIEd1aW7DqWUuXCIsXG4gICAgXCJjdGFcIjogXCJEw6ljb3V2cmlyIG5vcyBhY3Rpdml0w6lzXCIsXG4gICAgXCJzY3JvbGxMYWJlbFwiOiBcIkTDqWZpbGVyXCJcbiAgfSxcbiAgXCJjYXJvdXNlbFwiOiBbXG4gICAge1xuICAgICAgXCJpZFwiOiBcInNsaWRlLWJ0cFwiLFxuICAgICAgXCJ0aXRyZVwiOiBcIkJUUCAmIEluZnJhc3RydWN0dXJlc1wiLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIk5vdXMgcsOpYWxpc29ucyBkZXMgb3V2cmFnZXMgZGUgcXVhbGl0w6kg4oCUIGLDonRpbWVudHMsIHJvdXRlcywgcG9udHMgZXQgaW5mcmFzdHJ1Y3R1cmVzIOKAlCBxdWkgc3RydWN0dXJlbnQgbGUgZMOpdmVsb3BwZW1lbnQgZGUgbGEgR3VpbsOpZS5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiBcInNsaWRlLWZvbmNpZXJcIixcbiAgICAgIFwidGl0cmVcIjogXCJEw6l2ZWxvcHBlbWVudCBGb25jaWVyICYgQW3DqW5hZ2VtZW50XCIsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IFwiTm91cyB2YWxvcmlzb25zIGxlIGZvbmNpZXIgZ3VpbsOpZW4gw6AgdHJhdmVycyBkZXMgb3DDqXJhdGlvbnMgZOKAmWFtw6luYWdlbWVudCwgZGUgbG90aXNzZW1lbnQgZXQgZGUgdmlhYmlsaXNhdGlvbiBkdXJhYmxlcy5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiBcInNsaWRlLWltbW9iaWxpZXJcIixcbiAgICAgIFwidGl0cmVcIjogXCJJbW1vYmlsaWVyICYgVmFsb3Jpc2F0aW9uXCIsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IFwiTm91cyBjb25jZXZvbnMgZXQgY29tbWVyY2lhbGlzb25zIGRlcyBwcm9ncmFtbWVzIGltbW9iaWxpZXJzIG1vZGVybmVzLCBhZGFwdMOpcyBhdXggYmVzb2lucyBkdSBtYXJjaMOpIGFmcmljYWluLlwiXG4gICAgfVxuICBdLFxuICBcImFjY3JvY2hlXCI6IHtcbiAgICBcImxpZ25lMVwiOiBcIkdyb3VwZSBEQS1UTyBlc3QgdW5lIGVudHJlcHJpc2UgZ3VpbsOpZW5uZSBzcMOpY2lhbGlzw6llIGRhbnMgbGUgQlRQLCBsZSBkw6l2ZWxvcHBlbWVudCBmb25jaWVyIGV0IGzigJlpbW1vYmlsaWVyLlwiLFxuICAgIFwibGlnbmUyXCI6IFwiTm91cyBjb25jZXZvbnMsIGTDqXZlbG9wcG9ucyBldCByw6lhbGlzb25zIGRlcyBwcm9qZXRzIHF1aSBjcsOpZW50IGRlIGxhIHZhbGV1ciBkdXJhYmxlLlwiXG4gIH0sXG4gIFwicG9sZXNcIjoge1xuICAgIFwiZXllYnJvd1wiOiBcIkV4cGVydGlzZVwiLFxuICAgIFwidGl0cmVcIjogXCJOb3MgMyBQw7RsZXMgZOKAmUFjdGl2aXTDqVwiLFxuICAgIFwiaXRlbXNcIjogW1xuICAgICAge1xuICAgICAgICBcImlkXCI6IFwicG9sZS1idHBcIixcbiAgICAgICAgXCJ0aXRyZVwiOiBcIkJUUCAmIEluZnJhc3RydWN0dXJlc1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IFwicG9sZS1mb25jaWVyXCIsXG4gICAgICAgIFwidGl0cmVcIjogXCJEw6l2ZWxvcHBlbWVudCBGb25jaWVyICYgQW3DqW5hZ2VtZW50XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJwb2xlLWltbW9iaWxpZXJcIixcbiAgICAgICAgXCJ0aXRyZVwiOiBcIkltbW9iaWxpZXIgJiBWYWxvcmlzYXRpb25cIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJhdG91dHNcIjoge1xuICAgIFwiZXllYnJvd1wiOiBcIk5vdHJlIGRpZmbDqXJlbmNlXCIsXG4gICAgXCJ0aXRyZVwiOiBcIlBvdXJxdW9pIG5vdXMgY2hvaXNpcsKgP1wiLFxuICAgIFwiaXRlbXNcIjogW1xuICAgICAge1xuICAgICAgICBcImlkXCI6IFwicXVhbGl0ZVwiLFxuICAgICAgICBcInRpdHJlXCI6IFwiUXVhbGl0w6lcIixcbiAgICAgICAgXCJkZXNjXCI6IFwiRGVzIHN0YW5kYXJkcyByaWdvdXJldXggw6AgY2hhcXVlIMOpdGFwZSBkZSBub3MgcHJvamV0cy5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcImR1cmFiaWxpdGVcIixcbiAgICAgICAgXCJ0aXRyZVwiOiBcIkR1cmFiaWxpdMOpXCIsXG4gICAgICAgIFwiZGVzY1wiOiBcIkRlcyBzb2x1dGlvbnMgcGVuc8OpZXMgcG91ciBkdXJlciBldCByZXNwZWN0ZXIgbOKAmWVudmlyb25uZW1lbnQuXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogXCJtYWl0cmlzZVwiLFxuICAgICAgICBcInRpdHJlXCI6IFwiTWHDrnRyaXNlXCIsXG4gICAgICAgIFwiZGVzY1wiOiBcIlVuZSBleHBlcnRpc2UgdGVjaG5pcXVlIGV0IG1hbmFnw6lyaWFsZSByZWNvbm51ZS5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiBcInZhbGV1clwiLFxuICAgICAgICBcInRpdHJlXCI6IFwiVmFsZXVyXCIsXG4gICAgICAgIFwiZGVzY1wiOiBcIkNoYXF1ZSBwcm9qZXQgY3LDqWUgdW5lIHZhbGV1ciB0YW5naWJsZSBldCBkdXJhYmxlLlwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcImNvbnRyaWJ1dGlvblwiOiB7XG4gICAgXCJleWVicm93XCI6IFwiXCIsXG4gICAgXCJ0aXRyZVwiOiBcIk5vdHJlIGNvbnRyaWJ1dGlvbiBhdSBkw6l2ZWxvcHBlbWVudCBkZSBsYSBHdWluw6llXCIsXG4gICAgXCJwYXJhMVwiOiBcIkdyb3VwZSBEQS1UTyBz4oCZZW5nYWdlIMOgIGLDonRpciB1bmUgR3VpbsOpZSBtb2Rlcm5lLCBlbiBjb250cmlidWFudCBhY3RpdmVtZW50IMOgIGxhIGNyw6lhdGlvbiBk4oCZaW5mcmFzdHJ1Y3R1cmVzIHNvbGlkZXMsIGRlIGxvZ2VtZW50cyBhY2Nlc3NpYmxlcyBldCBk4oCZZXNwYWNlcyBhbcOpbmFnw6lzIHF1aSBhbcOpbGlvcmVudCBsZSBjYWRyZSBkZSB2aWUgZGVzIHBvcHVsYXRpb25zLlwiLFxuICAgIFwicGFyYTJcIjogXCJDaGFxdWUgcHJvamV0IHF1ZSBub3VzIHLDqWFsaXNvbnMgZXN0IHVuZSBwaWVycmUgcG9zw6llIHN1ciBsZSBjaGVtaW4gZHUgZMOpdmVsb3BwZW1lbnQgZHVyYWJsZSBkZSBub3RyZSBwYXlzLlwiLFxuICAgIFwiY3RhXCI6IFwiRW4gc2F2b2lyIHBsdXNcIlxuICB9LFxuICBcImN0YUNvbnRhY3RcIjoge1xuICAgIFwiZXllYnJvd1wiOiBcIlBhc3NleiDDoCBs4oCZYWN0aW9uXCIsXG4gICAgXCJ0aXRyZVwiOiBcIlByw6p0IMOgIGNvbmNyw6l0aXNlciB2b3RyZSBwcm9qZXTCoD9cIixcbiAgICBcImRlc2NcIjogXCJOb3RyZSDDqXF1aXBlIGVzdCDDoCB2b3RyZSBkaXNwb3NpdGlvbiBwb3VyIMOpdHVkaWVyIHZvdHJlIHByb2pldCBldCB2b3VzIHByb3Bvc2VyIGxlcyBtZWlsbGV1cmVzIHNvbHV0aW9ucy5cIixcbiAgICBcImN0YVwiOiBcIkNvbnRhY3Rlei1ub3VzXCIsXG4gICAgXCJzbG9nYW5cIjogXCLigJxDb25zdHJ1aXJlIGR1cmFibGVtZW50LiBDcsOpZXIgZGUgbGEgdmFsZXVyLuKAnVwiXG4gIH1cbn0pLFxuICBcIm1ldGhvZGVcIjogKHNjaGVtYXMucGFnZXM/Lm1ldGhvZGUgPz8gc2NoZW1hcy5tZXRob2RlID8/IGlkZW50aXR5KS5wYXJzZSh7XG4gIFwiYmFubmVyXCI6IHtcbiAgICBcInRpdHJlXCI6IFwiTm90cmUgTcOpdGhvZGVcIixcbiAgICBcInNvdXNUaXRyZVwiOiBcIlVuIHByb2Nlc3N1cyByaWdvdXJldXgsIGR1IGJlc29pbiDDoCBsYSBsaXZyYWlzb25cIlxuICB9LFxuICBcImludHJvXCI6IHtcbiAgICBcImV5ZWJyb3dcIjogXCJOb3RyZSBBcHByb2NoZVwiLFxuICAgIFwidGV4dGVcIjogXCJDaGFxdWUgcHJvamV0IHF1ZSBub3VzIHLDqWFsaXNvbnMgc3VpdCB1bmUgbcOpdGhvZG9sb2dpZSBzdHJ1Y3R1csOpZSBxdWkgZ2FyYW50aXQgbGEgcXVhbGl0w6ksIGxhIG1hw650cmlzZSBkZXMgZMOpbGFpcyBldCBsYSBzYXRpc2ZhY3Rpb24gZGUgbm9zIGNsaWVudHMuXCJcbiAgfSxcbiAgXCJldGFwZXNcIjogW1xuICAgIHtcbiAgICAgIFwiaWRcIjogXCJtMVwiLFxuICAgICAgXCJudW1cIjogXCIwMVwiLFxuICAgICAgXCJ0aXRyZVwiOiBcIkNvbXByZW5kcmVcIixcbiAgICAgIFwiZGVzY1wiOiBcIk5vdXMgYW5hbHlzb25zIGxlIGJlc29pbiwgbGUgY29udGV4dGUsIGxlcyBjb250cmFpbnRlcyBldCBsZXMgb2JqZWN0aWZzIGR1IHByb2pldC5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiBcIm0yXCIsXG4gICAgICBcIm51bVwiOiBcIjAyXCIsXG4gICAgICBcInRpdHJlXCI6IFwiw4l0dWRpZXJcIixcbiAgICAgIFwiZGVzY1wiOiBcIk5vdXMgZXhhbWlub25zIGxlcyBjYXJhY3TDqXJpc3RpcXVlcyBkdSB0ZXJyYWluLCBsZXMgY29udHJhaW50ZXMgdGVjaG5pcXVlcywgbGVzIGV4aWdlbmNlcyByw6lnbGVtZW50YWlyZXMgZXQgbGVzIGRpZmbDqXJlbnRlcyBvcHRpb25zIGVudmlzYWdlYWJsZXMuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogXCJtM1wiLFxuICAgICAgXCJudW1cIjogXCIwM1wiLFxuICAgICAgXCJ0aXRyZVwiOiBcIkNvbmNldm9pclwiLFxuICAgICAgXCJkZXNjXCI6IFwiTm91cyByZWNoZXJjaG9ucyBkZXMgc29sdXRpb25zIGFkYXB0w6llcyDDoCBsYSBkZXN0aW5hdGlvbiBkdSBwcm9qZXQsIMOgIHNvbiBlbnZpcm9ubmVtZW50IGV0IGF1eCBtb3llbnMgZGlzcG9uaWJsZXMuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogXCJtNFwiLFxuICAgICAgXCJudW1cIjogXCIwNFwiLFxuICAgICAgXCJ0aXRyZVwiOiBcIlBsYW5pZmllclwiLFxuICAgICAgXCJkZXNjXCI6IFwiTm91cyBkw6lmaW5pc3NvbnMgbGVzIGRpZmbDqXJlbnRlcyDDqXRhcGVzIGR1IHByb2pldCwgbGVzIHJlc3NvdXJjZXMgbsOpY2Vzc2FpcmVzLCBsZXMgZMOpbGFpcyBldCBsZXMgbW9kYWxpdMOpcyBkZSBzdWl2aS5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiBcIm01XCIsXG4gICAgICBcIm51bVwiOiBcIjA1XCIsXG4gICAgICBcInRpdHJlXCI6IFwiRXjDqWN1dGVyXCIsXG4gICAgICBcImRlc2NcIjogXCJOb3VzIGNvb3Jkb25ub25zIGxhIHLDqWFsaXNhdGlvbiBkZXMgdHJhdmF1eCBkYW5zIGxlIHJlc3BlY3QgZGVzIGV4aWdlbmNlcyBkw6lmaW5pZXMuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogXCJtNlwiLFxuICAgICAgXCJudW1cIjogXCIwNlwiLFxuICAgICAgXCJ0aXRyZVwiOiBcIkNvbnRyw7RsZXJcIixcbiAgICAgIFwiZGVzY1wiOiBcIk5vdXMgc3Vpdm9ucyBsJ2F2YW5jZW1lbnQsIGxhIHF1YWxpdMOpLCBsZXMgY2/Du3RzLCBsZXMgZMOpbGFpcyBldCBsZXMgw6l2ZW50dWVsbGVzIGRpZmZpY3VsdMOpcyByZW5jb250csOpZXMuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogXCJtN1wiLFxuICAgICAgXCJudW1cIjogXCIwN1wiLFxuICAgICAgXCJ0aXRyZVwiOiBcIkxpdnJlclwiLFxuICAgICAgXCJkZXNjXCI6IFwiTm91cyB2ZWlsbG9ucyDDoCBjZSBxdWUgbGUgcsOpc3VsdGF0IGZpbmFsIGNvcnJlc3BvbmRlIGF1eCBleGlnZW5jZXMgY29udmVudWVzIGV0IGF1eCBvYmplY3RpZnMgZHUgcHJvamV0LlwiXG4gICAgfVxuICBdXG59KSxcbn07XG5leHBvcnQgY29uc3QgYWJvdXQgPSBwYWdlcy5hYm91dDtcbmV4cG9ydCBjb25zdCBhY3Rpdml0ZXMgPSBwYWdlcy5hY3Rpdml0ZXM7XG5leHBvcnQgY29uc3QgYWN0dWFsaXRlcyA9IHBhZ2VzLmFjdHVhbGl0ZXM7XG5leHBvcnQgY29uc3QgY29udGFjdCA9IHBhZ2VzLmNvbnRhY3Q7XG5leHBvcnQgY29uc3QgZW5nYWdlbWVudHMgPSBwYWdlcy5lbmdhZ2VtZW50cztcbmV4cG9ydCBjb25zdCBob21lID0gcGFnZXMuaG9tZTtcbmV4cG9ydCBjb25zdCBtZXRob2RlID0gcGFnZXMubWV0aG9kZTtcblxuaWYgKGltcG9ydC5tZXRhLmhvdCkge1xuICBpbXBvcnQubWV0YS5ob3QuYWNjZXB0KCgpID0+IHtcbiAgICBpbXBvcnQubWV0YS5ob3QuaW52YWxpZGF0ZSgpO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUN4TSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3JFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDalYsQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztBQUNuSyxDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUTtBQUNyRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhO0FBQzVFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZUFBZTtBQUM3RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3pGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTO0FBQy9ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXO0FBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVztBQUNwRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPO0FBQzlFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNkLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87QUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVE7QUFDN0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTtBQUMvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO0FBQzlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7QUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztBQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO0FBQzlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO0FBQzNELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ3hELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUM7QUFDNUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzlELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQzFMLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2pGLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUMxUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztBQUNqSCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUN4TCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0FBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztBQUNsSCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxD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QUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRztBQUN0RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU87QUFDM0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVztBQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRO0FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7QUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPO0FBQ3RELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVk7QUFDNUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVE7QUFDbkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxSixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVztBQUN6RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVM7QUFDcEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVztBQUN6RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNO0FBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYTtBQUNsRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXO0FBQ2hGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3BGLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUTtBQUN2RCxDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hMLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTTtBQUMxQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7QUFDeEUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWE7QUFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDeEUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNO0FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFDRixDQUFDLENBQUM7QUFDRixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMzRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDdEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNO0FBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ2hELENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO0FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7QUFDaEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7QUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7QUFDakMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUTtBQUMxQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtBQUM5QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFhO0FBQ2pELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU07QUFDNUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSTtBQUNoRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUM1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVTtBQUMxRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVO0FBQzdELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZUFBZTtBQUMvQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZTtBQUM1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYztBQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXO0FBQzdDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTztBQUN6QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTO0FBQ3pELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztBQUN2RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUs7QUFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU87QUFDdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDdkYsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQzFGLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7QUFDekMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQ3ZHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDN0gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUNqSCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQ3hGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQztBQUM3RixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUN4SCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBQzlILENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFDbEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVk7QUFDM0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztBQUN4QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUs7QUFDdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTO0FBQzVDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPO0FBQ3JDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVO0FBQ3RELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7QUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xJLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7QUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0FBQ3BFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO0FBQ3JDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTztBQUMzQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVM7QUFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVk7QUFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNO0FBQ2pDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNyQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU07QUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDO0FBQ0YsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDbEUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNWLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ3pELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztBQUMzQixDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQztBQUN0QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMzSixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7QUFDN0ksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ3BJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1SCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ3BHLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZTtBQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRO0FBQ3JELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVk7QUFDM0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDdkUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztBQUMvRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDakUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbE8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFILENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJO0FBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDaEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkgsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQzNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVELENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQzNFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUztBQUNsRSxDQUFDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQ2xLLENBQUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUMzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQ2pHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2pCLENB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LElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ2xHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDMUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztBQUN2SCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDdkgsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUNGLENBQUMsQ0FBQztBQUNGLENBQUM7QUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVTtBQUMxQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU87QUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXO0FBQzVDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSTtBQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU87O0FBRXBDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSjsifQ==