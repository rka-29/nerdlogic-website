import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Cloud,
  CreditCard,
  Cuboid,
  Lightbulb,
  MapPin,
  Palette,
  Rocket,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
] as const;

export const footerLinks = [
  ...navLinks,
  { label: "Contact", href: "/contact" },
] as const;

export type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  glow: "blue" | "cyan" | "white";
};

export const features: FeatureItem[] = [
  {
    title: "Fintech Depth",
    description: "POS, EMV & payment rails",
    icon: CreditCard,
    glow: "blue",
  },
  {
    title: "IOS - Native Excellence",
    description: "Dynamic Island & Live Activities",
    icon: Smartphone,
    glow: "cyan",
  },
  {
    title: "AI Engineering",
    description: "Voice UI & Conversational",
    icon: BrainCircuit,
    glow: "white",
  },
  {
    title: "Bahrain Native",
    description: "Local market, global standards",
    icon: MapPin,
    glow: "blue",
  },
  {
    title: "Fast MVP Execution",
    description: "Weeks to App Store, not months",
    icon: Zap,
    glow: "cyan",
  },
  {
    title: "Client + Product Mindset",
    description: "We ship our own apps too",
    icon: Rocket,
    glow: "white",
  },
];

export type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const services: ServiceItem[] = [
  {
    title: "Mobile Applications",
    description:
      "Flutter, iOS-first builds with Dynamic Island, Live Activities, and native polish.",
    icon: Smartphone,
    href: "/services",
  },
  {
    title: "AI & Automation",
    description:
      "Conversational forms, voice UI, and OpenAI Realtime API integrations.",
    icon: BrainCircuit,
    href: "/services",
  },
  {
    title: "Fintech & Payments",
    description:
      "POS/ EMV/ ISO 8583 integrations and Bahrain payment rails.",
    icon: CreditCard,
    href: "/services",
  },
  {
    title: "Web & Cloud Solutions",
    description:
      "Next.js, Supabase, and AI-ready scalable backends and admin dashboards.",
    icon: Cloud,
    href: "/services",
  },
];

export type DetailedService = {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
};

export const detailedServices: DetailedService[] = [
  {
    title: "Product Strategy",
    description:
      "We help transform ideas into successful digital products through research, strategy, and product planning. By understanding user needs and business goals, we create clear roadmaps that guide every stage of development.",
    icon: Cuboid,
    tags: [
      "User Research",
      "Product Discovery",
      "Market Validation",
      "Competitor Analysis",
      "MVP Strategy",
      "Product Roadmapping",
    ],
  },
  {
    title: "Brand Identity",
    description:
      "A strong brand is more than just a logo. It's how people recognize, trust, and connect with your business. We create memorable visual identities that communicate your values and build consistency across every touchpoint.",
    icon: Lightbulb,
    tags: [
      "Brand Strategy",
      "Logo Design",
      "Visual Identity",
      "Brand Applications",
      "Brand Guidelines",
      "Typography Systems",
    ],
  },
  {
    title: "UX/ UI Design",
    description:
      "Exceptional digital products begin with exceptional user experiences. We design intuitive user journeys and visually engaging interfaces that combine usability, accessibility, and modern design to create seamless digital experiences.",
    icon: Palette,
    tags: [
      "User Experience Design",
      "User Interface Design",
      "Design Systems",
      "Wireframing",
      "Interactive Prototyping",
      "Usability Testing",
    ],
  },
  {
    title: "Web Development",
    description:
      "Your website is often the first impression of your brand. We design and develop responsive websites and web applications that combine modern design, high performance, and scalability to support your business goals.",
    icon: Cloud,
    tags: [
      "Landing Pages",
      "Corporate Websites",
      "E-commerce",
      "CMS Integration",
      "Custom Web Applications",
      "Frontend & Backend Development",
    ],
  },
  {
    title: "Mobile Applications",
    description:
      "We build modern mobile applications for iOS and Android that combine seamless user experiences with scalable, high-performance development. Every app is designed for reliability, flexibility, and long-term growth.",
    icon: Smartphone,
    tags: [
      "Flutter Development",
      "Native Mobile Experiences",
      "Cross-Platform Apps",
      "App Store Deployment",
      "API Integrations",
      "Application Maintenance",
    ],
  },
  {
    title: "Custom Software",
    description:
      "Every business has unique challenges that require tailored solutions. We design and develop custom software that streamlines operations, improves efficiency, and scales with your business as it grows.",
    icon: Workflow,
    tags: [
      "Business Management Systems",
      "Internal Portals",
      "CRM Solutions",
      "Booking Platforms",
      "Dashboard Systems",
      "Workflow Automation",
    ],
  },
  {
    title: "AI Automation",
    description:
      "We develop AI-powered solutions that automate repetitive tasks, improve decision-making, and create smarter digital experiences. From conversational assistants to intelligent workflows, we help businesses operate more efficiently.",
    icon: BrainCircuit,
    tags: [
      "Conversational AI",
      "Voice Interfaces",
      "AI Chatbots",
      "Workflow Automation",
      "Custom AI Solutions",
      "OpenAI Integration",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "We design secure cloud infrastructures that provide the performance, reliability, and flexibility modern applications demand. Our solutions are built to scale with your business while ensuring long-term stability and security.",
    icon: Cloud,
    tags: [
      "API Development",
      "Cloud Architecture",
      "Authentication Systems",
      "Database Design",
      "Hosting & Deployment",
      "Performance Optimization",
    ],
  },
  {
    title: "Fintech and Payments",
    description:
      "We build secure payment solutions and fintech platforms that enable seamless digital transactions, combining modern technology with reliable, scalable infrastructure.",
    icon: CreditCard,
    tags: [
      "POS Systems",
      "Payment Gateway Integration",
      "BenefitPay Integration",
      "ISO 8583 Integration",
      "Digital Wallets",
      "Financial Dashboards",
    ],
  },
];

export type ProductStatus = "in-development" | "coming-soon";

export type ProductItem = {
  name: string;
  slug: string;
  status: ProductStatus;
  statusLabel: string;
  category: string;
  description: string;
  shortDescription: string;
  tags: string[];
  href: string;
};

export const products: ProductItem[] = [
  {
    name: "Yomna",
    slug: "yomna",
    status: "in-development",
    statusLabel: "IN DEVELOPMENT",
    category: "PRODUCTIVITY PLATFORM",
    description:
      "A unified productivity platform that brings calendars, tasks, projects, and AI-powered planning into one intelligent workspace, helping users organize their day with clarity and focus.",
    shortDescription:
      "An all-in-one workspace designed to simplify planning, tasks, and productivity.",
    tags: ["Flutter", "Cross Platform", "Productivity"],
    href: "/products/yomna",
  },
  {
    name: "Saree3",
    slug: "saree3",
    status: "coming-soon",
    statusLabel: "COMING SOON",
    category: "DELIVERY APPLICATION",
    description:
      "Premium delivery app built with Flutter. Neon-dark UI, real-time tracking, and fintech-ready payments, our flagship in-house product.",
    shortDescription:
      "A premium delivery app with real-time tracking and secure fintech-ready payments.",
    tags: ["Flutter", "Neon-dark UI", "Delivery"],
    href: "/products",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "Analyze your needs and develop a tailored strategy.",
  },
  {
    number: "02",
    title: "Design & Development",
    description: "Building scalable solutions with modern technology.",
  },
  {
    number: "03",
    title: "Deploy & Optimize",
    description: "Optimizing your product for long-term success.",
  },
];

export const aboutContent = {
  watermark: "About Us",
  title: "About us",
  whoWeAreBadge: "Who we are",
  whoWeAreTitle: "Where Vision Meets Innovation",
  whoWeAreBody:
    "Nerd Logic is a Bahrain-based digital product studio creating innovative digital experiences through strategy, design, and technology. From brand identities and websites to AI-powered applications and custom software, we partner with individuals, startups, and organizations to transform ideas into scalable digital products.",
  pillars: [
    {
      title: "Mission",
      body: "To empower businesses by transforming ideas into intuitive digital experiences through innovative design, strategic thinking, and modern technology.",
      highlights: [
        "innovative design, strategic thinking, and modern technology",
      ],
    },
    {
      title: "Vision",
      body: "To become the leading creative technology hub, recognized for building innovative digital experiences that inspire businesses and shape the future of design.",
      highlights: ["innovative digital experiences"],
    },
    {
      title: "Values",
      body: "Craft over noise. Clarity over cleverness. Systems over one-offs. Long-term partnerships over transactions.",
      highlights: [
        "Craft",
        "Clarity",
        "Systems",
        "Long-term partnerships",
      ],
    },
  ],
  whyTitle: "Built Different, Built to Ship",
  whyBody:
    "Fintech depth, iOS-native craft, and AI engineering, from a team that ships its own products.",
};

export const contactInfo = {
  email: "Hello@nerdlogic.com",
  phone: "+973 12345678",
  hours: "Sat - Thu: 8 Am - 4 PM",
  location: "Manama, Bahrain",
};

export const yomnaDetail = {
  headline: "One workspace. Endless productivity.",
  overviewBadge: "Overview",
  title: "Yomna Mobile Application",
  statusLabel: "IN DEVELOPMENT",
  description:
    "Yomna is an all-in-one productivity platform that brings together calendars, tasks, projects, and AI-powered planning into a single intelligent workspace. Designed to reduce context switching and simplify daily organization, it helps users stay focused by managing everything in one seamless experience.",
  strategyBadge: "Product Strategy",
  strategyTitle: "From Challenge to Solution",
  strategyBody:
    "Discover the challenge behind modern productivity and the approach taken to create a simpler, more connected experience.",
  problem:
    "Modern productivity is fragmented across too many apps, forcing constant context switching and making it harder to stay organized.",
  approach:
    "We designed a unified workspace that brings calendars, tasks, projects, and AI planning into one calm, focused experience.",
  primaryGoal:
    "Create an all-in-one productivity platform that eliminates the need to switch between multiple applications.",
  businessObjectives: [
    "Increase productivity.",
    "Simplify daily planning.",
    "Encourage long-term engagement.",
    "Provide a scalable platform for future AI capabilities.",
  ],
  userObjectives: [
    "Reduce context switching",
    "Easily prioritize daily work.",
    "Stay organized throughout the day.",
    "Manage calendars and tasks in one place.",
  ],
  features: [
    {
      title: "Unified Dashboard",
      description: "View your entire day in one place.",
      icon: Sparkles,
    },
    {
      title: "Smart Planning",
      description: "Plan, organize, and stay on track.",
      icon: Zap,
    },
    {
      title: "Intelligent Assistant",
      description: "Let AI simplify your day",
      icon: BrainCircuit,
    },
  ],
  designTitle: "Design System",
  designBody:
    "Yomna was designed to reflect clarity, focus, and simplicity. Its clean visual language, modern typography, and intuitive interface create a calm productivity experience that helps users stay organized without unnecessary distractions.",
  impactTitle: "Impact",
  impactBody:
    "Yomna delivers meaningful improvements by simplifying daily planning, reducing complexity, and helping users stay organized, focused, and productive through one unified workspace.",
  outcomes: [
    {
      title: "Increased Productivity",
      description: "Accomplish more with streamlined daily planning.",
    },
    {
      title: "Smarter Decision-Making",
      description: "Reduce complexity with one unified platform.",
    },
    {
      title: "Better Organization",
      description: "Keep everything organized in one place.",
    },
    {
      title: "Simplified Workflows",
      description: "Prioritize tasks with intelligent insights.",
    },
  ],
};
