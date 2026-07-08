import express from "express";
import path from "path";
import fs from "fs";

const app = express();

// Max body limit to allow uploading moderately sized configurations
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// GET API Route to read JSON data
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

// POST API Route to write JSON data
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
    // Note: Vercel serverless environment is read-only (except /tmp).
    // This write will succeed temporarily in the serverless instance container,
    // but won't persist across different function invocations or cold starts.
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return res.json({ 
      success: true, 
      message: `Arquivo ${key}.json atualizado com sucesso (temporário no ambiente serverless).` 
    });
  } catch (e: any) {
    return res.status(500).json({ error: "Erro ao salvar o arquivo: " + e.message });
  }
});

// For Vercel Serverless, we export the Express app as the default handler
export default app;
