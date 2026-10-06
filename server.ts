import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Ensure public/videos directory exists
const videosDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Multer storage for the lecture video
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, videosDir);
  },
  filename: (_req, file, cb) => {
    // Keep consistent filename for the Sheikh's lecture
    const ext = path.extname(file.originalname) || '.mp4';
    cb(null, `sheikh_tayeb_lecture${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 500 // 500MB max limit
  }
});

app.use(express.json());

// API route: Check if the Sheikh's video is already uploaded on the server
app.get('/api/video-status', (_req, res) => {
  const files = fs.readdirSync(videosDir).filter(f => !f.startsWith('.'));
  const videoFile = files.find(f => f.startsWith('sheikh_tayeb_lecture'));
  
  if (videoFile) {
    const filePath = path.join(videosDir, videoFile);
    const stats = fs.statSync(filePath);
    res.json({
      exists: true,
      url: `/videos/${videoFile}`,
      filename: videoFile,
      size: stats.size,
      updatedAt: stats.mtime
    });
  } else {
    res.json({
      exists: false,
      url: null,
      filename: null
    });
  }
});

// API route: Upload and store the Sheikh's video
app.post('/api/upload-video', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'لم يتم استلام ملف فيديو' });
  }

  const videoUrl = `/videos/${req.file.filename}`;
  res.json({
    success: true,
    message: 'تم رفع وحفظ فيديو فضيلة الشيخ الطيب مليط عكود بنجاح',
    url: videoUrl,
    filename: req.file.filename,
    size: req.file.size
  });
});

// API route: Delete video if user wants to replace it
app.delete('/api/video', (_req, res) => {
  const files = fs.readdirSync(videosDir);
  files.forEach(f => {
    if (f.startsWith('sheikh_tayeb_lecture')) {
      try {
        fs.unlinkSync(path.join(videosDir, f));
      } catch (err) {
        console.error('Error deleting video file:', err);
      }
    }
  });
  res.json({ success: true, message: 'تم حذف الفيديو القديم' });
});

// Serve static assets from public
app.use(express.static(path.join(__dirname, 'public')));

// Mount Vite in dev mode or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
