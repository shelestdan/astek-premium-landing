export interface NavigationItem {
  href: string;
  label: string;
}

export interface ManifestoFact {
  label: string;
  value: string;
}

export interface CredibilityFact {
  label: string;
  value: string;
  note: string;
}

export interface ResidenceCase {
  tag: string;
  title: string;
  location: string;
  summary: string;
  details: string[];
  image: string;
  treatment: "washed" | "natural";
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
}

export interface StandardNote {
  title: string;
  description: string;
}

export interface ConsultationNote {
  label: string;
  value: string;
}

export type ProjectType = "Дом с нуля" | "Реконструкция" | "Генподряд";

export type BudgetRange = "до 50 млн" | "50–100 млн" | "100–200 млн" | "200+ млн";

export interface LeadFormValues {
  name: string;
  phone: string;
  projectType: ProjectType;
  region: string;
  budgetRange: BudgetRange;
  message: string;
  consent: boolean;
}
