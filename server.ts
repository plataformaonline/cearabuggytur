import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Max body limit to allow uploading base64 or moderately sized configurations
  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ extended: true, limit: "20mb" }));

  // Ensure the /dados folder exists
  const dadosDir = path.join(process.cwd(), "dados");
  if (!fs.existsSync(dadosDir)) {
    fs.mkdirSync(dadosDir, { recursive: true });
  }

  // API Route to read JSON data
  app.get("/api/dados/:key", (req, res) => {
    const { key } = req.params;
    const filePath = path.join(process.cwd(), "dados", `${key}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: `Arquivo ${key}.json não encontrado.` });
    }

    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return res.json(JSON.parse(data));
    } catch (e: any) {
      return res.status(500).json({ error: "Erro ao ler o arquivo: " + e.message });
    }
  });

  // API Route to write JSON data
  app.post("/api/dados/:key", (req, res) => {
    const { key } = req.params;
    const { password, data } = req.body;

    // Read the password from config to validate
    const configPath = path.join(process.cwd(), "dados", "config.json");
    let adminPassword = "admin";
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        if (config.adminPassword) {
          adminPassword = config.adminPassword;
        }
      } catch (e) {
        // fallback to default
      }
    }

    if (password !== adminPassword) {
      return res.status(401).json({ error: "Senha incorreta!" });
    }

    const filePath = path.join(process.cwd(), "dados", `${key}.json`);

    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      return res.json({ success: true, message: `Arquivo ${key}.json atualizado com sucesso.` });
    } catch (e: any) {
      return res.status(500).json({ error: "Erro ao salvar o arquivo: " + e.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ceará Buggy Tur backend running on http://localhost:${PORT}`);
  });
}

startServer();
