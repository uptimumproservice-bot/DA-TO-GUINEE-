import express from 'express';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfigPath = path.resolve(__dirname, 'firebase-applet-config.json');
const firebaseConfig = fs.existsSync(firebaseConfigPath)
  ? JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf-8'))
  : { projectId: '', apiKey: '', firestoreDatabaseId: '(default)' };

// Cache Google's public x509 certificates for Firebase Auth ID Token verification
let cachedCerts: { certs: Record<string, string>; expiresAt: number } | null = null;
async function getFirebasePublicCerts(): Promise<Record<string, string>> {
  const now = Date.now();
  if (cachedCerts && now < cachedCerts.expiresAt) {
    return cachedCerts.certs;
  }
  const res = await fetch(
    'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
  );
  if (!res.ok) throw new Error('Unable to load Firebase public certificates');
  const cc = res.headers.get('cache-control') || '';
  const maxAgeMatch = cc.match(/max-age=(\d+)/);
  const ttlMs = (maxAgeMatch ? Number(maxAgeMatch[1]) : 3600) * 1000;
  const certs = (await res.json()) as Record<string, string>;
  cachedCerts = { certs, expiresAt: now + ttlMs };
  return certs;
}

function base64UrlDecode(str: string): Buffer {
  const pad = 4 - (str.length % 4 || 4);
  const b64 = (str + '='.repeat(pad === 4 ? 0 : pad)).replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(b64, 'base64');
}

async function verifyFirebaseIdToken(idToken: string): Promise<{
  uid: string;
  email?: string;
  email_verified?: boolean;
}> {
  const parts = idToken.split('.');
  if (parts.length !== 3) throw new Error('Malformed JWT');
  const [headerB64, payloadB64, sigB64] = parts;

  const header = JSON.parse(base64UrlDecode(headerB64).toString('utf-8')) as {
    alg?: string;
    kid?: string;
  };
  if (header.alg !== 'RS256' || !header.kid) throw new Error('Invalid JWT header');

  const certs = await getFirebasePublicCerts();
  const certPem = certs[header.kid];
  if (!certPem) throw new Error('Unknown key id');

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(`${headerB64}.${payloadB64}`);
  verifier.end();
  const isValidSig = verifier.verify(certPem, base64UrlDecode(sigB64));
  if (!isValidSig) throw new Error('Invalid JWT signature');

  const payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf-8')) as {
    aud?: string;
    iss?: string;
    sub?: string;
    exp?: number;
    iat?: number;
    email?: string;
    email_verified?: boolean;
  };

  const nowSec = Math.floor(Date.now() / 1000);
  const projectId = firebaseConfig.projectId;
  if (!projectId || payload.aud !== projectId) throw new Error('Invalid audience');
  if (payload.iss !== `https://securetoken.google.com/${projectId}`) throw new Error('Invalid issuer');
  if (!payload.sub || typeof payload.sub !== 'string') throw new Error('Invalid subject');
  if (!payload.exp || payload.exp <= nowSec) throw new Error('Token expired');
  if (!payload.iat || payload.iat > nowSec + 300) throw new Error('Invalid issued-at');

  return {
    uid: payload.sub,
    email: payload.email,
    email_verified: payload.email_verified,
  };
}

const app = express();
app.use(express.json({ limit: '50mb' }));

// Simple in-memory rate limiter for public / auth endpoints
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(key: string, maxRequests = 30, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateBuckets.get(key);
  if (!entry || now > entry.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count += 1;
  return true;
}

interface VerifiedAdminContext {
  uid: string;
  email: string;
  role: 'super_admin' | 'editor';
}

async function verifyAdminRequest(req: express.Request): Promise<VerifiedAdminContext | null> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const idToken = authHeader.slice(7).trim();
  if (!idToken) return null;

  try {
    const decoded = await verifyFirebaseIdToken(idToken);
    if (!decoded.email_verified) return null;

    if (decoded.email === 'sagnomichel2026@gmail.com') {
      return { uid: decoded.uid, email: decoded.email, role: 'super_admin' };
    }

    // Verify active admin record in Firestore via REST using caller's verified ID token
    const dbId = encodeURIComponent(firebaseConfig.firestoreDatabaseId || '(default)');
    const docUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${dbId}/documents/admins/${encodeURIComponent(decoded.uid)}`;
    const resp = await fetch(docUrl, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    if (!resp.ok) return null;
    const docData = (await resp.json()) as {
      fields?: {
        active?: { booleanValue?: boolean };
        role?: { stringValue?: string };
      };
    };
    const isActive = docData.fields?.active?.booleanValue === true;
    const role = docData.fields?.role?.stringValue;
    if (!isActive || (role !== 'super_admin' && role !== 'editor')) return null;

    return {
      uid: decoded.uid,
      email: decoded.email || '',
      role,
    };
  } catch {
    return null;
  }
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Secure image upload & Sharp optimization endpoint (Admin only)
const ALLOWED_FOLDERS = new Set([
  'general',
  'accueil',
  'a-propos',
  'activites',
  'projets',
  'engagements',
  'actualites',
  'branding',
]);

app.post('/api/media/upload', async (req, res) => {
  try {
    const adminCtx = await verifyAdminRequest(req);
    if (!adminCtx) {
      return res.status(403).json({ error: 'Accès refusé : authentification administrateur vérifiée requise.' });
    }

    const { fileName, base64Data, folder, mimeType, width, height } = req.body as {
      fileName?: string;
      base64Data?: string;
      folder?: string;
      mimeType?: string;
      width?: number;
      height?: number;
    };

    if (!fileName || !base64Data) {
      return res.status(400).json({ error: 'Fichier image manquant.' });
    }

    const safeFolder = folder && ALLOWED_FOLDERS.has(folder) ? folder : 'general';
    const rawBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
    const buffer = Buffer.from(rawBase64, 'base64');

    if (buffer.length === 0 || buffer.length > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'Taille de fichier invalide (maximum 10 Mo).' });
    }

    // Validate image magic bytes (WebP, PNG, JPEG)
    const isWebp =
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP';
    const isPng =
      buffer.length >= 4 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47;
    const isJpeg = buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;

    if (!isWebp && !isPng && !isJpeg) {
      return res.status(400).json({ error: 'Format image non supporté (WebP, PNG ou JPEG requis).' });
    }

    const ext = isWebp ? 'webp' : isPng ? 'png' : 'jpg';
    const resolvedMime = isWebp ? 'image/webp' : isPng ? 'image/png' : 'image/jpeg';

    const uploadRoot = path.resolve(__dirname, 'public', 'uploaded-images', safeFolder);
    fs.mkdirSync(uploadRoot, { recursive: true });

    const baseSlug =
      path
        .basename(fileName, path.extname(fileName))
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60) || 'image';

    const uniqueName = `${baseSlug}-${Date.now()}.${ext}`;
    const targetPath = path.resolve(uploadRoot, uniqueName);
    if (!targetPath.startsWith(uploadRoot)) {
      return res.status(400).json({ error: 'Chemin de destination invalide.' });
    }

    fs.writeFileSync(targetPath, buffer);

    res.json({
      url: `/uploaded-images/${safeFolder}/${uniqueName}`,
      fileName: uniqueName,
      mimeType: mimeType || resolvedMime,
      sizeBytes: buffer.length,
      width: Number(width || 0),
      height: Number(height || 0),
    });
  } catch (error: any) {
    console.error('Media upload error:', error);
    res.status(500).json({ error: error.message || "Erreur lors de l'enregistrement de l'image." });
  }
});

// Secure image file removal endpoint (Admin only)
app.post('/api/media/delete', async (req, res) => {
  try {
    const adminCtx = await verifyAdminRequest(req);
    if (!adminCtx) {
      return res.status(403).json({ error: 'Accès refusé.' });
    }
    const { url } = req.body as { url?: string };
    if (!url || !url.startsWith('/uploaded-images/')) {
      return res.json({ deleted: false, reason: 'External or static asset preserved' });
    }
    const uploadedBase = path.resolve(__dirname, 'public', 'uploaded-images');
    const relative = url.replace(/^\/uploaded-images\//, '');
    const targetPath = path.resolve(uploadedBase, relative);
    if (!targetPath.startsWith(uploadedBase + path.sep)) {
      return res.status(400).json({ error: 'Chemin de fichier invalide.' });
    }
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
    res.json({ deleted: true });
  } catch (error: any) {
    console.error('Media delete error:', error);
    res.status(500).json({ error: error.message || 'Erreur lors de la suppression du fichier.' });
  }
});

// Rate-limited contact pre-check (if used) & username lookup index (protected, no PII returned unauthenticated)
const usernameMapPath = path.resolve(__dirname, '.admin-usernames.json');
function readUsernameMap(): Record<string, string> {
  try {
    if (fs.existsSync(usernameMapPath)) {
      return JSON.parse(fs.readFileSync(usernameMapPath, 'utf-8'));
    }
  } catch {
    // ignore
  }
  return {};
}

app.post('/api/auth/register-username', async (req, res) => {
  try {
    const adminCtx = await verifyAdminRequest(req);
    if (!adminCtx) return res.status(403).json({ error: 'Non autorisé.' });
    const { username, email } = req.body as { username?: string; email?: string };
    if (!username || !email) return res.status(400).json({ error: 'Paramètres requis.' });
    const normalized = username.trim().toLowerCase();
    const map = readUsernameMap();
    map[normalized] = email.trim().toLowerCase();
    fs.writeFileSync(usernameMapPath, JSON.stringify(map, null, 2));
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

app.post('/api/auth/login-username', async (req, res) => {
  try {
    const clientIp = req.ip || 'unknown';
    if (!checkRateLimit(`login:${clientIp}`, 15, 60_000)) {
      return res.status(429).json({ error: 'Trop de tentatives. Veuillez réessayer dans une minute.' });
    }
    const { username, password } = req.body as { username?: string; password?: string };
    if (!username || !password) {
      return res.status(400).json({ error: 'Identifiant et mot de passe requis.' });
    }
    const map = readUsernameMap();
    const resolvedEmail = map[username.trim().toLowerCase()];
    if (!resolvedEmail) {
      return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
    }
    // Verify password with Firebase Identity Toolkit REST before returning email
    const verifyUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;
    const verifyRes = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: resolvedEmail, password, returnSecureToken: false }),
    });
    if (!verifyRes.ok) {
      return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
    }
    res.json({ email: resolvedEmail });
  } catch {
    res.status(500).json({ error: 'Erreur lors de la vérification des identifiants.' });
  }
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
    const { createServer: createViteServer } = await import('vite');
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
