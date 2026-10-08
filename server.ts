import express from 'express';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '50mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: `Vous êtes l'expert virtuel officiel du GROUPE DA-TO, entreprise guinéenne de référence en BTP, Aménagement Foncier et Promotion Immobilière à Conakry. 
        
        Vous devez répondre aux questions en vous basant exclusivement sur les informations officielles du Groupe DA-TO. 
        Voici les informations de contact officielles :
        - Adresse : Lambanyi Carrefour TMI, Conakry, Guinée
        - Téléphone : +224 628 88 30 30
        - Email : contact@datoguinee.com
        - Horaires : Lundi – Vendredi : 8h00 – 17h00
        
        Si vous ne connaissez pas une information, dites que vous n'avez pas cette précision et orientez l'utilisateur vers les contacts officiels ci-dessus. Ne jamais inventer d'informations.
        
        IMPORTANT : N'utilisez PAS de mise en forme Markdown comme des astérisques (**) pour mettre du texte en gras. Utilisez le texte brut pour le gras, ou tout autre moyen si nécessaire, mais évitez les signes de formatage markdown dans vos réponses.`,
        temperature: 0.3,
      },
    });

    res.json({ text: response.text || "Je n'ai pas pu générer de réponse pour le moment." });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'Erreur interne du serveur de chat' });
  }
});

app.post('/api/maps-grounding', async (req, res) => {
  try {
    const { query } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: query || "Où se trouvent les principaux chantiers et projets du Groupe DA-TO à Conakry et en Guinée ?",
      tools: [{ googleMaps: {} }],
      config: {
        systemInstruction: "Vous êtes l'assistant géographique et urbanistique du Groupe DA-TO. Fournissez des informations précises basées sur Google Maps concernant les zones d'intervention de DA-TO à Conakry et en Guinée (Lambanyi, Kaloum, etc.). Si une information n'est pas claire ou disponible sur la carte, ne l'inventez pas. N'utilisez PAS de mise en forme Markdown comme des astérisques (**) pour mettre du texte en gras.",
      },
    });

    res.json({
      text: response.text || "Aucune information géographique trouvée.",
      groundingMetadata: response.candidates?.[0]?.groundingMetadata || null,
    });
  } catch (error: any) {
    console.error('Maps grounding error:', error);
    res.status(500).json({ error: error.message || 'Erreur lors de la recherche géographique' });
  }
});

app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, imageBase64, mimeType, aspectRatio } = req.body;
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Cinematic architectural flythrough of a modern sustainable construction project in Conakry Guinea',
      image: imageBase64 ? {
        imageBytes: imageBase64,
        mimeType: mimeType || 'image/jpeg',
      } : undefined,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio === '9:16' ? '9:16' : '16:9',
      },
    });

    res.json({ operationName: operation.name });
  } catch (error: any) {
    console.error('Video generation start error:', error);
    res.status(500).json({ error: error.message || 'Erreur lors du lancement de la génération vidéo Veo' });
  }
});

app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    res.json({ done: updated.done });
  } catch (error: any) {
    console.error('Video status error:', error);
    res.status(500).json({ error: error.message || 'Erreur lors de la vérification du statut vidéo' });
  }
});

app.post('/api/video-download', async (req, res) => {
  try {
    const { operationName } = req.body;
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(404).json({ error: 'Vidéo non trouvée ou génération inachevée' });
    }

    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY || '' },
    });
    const arrayBuffer = await videoRes.arrayBuffer();
    res.setHeader('Content-Type', 'video/mp4');
    res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    console.error('Video download error:', error);
    res.status(500).json({ error: error.message || 'Erreur lors du téléchargement de la vidéo' });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const portArgIndex = process.argv.indexOf('--port');
  const portArg = portArgIndex !== -1 ? process.argv[portArgIndex + 1] : null;
  const port = Number(portArg || (isProd ? process.env.PORT : (process.env.DEFAULT_APP_PORT || 3000)) || 3000);
  const publicPath = path.resolve(__dirname, 'public');

  // Serve static assets directly with proper caching & MIME handling
  app.use(express.static(publicPath));
  app.use('/uploaded-images', express.static(path.resolve(publicPath, 'uploaded-images')));
  app.use('/airo-assets', express.static(path.resolve(publicPath, 'airo-assets')));
  app.use('/assets', express.static(path.resolve(publicPath, 'assets')));

  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer();
