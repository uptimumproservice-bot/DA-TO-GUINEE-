import express from 'express';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

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
        systemInstruction: "Vous êtes l'expert virtuel officiel du GROUPE DA-TO, entreprise guinéenne de référence en BTP, Aménagement Foncier et Promotion Immobilière à Conakry. Vous aidez les clients, investisseurs et partenaires avec une expertise pointue sur nos projets, notre méthode en 7 étapes, nos standards HSE et nos réalisations en République de Guinée.",
        temperature: 0.7,
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
        systemInstruction: "Vous êtes l'assistant géographique et urbanistique du Groupe DA-TO. Fournissez des informations précises basées sur Google Maps concernant Conakry, Lambanyi, Kaloum, les axes routiers, les zones d'aménagement foncier et les infrastructures en Guinée.",
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
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
