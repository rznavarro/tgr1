import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check API
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Advisor Endpoint powered by Gemini API
  app.post('/api/ai-advisor', async (req, res) => {
    try {
      const { userPrompt, properties } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY no configurada. Configura la clave en los secretos.'
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `
Eres un Asesor Inmobiliario Senior de TGR Propiedades (www.tgrprop.com.ar), especialista en el mercado inmobiliario de lujo de Buenos Aires (Puerto Madero, Recoleta, Palermo Chico, Belgrano, San Isidro, Nordelta, etc.).
Tu tono es sumamente profesional, elegante, cálido y personalizado.
Analiza la solicitud del cliente y recomienda las propiedades más adecuadas del catálogo disponible o asesóralo sobre valores de mercado, ubicaciones y estilos de vida.

Aquí está el catálogo resumido de propiedades disponibles en TGR Propiedades:
${JSON.stringify(
  properties.map((p: any) => ({
    id: p.id,
    title: p.title,
    operation: p.operation,
    type: p.propertyType,
    priceUSD: p.priceUSD,
    neighborhood: p.neighborhood,
    bedrooms: p.bedrooms,
    areaTotal: p.areaTotal,
    amenities: p.amenities
  })),
  null,
  2
)}

Responde en español claro, con formato bien estructurado y elegante. Si recomiendas propiedades, menciona su título exacto, ID y por qué encajan con la búsqueda.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: userPrompt }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const text = response.text || 'No se pudo generar una respuesta en este momento.';
      res.json({ text });
    } catch (err: any) {
      console.error('Error in AI advisor endpoint:', err);
      res.status(500).json({ error: err.message || 'Error al procesar la consulta con IA.' });
    }
  });

  // Serve Vite in development mode or Static in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor TGR Propiedades ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

startServer();
