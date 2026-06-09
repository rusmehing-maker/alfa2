import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const PORT = 3000;
const LEADS_FILE = path.join(process.cwd(), "leads.json");

// Helper elements for local leads persistence
function readLeads(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, "utf-8");
      return JSON.parse(data || "[]");
    }
  } catch (err) {
    console.error("Error reading leads file:", err);
  }
  return [];
}

function writeLeads(leads: any[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing leads file:", err);
  }
}

// Lazy-loaded GoogleGenAI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI functions will run in demo/fallback mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "DEMO_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoints

  // 1. Submit contact lead
  app.post("/api/leads", (req: Request, res: Response) => {
    try {
      const { name, email, phone, projectType, budget, description } = req.body;

      if (!name || !email) {
        res.status(400).json({ error: "Имя и Email обязательны для заполнения" });
        return;
      }

      const leads = readLeads();
      const newLead = {
        id: "lead_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        name,
        email,
        phone: phone || "",
        projectType: projectType || "Не указан",
        budget: budget || "Не указан",
        description: description || "",
        status: "Новый", // Новый, В обработке, Завершен, Отклонен
        date: new Date().toISOString(),
      };

      leads.push(newLead);
      writeLeads(leads);

      res.status(201).json({ success: true, lead: newLead });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Ошибка сервера при добавлении заявки" });
    }
  });

  // 2. Fetch all leads (CRM Dashboard)
  app.get("/api/leads", (req: Request, res: Response) => {
    try {
      const leads = readLeads();
      res.json({ leads });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Ошибка при чтении заявок" });
    }
  });

  // 3. Update lead status
  app.patch("/api/leads/:id", (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        res.status(400).json({ error: "Укажите статус для обновления" });
        return;
      }

      const leads = readLeads();
      const index = leads.findIndex((l) => l.id === id);

      if (index === -1) {
        res.status(404).json({ error: "Заявка не найдена" });
        return;
      }

      leads[index].status = status;
      writeLeads(leads);

      res.json({ success: true, lead: leads[index] });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Ошибка обновления статуса" });
    }
  });

  // 4. Delete lead
  app.delete("/api/leads/:id", (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const leads = readLeads();
      const filtered = leads.filter((l) => l.id !== id);

      if (leads.length === filtered.length) {
        res.status(404).json({ error: "Заявка не найдена" });
        return;
      }

      writeLeads(filtered);
      res.json({ success: true, message: "Заявка удалена" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Ошибка удаления заявки" });
    }
  });

  // 5. CRM Stats Summary
  app.get("/api/leads/stats", (req: Request, res: Response) => {
    try {
      const leads = readLeads();
      const stats = {
        total: leads.length,
        new: leads.filter((l) => l.status === "Новый").length,
        processing: leads.filter((l) => l.status === "В обработке").length,
        completed: leads.filter((l) => l.status === "Завершен").length,
        rejected: leads.filter((l) => l.status === "Отклонен").length,
        projectTypes: leads.reduce((acc: any, l) => {
          acc[l.projectType] = (acc[l.projectType] || 0) + 1;
          return acc;
        }, {}),
      };
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Ошибка при получении статистики" });
    }
  });

  // 6. AI Consultation API Route (server-side Gemini)
  app.post("/api/ai/consult", async (req: Request, res: Response) => {
    try {
      const { prompt, chatHistory } = req.body;

      if (!prompt) {
        res.status(400).json({ error: "Запрос не передан" });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback simulated AI mode when key is absent
        setTimeout(() => {
          let simulatedText = "Привет! Я ваш ИИ-консультант по 3D-дизайну от studio 3dvisualAP. К сожалению, API-ключ не настроен, но я могу сказать, что для вашего проекта отлично подойдет современный минималистичный стиль с теплыми деревянными акцентами и панорамным освещением.";
          if (prompt.toLowerCase().includes("цена") || prompt.toLowerCase().includes("стоимость")) {
            simulatedText = "Стоимость визуализации экстерьера начинается от $20/кв.м, интерьера — от $15/кв.м. 3D моделирование объектов — от $150. Напишите нам через контактную форму, и мы подготовим детальный расчет бюджетов!";
          }
          res.json({ text: simulatedText });
        }, 1200);
        return;
      }

      const ai = getGeminiClient();

      // System instruction defining the 3dvisualAP CRM consultant persona
      const systemInstruction = `
        Вы — интеллектуальный ИИ-ассистент премиальной студии 3D визуализации и моделирования "3dvisualAP".
        Ваша цель — консультировать потенциальных клиентов по услугам студии, помогать выбирать стилистические решения (минимализм, брутализм, скандинавский, хай-тек, классика),
        материалы, освещение и ориентировать по стоимости/срокам.
        
        Наши услуги и прайс-лист:
        1. Визуализация экстерьеров (дом, ЖК, коттедж): от $20 за кв.м. Срок: 5-7 дней.
        2. Визуализация интерьеров (квартиры, лофты, коммерческие): от $15 за кв.м. Срок: 3-5 дней.
        3. Сложное 3D моделирование техники, мебели, предметов: от $150 за объект. Срок: 2-4 дня.
        4. Видеоанимация & Виртуальные прогулки (Walkthrough): от $40 за секунду. Срок: 10-14 дней.
        
        Стиль ответов: роскошный, вежливый, профессиональный, четкий.
        Отвечайте на русском языке. Будьте кратки, структурированы и вдохновляйте клиента заказать расчет проекта.
      `;

      // Structure contents with history support
      const formattedContents: any[] = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        chatHistory.slice(-6).forEach((msgObj: any) => {
          formattedContents.push({
            role: msgObj.role === "assistant" ? "model" : "user",
            parts: [{ text: msgObj.content }],
          });
        });
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: prompt }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text || "Извините, не удалось сформировать ответ." });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.json({
        text: "Привет! Я ИИ-консультант 3dvisualAP. В данный момент сервис перегружен, но мы гарантируем безупречное качество визуализации. Пожалуйста, отправьте ваши контакты через форму выше, и наш основатель свяжется с вами лично!",
      });
    }
  });

  // Serve Frontend Assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[3DVISUALAP SERVER] Running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
