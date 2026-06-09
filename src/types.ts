export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  description: string;
  status: string; // "Новый" | "В обработке" | "Завершен" | "Отклонен"
  date: string;
}

export interface CrmStats {
  total: number;
  new: number;
  processing: number;
  completed: number;
  rejected: number;
  projectTypes: { [key: string]: number };
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  sqm?: number;
  materialsPossible: string[];
  currentMaterial?: string;
  year: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  timeline: string;
}
