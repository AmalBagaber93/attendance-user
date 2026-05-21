export interface Theme {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundGradient?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavConfig {
  links?: NavLink[];
  ctaText?: string;
  ctaLink?: string;
}

export interface HeroSection {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image?: string;
  imageAlt?: string;
  location?: string;
}

export interface FeatureCard {
  id: string;
  icon?: string;
  title: string;
  description: string;
}

export interface Speaker {
  id: string;
  name: string;
  role?: string;
  company?: string;
  bio?: string;
  topic?: string;
  avatar?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo?: string;
  tier?: "platinum" | "gold" | "silver" | "bronze";
  website?: string;
}

export interface ScheduleItem {
  id: string;
  dayLabel?: string;
  time?: string;
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary' | 'default';
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutSection {
  title?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  stats?: Stat[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatar?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo?: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  brandName?: string;
  brandLogo?: string;
  tagline?: string;
  copyright?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

export interface CtaSection {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
}

export interface LandingPageConfig {
  siteTitle?: string;
  logoText?: string;
  logoImage?: string;
  theme?: Theme;
  nav?: NavConfig;
  hero?: HeroSection;
  features?: FeatureCard[];
  speakers?: Speaker[];
  sponsors?: Sponsor[];
  about?: AboutSection;
  schedule?: ScheduleItem[];
  testimonials?: Testimonial[];
  clientLogos?: ClientLogo[];
  cta?: CtaSection;
  footer?: FooterSection;
}

export const defaultConfig: LandingPageConfig = {
  siteTitle: 'InnovateX',
  logoText: 'InnovateX',
  theme: {
    primaryColor: '#3525cd',
    secondaryColor: '#006c49',
    accentColor: '#960014',
    backgroundGradient: '',
  },
  nav: {
    links: [
      { label: 'Schedule', href: '#schedule' },
      { label: 'Speakers', href: '#speakers' },
      { label: 'Sponsors', href: '#sponsors' },
      { label: 'Register', href: '/register' },
    ],
    ctaText: 'Sign In',
    ctaLink: '#',
  },
  hero: {
    badge: 'NOVEMBER 15–17, 2024',
    title: 'Architecting the',
    titleHighlight: 'Intelligent Future.',
    subtitle:
      'The premier 48-hour high-stakes hackathon for developers, designers, and visionaries building with next-gen AI and spatial computing.',
    ctaText: 'Register Now',
    ctaLink: '/register',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '#features',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
    imageAlt:
      'A sleek, modern innovation hub interior during a high-tech event.',
    location: 'Tech Innovation Hub, San Francisco',
  },
  speakers: [
    {
      id: '1',
      name: 'Dr. Priya Nair',
      role: 'VP of AI Research',
      company: 'OpenFrontier',
      bio: 'Pioneer in large-scale language models and responsible AI deployment.',
      topic: 'The Next Frontier of Generative AI',
    },
    {
      id: '2',
      name: 'James Okafor',
      role: 'Co-founder & CEO',
      company: 'SpatialOS',
      bio: 'Built the infrastructure powering spatial computing for 50M+ users worldwide.',
      topic: 'Spatial Computing in Practice',
    },
    {
      id: '3',
      name: 'Lena Hoffman',
      role: 'Principal Engineer',
      company: 'DeepSystems',
      bio: 'Led the team behind award-winning real-time inference at the edge.',
      topic: 'Edge AI Architecture',
    },
    {
      id: '4',
      name: 'Carlos Mendez',
      role: 'General Partner',
      company: 'Horizon Ventures',
      bio: 'Early investor in 12 unicorn startups. Passionate about founder-led innovation.',
      topic: 'From Hackathon to Series A',
    },
    {
      id: '5',
      name: 'Yuki Tanaka',
      role: 'Head of Developer Relations',
      company: 'Anthropic',
      bio: 'Helps thousands of developers build with cutting-edge AI tools and APIs.',
      topic: 'Building Responsibly with LLMs',
    },
    {
      id: '6',
      name: 'Amara Diallo',
      role: 'CTO',
      company: 'NeuroLink Labs',
      bio: 'Expert in brain-computer interfaces and next-generation human-machine interaction.',
      topic: 'HCI Beyond the Screen',
    },
  ],
  sponsors: [
    { id: '1', name: 'NeuralCore', tier: 'platinum' },
    { id: '2', name: 'QuantumLeap', tier: 'platinum' },
    { id: '3', name: 'SynthAI', tier: 'gold' },
    { id: '4', name: 'CloudNexus', tier: 'gold' },
    { id: '5', name: 'DataForge', tier: 'gold' },
    { id: '6', name: 'SparkLabs', tier: 'silver' },
    { id: '7', name: 'DevBridge', tier: 'silver' },
    { id: '8', name: 'OpenStack', tier: 'bronze' },
    { id: '9', name: 'ByteWave', tier: 'bronze' },
    { id: '10', name: 'CodePath', tier: 'bronze' },
  ],
  about: {
    title: 'Where Builders Become Founders',
    body: "InnovateX is more than a hackathon — it's the starting line for the next generation of world-changing companies. We bring together the brightest technical minds and pair them with the resources, mentorship, and community they need to ship in 48 hours and beyond.",
    stats: [
      { value: '2,000+', label: 'Participants' },
      { value: '50+', label: 'Mentors' },
      { value: '$2M+', label: 'Raised by Alumni' },
      { value: '6', label: 'Past Editions' },
    ],
  },
  schedule: [
    {
      id: '1',
      dayLabel: 'FRIDAY, NOV 15',
      time: '6:00 PM',
      title: 'Opening Ceremony & Keynote',
      description:
        'Official kickoff, team formation, and theme unveiling with industry legends.',
      variant: 'primary',
    },
    {
      id: '2',
      dayLabel: 'SATURDAY, NOV 16',
      time: '10:00 AM',
      title: 'Mentor Office Hours',
      description:
        'Get direct feedback on your architecture and pitch from our panel of experts.',
      variant: 'default',
    },
    {
      id: '3',
      dayLabel: 'SUNDAY, NOV 17',
      time: '2:00 PM',
      title: 'Final Presentations',
      description:
        'Top 10 teams pitch their solutions to the judges on the main stage.',
      variant: 'default',
    },
    {
      id: '4',
      dayLabel: 'SUNDAY, NOV 17',
      time: '5:00 PM',
      title: 'Grand Awards Ceremony',
      description:
        'Announcement of winners, distribution of the $50k prize pool, and closing party.',
      variant: 'secondary',
    },
  ],
  testimonials: [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Co-founder & CTO',
      company: 'NeuralStack',
      quote:
        'InnovateX was the catalyst for our company. We met our co-founder here, won the top prize, and closed our seed round three months later.',
    },
    {
      id: '2',
      name: 'Marcus Rivera',
      role: 'Senior Engineer',
      company: 'Google DeepMind',
      quote:
        'The quality of mentors and participants is unmatched. I come back every year — either to compete or to give back as a mentor.',
    },
    {
      id: '3',
      name: 'Aisha Patel',
      role: 'Product Lead',
      company: 'Anthropic',
      quote:
        "The 48-hour format forces you to make bold decisions quickly. It's the best simulation of the real startup grind you'll find anywhere.",
    },
  ],
  cta: {
    title: 'Ready to Build the Future?',
    subtitle:
      'Applications are open for limited spots. Join the most intense innovation event of the year.',
    buttonText: 'Register Now',
    buttonLink: '#registration',
    secondaryText: 'Download Info Pack',
    secondaryLink: '#',
  },
  footer: {
    brandName: 'InnovateX',
    tagline: 'Building the future, 48 hours at a time.',
    copyright: '© 2024 InnovateX. All rights reserved.',
    links: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Code of Conduct', href: '#' },
      { label: 'Support', href: '#' },
    ],
    socialLinks: [
      { platform: 'Twitter / X', href: '#', icon: 'alternate_email' },
      { platform: 'LinkedIn', href: '#', icon: 'business_center' },
      { platform: 'GitHub', href: '#', icon: 'code' },
    ],
    contact: {
      email: 'hello@innovatex.dev',
    },
  },
};

export async function fetchLandingConfig(): Promise<LandingPageConfig> {
  // Replace with a real API call, e.g.:
  // const res = await fetch('https://api.example.com/landing-config', { next: { revalidate: 3600 } });
  // if (!res.ok) return defaultConfig;
  // const remote = await res.json();
  // return mergeWithDefaults(remote);
  return defaultConfig;
}

export function mergeWithDefaults(
  remote: Partial<LandingPageConfig>,
): LandingPageConfig {
  return {
    ...defaultConfig,
    ...remote,
    theme: { ...defaultConfig.theme, ...remote.theme },
    nav: { ...defaultConfig.nav, ...remote.nav },
    hero: { ...defaultConfig.hero, ...remote.hero },
    about: { ...defaultConfig.about, ...remote.about },
    cta: { ...defaultConfig.cta, ...remote.cta },
    footer: { ...defaultConfig.footer, ...remote.footer },
    speakers:
      remote.speakers && remote.speakers.length > 0
        ? remote.speakers
        : defaultConfig.speakers,
    sponsors:
      remote.sponsors && remote.sponsors.length > 0
        ? remote.sponsors
        : defaultConfig.sponsors,
    features:
      remote.features && remote.features.length > 0
        ? remote.features
        : defaultConfig.features,
    schedule:
      remote.schedule && remote.schedule.length > 0
        ? remote.schedule
        : defaultConfig.schedule,
    testimonials:
      remote.testimonials && remote.testimonials.length > 0
        ? remote.testimonials
        : defaultConfig.testimonials,
  };
}
