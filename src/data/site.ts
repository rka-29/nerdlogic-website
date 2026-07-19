import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Cloud,
  CreditCard,
  MapPin,
  Rocket,
  Smartphone,
  Zap,
} from "lucide-react";

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
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
    href: "#services",
  },
  {
    title: "AI & Automation",
    description:
      "Conversational forms, voice UI, and OpenAI Realtime API integrations.",
    icon: BrainCircuit,
    href: "#services",
  },
  {
    title: "Fintech & Payments",
    description:
      "POS/ EMV/ ISO 8583 integrations and Bahrain payment rails.",
    icon: CreditCard,
    href: "#services",
  },
  {
    title: "Web & Cloud Solutions",
    description:
      "Next.js, Supabase, and AI-ready scalable backends and admin dashboards.",
    icon: Cloud,
    href: "#services",
  },
];

export type ProductStatus = "in-development" | "coming-soon";

export type ProductItem = {
  name: string;
  status: ProductStatus;
  statusLabel: string;
  description: string;
  tags: string[];
  href: string;
};

export const products: ProductItem[] = [
  {
    name: "Yomna",
    status: "in-development",
    statusLabel: "IN DEVELOPMENT",
    description:
      "A unified productivity platform that brings calendars, tasks, projects, and AI-powered planning into one intelligent workspace, helping users organize their day with clarity and focus.",
    tags: ["Flutter", "Cross Platform", "Productivity"],
    href: "#products",
  },
  {
    name: "SARE3",
    status: "coming-soon",
    statusLabel: "COMING SOON",
    description:
      "Premium delivery app built with Flutter. Neon-dark UI, real-time tracking, and fintech-ready payments, our flagship in-house product.",
    tags: ["Flutter", "Neon-dark UI", "Delivery"],
    href: "#products",
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
