import {
  HandHelping,
  Leaf,
  LibraryBig,
  Package,
  Sprout,
  Sun,
} from "lucide-react";

export const navLinks = [
  {
    name: "Accueil",
    href: "/",
  },
  {
    name: "Nos produits",
    href: "/product",
  },
  {
    name: "A propos",
    href: "/about",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

export const dashboardMenuLink = {
  serviceNavMain: [
    {
      title: "Service",
      url: "/dashboard/service",
      icon: HandHelping,
      isActive: true,
    },
  ],
  productNavMain: [
    {
      title: "Produit",
      url: "/dashboard/product",
      icon: Package,
      isActive: true,
    },
  ],
  supportNavMain: [
    {
      title: "Article",
      url: "/dashboard/article",
      icon: LibraryBig,
      isActive: true,
    },
  ],
};

export const products = [
  {
    name: "Manioc",
    image: "/images/manioc.jpg",
    description:
      "Une culture résiliente, transformable en produits comme la farine, l'amidon, ou le gari. Source de calories, résistance aux conditions difficiles, opportunités économiques grâce aux dérivés",
    icon: Sun,
  },
  {
    name: "Maïs",
    image: "/images/mais.jpg",
    description:
      "Une céréale polyvalente utilisée pour l'alimentation humaine, animale, et industrielle.  Base alimentaire, ingrédient clé pour l’élevage, et produit exportable.",
    icon: Sprout,
  },
  {
    name: "Poulet",
    image: "/images/poulet.jpg",
    description:
      "Une source de protéines populaire élevée pour sa viande et ses œufs. Protéines abordables, revenu pour les éleveurs, et contribution à l'économie circulaire avec les engrais naturels.",
    icon: Leaf,
  },
];

export const players = [
  {
    category: "Acteurs internes",
    items: [
      "Producteurs",
      "Collecteurs",
      "Transformateurs",
      "Transporteurs",
      "Grossistes",
      "Détaillants",
    ],
    icon: Sprout,
  },
  {
    category: "Acteurs externes",
    items: [
      "Société civiles",
      "Microfinance",
      "Banque",
      "Associations",
      "Agences gouvernementales et non gouvernementales",
    ],
    icon: Leaf,
  },
];

export const supporters = [
  {
    name: "KOICA",
    logo: "/images/koica.png",
  },
  {
    name: "MINEPIA",
    logo: "/images/minepia.jpg",
  },
  {
    name: "MINADER",
    logo: "/images/minader.jpeg",
  },
  {
    name: "MUFID",
    logo: "/images/mufid.png",
  },
];
