import { PortfolioProject, ServiceItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "exterior",
    title: "Exterior Visualization",
    description: "Фотореалистичные экстерьеры зданий, жилых комплексов и коммерческих центров. Передаем величие архитектуры при любом освещении.",
    price: "от $20 / кв.м",
    timeline: "5-7 рабочих дней"
  },
  {
    id: "interior",
    title: "Interior Visualization",
    description: "Детализированные интерьеры квартир, лофтов, шоурумов и офисов, с высокой точностью передающие особенности премиальных материалов.",
    price: "от $15 / кв.м",
    timeline: "3-5 рабочих дней"
  },
  {
    id: "modeling",
    title: "3D Modeling",
    description: "Создание высокополигональных цифровых моделей мебели, декора, деталей техники или сложных органических объектов премиум класса.",
    price: "от $150 / модель",
    timeline: "2-4 рабочих дня"
  },
  {
    id: "animation",
    title: "Animation & Walkthrough",
    description: "Динамичные презентационные видеоролики и интерактивные туры, позволяющие заглянуть внутрь вашего еще не построенного проекта.",
    price: "от $40 / сек",
    timeline: "10-14 рабочих дней"
  }
];

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: "russian-castle",
    title: "Ажурный Терем ХХI века",
    category: "Exterior Visualization",
    image: "/src/assets/images/hero_3d_castle_1781009950794.png",
    description: "Инновационная деревянная резиденция, объединяющая исконно русские узоры терема с современными тенденциями эко-архитектуры и светового дизайна.",
    sqm: 450,
    materialsPossible: ["Лиственница", "Кедр", "Золотая сталь", "Маренная сосна"],
    currentMaterial: "Лиственница",
    year: "2026"
  },
  {
    id: "modern-villa",
    title: "Villa Sunset Horizon",
    category: "Exterior Visualization",
    image: "/src/assets/images/exterior_modern_villa_1781009969887.png",
    description: "Бруталистская монолитная вилла из патинированного бетона и закаленного стекла, гармонично вписанная в крутой склон с панорамным видом на океан.",
    sqm: 680,
    materialsPossible: ["Микроцемент", "Кортен-сталь", "Травертин", "Шлифованный гранит"],
    currentMaterial: "Микроцемент",
    year: "2025"
  },
  {
    id: "luxury-loft",
    title: "Marble Essence Penthouse",
    category: "Interior Visualization",
    image: "/src/assets/images/interior_luxury_loft_1781009986606.png",
    description: "Интерьер двухэтажного пентхауса с акцентом на природный черный мрамор Sahara Noir, полированную латунь и кастомизированное акцентное освещение.",
    sqm: 210,
    materialsPossible: ["Sahara Noir", "Калакатта", "Темный дуб", "Латунь шлифованная"],
    currentMaterial: "Sahara Noir",
    year: "2025"
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Брифинг",
    description: "Изучаем ваши материалы: CAD-чертежи, планы, мудборды и определяем точные бизнес-задачи вашего рендеринга."
  },
  {
    step: "02",
    title: "Концепция",
    description: "Предлагаем ракурсы камер, базовое пространственное распределение, стили мебели и световые сценарии."
  },
  {
    step: "03",
    title: "3D Моделирование",
    description: "Воссоздаем геометрию здания и окружающего ландшафта с микронной точностью согласно CAD-спецификациям."
  },
  {
    step: "04",
    title: "Визуализация",
    description: "Настраиваем физически точные шейдеры материалов, фотореалистичную дисперсию света и атмосферные эффекты (туман, дымка)."
  },
  {
    step: "05",
    title: "Финал",
    description: "Рендеринг в разрешении 4К/8К, цветокоррекция в DaVinci/Photoshop, итоговая передача пакета исходников клиенту."
  }
];
