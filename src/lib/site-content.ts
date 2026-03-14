import type {
  BudgetRange,
  ConsultationNote,
  CredibilityFact,
  LeadFormValues,
  ManifestoFact,
  MethodStep,
  NavigationItem,
  ProjectType,
  ResidenceCase,
  StandardNote,
} from "@/lib/types";
import { assetPath } from "@/lib/asset-path";

export const navigation: NavigationItem[] = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#residences", label: "Residences" },
  { href: "#method", label: "Method" },
  { href: "#standards", label: "Standards" },
  { href: "#consult", label: "Consult" },
];

export const projectTypes = [
  "Дом с нуля",
  "Реконструкция",
  "Генподряд",
] as const satisfies readonly ProjectType[];

export const budgetRanges = [
  "до 50 млн",
  "50–100 млн",
  "100–200 млн",
  "200+ млн",
] as const satisfies readonly BudgetRange[];

export const projectTypeLabels: Record<ProjectType, string> = {
  "Дом с нуля": "New build",
  "Реконструкция": "Reconstruction",
  "Генподряд": "Private GC",
};

export const budgetRangeLabels: Record<BudgetRange, string> = {
  "до 50 млн": "Under 50M",
  "50–100 млн": "50M–100M",
  "100–200 млн": "100M–200M",
  "200+ млн": "200M+",
};

export const defaultLeadFormValues: LeadFormValues = {
  name: "",
  phone: "",
  projectType: "Дом с нуля",
  region: "",
  budgetRange: "100–200 млн",
  message: "",
  consent: false,
};

export const manifesto = {
  label: "Private construction atelier / Russia",
  title: "Private residences composed with architectural restraint.",
  summary:
    "Astek brings architecture, engineering, procurement and execution into one quiet line of control for bespoke homes.",
  ctaPrimary: "Request consultation",
  ctaSecondary: "View residences",
};

export const manifestoFacts: ManifestoFact[] = [
  { label: "Geography", value: "Moscow / St. Petersburg / Sochi" },
  { label: "Scope", value: "Architecture, engineering, execution" },
  { label: "Format", value: "Boutique design-build for private homes" },
];

export const credibilityFacts: CredibilityFact[] = [
  {
    label: "Years",
    value: "14+",
    note: "in premium residential construction",
  },
  {
    label: "Residences",
    value: "64",
    note: "completed or delivered through full-cycle control",
  },
  {
    label: "Geography",
    value: "RU",
    note: "Moscow region, St. Petersburg, Sochi, private estates",
  },
  {
    label: "Budgets",
    value: "180M",
    note: "average range of flagship private commissions",
  },
  {
    label: "Discipline",
    value: "97%",
    note: "of milestones closed on schedule with weekly reporting",
  },
];

export const residenceCases: ResidenceCase[] = [
  {
    tag: "Residence 01",
    title: "River Line House",
    location: "Istra / 1,850 sqm",
    summary:
      "A restrained private residence built around quiet facades, hidden systems and a deliberate family rhythm.",
    details: ["Private wellness wing", "Lutron + BMS", "Two underground levels"],
    image: assetPath("/images/project-river-premium.jpg"),
    treatment: "washed",
  },
  {
    tag: "Residence 02",
    title: "Forest Court Villa",
    location: "St. Petersburg / 1,120 sqm",
    summary:
      "A reconstructed villa with a disciplined material palette and a full engineering reset.",
    details: ["Reconstruction", "Stone + bronze", "Controlled procurement"],
    image: assetPath("/images/project-pine-villa.jpg"),
    treatment: "natural",
  },
  {
    tag: "Residence 03",
    title: "Sky Atrium Estate",
    location: "Sochi / 2,400 sqm",
    summary:
      "A hillside residence balanced between panoramic openness and construction control on a complex site.",
    details: ["Slope engineering", "Infinity waterline", "Logistics on terrain"],
    image: assetPath("/images/project-skyline-mansion.jpg"),
    treatment: "washed",
  },
];

export const methodIntro = {
  label: "Method",
  title: "Built as a clear sequence.",
  summary:
    "The client sees one quiet system of decisions. The complexity stays inside the process, not on the surface.",
  image: assetPath("/images/process-on-site.jpg"),
};

export const methodSteps: MethodStep[] = [
  {
    number: "01",
    title: "Brief and site audit",
    description: "We align goals, constraints, timeline, budget and the hidden realities of the site.",
  },
  {
    number: "02",
    title: "Concept and procurement map",
    description: "Architecture, structure, engineering and critical materials are locked into one sequence.",
  },
  {
    number: "03",
    title: "Execution with owner reporting",
    description: "Weekly reporting keeps schedule, cost and decisions visible without operational noise.",
  },
  {
    number: "04",
    title: "Commissioning and handover",
    description: "The house is transferred as a working system, not as a finished shell.",
  },
];

export const standardsIntro = {
  label: "Standards",
  title: "Premium lives in what stays quiet.",
  summary:
    "Material intelligence, hidden engineering and owner-level reporting define the standard more than decoration ever can.",
  image: assetPath("/images/interior-materials.jpg"),
};

export const standardNotes: StandardNote[] = [
  {
    title: "Invisible engineering",
    description: "Systems stay accessible for service while remaining visually absent in the architecture.",
  },
  {
    title: "Material governance",
    description: "Stone, glazing, metalwork and joinery are fixed early to protect quality and timing.",
  },
  {
    title: "Site discipline",
    description: "Logistics, marking, sequencing and quality control are treated as design decisions.",
  },
  {
    title: "Owner reporting",
    description: "Progress, budget, risk and approvals stay readable through one concise weekly loop.",
  },
];

export const founderStatement = {
  quote: "We do not sell construction as a service. We compose a calm process around a complex private asset.",
  summary:
    "Astek is structured for owners who want architectural quality and construction discipline without entering the daily noise of the site.",
  points: [
    "Private-asset mindset instead of contractor routine",
    "One line of control across design, engineering and build",
    "Detail discipline above decorative effect",
  ],
};

export const consultationSection = {
  label: "Consultation",
  title: "Begin with a precise brief.",
  summary:
    "Share the geography, project type and budget frame. The first response should feel like a concise strategic reading, not a sales script.",
  image: assetPath("/images/cta-detail.jpg"),
};

export const consultationNotes: ConsultationNote[] = [
  { label: "Territory", value: "Moscow / St. Petersburg / Sochi" },
  { label: "Format", value: "New build / reconstruction / private GC" },
  { label: "First step", value: "One consultation, one strategic outline" },
];

export const footerCopy = {
  statement:
    "Private construction atelier for bespoke residences shaped through architecture, engineering and controlled execution.",
  locations: "Moscow / St. Petersburg / Istra / Sochi",
  contactPrompt: "Open the consultation form",
};
