export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  author: {
    name: string;
    role: string;
    bio: string;
  };
  navigation: {
    main: { name: string; href: string }[];
    clusters: { name: string; href: string; description: string; count: number; icon: string }[];
    legal: { name: string; href: string }[];
  };
  adsense: {
    publisherId: string;
    enabled: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: 'CraftCalc',
  shortName: 'CraftCalc',
  tagline: 'Precision Home Improvement & DIY Calculators',
  description: 'Free, professional-grade home improvement and DIY calculators. Accurate material estimations, waste factors, cost breakdowns, and step-by-step guidance for flooring, painting, concrete, garden, and room renovations.',
  url: 'https://tool-1-pied.vercel.app',
  ogImage: '/og-image.png',
  author: {
    name: 'CraftCalc Editorial & Engineering Team',
    role: 'Licensed Contractors & Construction Estimators',
    bio: 'CraftCalc is built by experienced tradespeople and construction engineers dedicated to eliminating material waste, preventing costly DIY estimation errors, and providing transparent, verified formulas.',
  },
  navigation: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Calculators', href: '/calculators' },
      { name: 'Guides', href: '/guides' },
      { name: 'Resources', href: '/resources' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    clusters: [
      {
        name: 'Flooring',
        href: '/calculators/flooring',
        description: 'Hardwood, tile, laminate, vinyl, carpet, and waste calculations.',
        count: 6,
        icon: 'Layers',
      },
      {
        name: 'Painting',
        href: '/calculators/painting',
        description: 'Wall, ceiling, primer, and multi-coat paint coverage estimations.',
        count: 5,
        icon: 'Paintbrush',
      },
      {
        name: 'Concrete & Masonry',
        href: '/calculators/concrete-masonry',
        description: 'Slabs, footings, pre-mixed bags, bricks, blocks, and mortar volume.',
        count: 6,
        icon: 'Hammer',
      },
      {
        name: 'Garden & Outdoors',
        href: '/calculators/garden',
        description: 'Gravel, topsoil, mulch, turf grass rolls, fencing, and patios.',
        count: 6,
        icon: 'Trees',
      },
      {
        name: 'Rooms & Walls',
        href: '/calculators/rooms',
        description: 'Room surface area, square meters, wallpaper rolls, and skirting boards.',
        count: 5,
        icon: 'Home',
      },
      {
        name: 'Conversions',
        href: '/calculators/conversions',
        description: 'Imperial to metric dimension, area, volume, and weight converters.',
        count: 5,
        icon: 'ArrowRightLeft',
      },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Disclaimer', href: '/disclaimer' },
      { name: 'HTML Sitemap', href: '/sitemap' },
      { name: 'Contact Us', href: '/contact' },
    ],
  },
  adsense: {
    publisherId: '',
    enabled: false,
  },
};
