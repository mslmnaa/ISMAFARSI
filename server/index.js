const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_please_change_in_production';

app.use(cors());
app.use(express.json());

// Set up uploads directory
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- UPLOAD ROUTE ---
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Using a relative URL or absolute. Absolute is easier for external usage.
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

// --- AUTH ROUTES ---
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(400).json({ error: 'Invalid username or password' });
    
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid username or password' });
    
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: admin.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  res.json({ username: req.user.username });
});

// --- HELPER FUNCTION FOR CRUD ROUTES ---
const createCrudRoutes = (path, model) => {
  // GET all
  app.get(`/api/${path}`, async (req, res) => {
    try {
      const data = await prisma[model].findMany();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  // GET by ID
  app.get(`/api/${path}/:id`, async (req, res) => {
    try {
      const data = await prisma[model].findUnique({ where: { id: parseInt(req.params.id) } });
      if (!data) return res.status(404).json({ error: 'Not found' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  // POST create (protected)
  app.post(`/api/${path}`, authenticateToken, async (req, res) => {
    try {
      // For date fields, try to parse them correctly
      const data = { ...req.body };
      if (data.date) data.date = new Date(data.date);
      
      const created = await prisma[model].create({ data });
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create data', details: error.message });
    }
  });

  // PUT update (protected)
  app.put(`/api/${path}/:id`, authenticateToken, async (req, res) => {
    try {
      const data = { ...req.body };
      if (data.date) data.date = new Date(data.date);
      // Remove id from payload if it exists
      delete data.id;

      const updated = await prisma[model].update({
        where: { id: parseInt(req.params.id) },
        data,
      });
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update data', details: error.message });
    }
  });

  // DELETE (protected)
  app.delete(`/api/${path}/:id`, authenticateToken, async (req, res) => {
    try {
      await prisma[model].delete({ where: { id: parseInt(req.params.id) } });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete data', details: error.message });
    }
  });
};

// --- BULK SYNC ENDPOINT FOR DASHBOARD ---
app.post('/api/sync', authenticateToken, async (req, res) => {
  try {
    const { mediaBerita, events, kabinet, programKerja, wilayah } = req.body;

    // Sync News
    if (mediaBerita && mediaBerita.news) {
      for (const n of mediaBerita.news) {
        if (n.id) {
          await prisma.news.update({ where: { id: parseInt(n.id) }, data: { title: n.title, category: n.category, date: new Date(n.date), author: n.author, image: n.image, excerpt: n.excerpt, content: n.content } }).catch(() => {});
        } else {
          await prisma.news.create({ data: { title: n.title, category: n.category, date: new Date(n.date), author: n.author, image: n.image, excerpt: n.excerpt, content: n.content } });
        }
      }
    }

    // Sync Events
    if (events && events.events) {
      for (const e of events.events) {
        if (e.id) {
          await prisma.event.update({ where: { id: parseInt(e.id) }, data: { name: e.name, category: e.category, date: new Date(e.date), location: e.location, description: e.description, status: e.status } }).catch(() => {});
        } else {
          await prisma.event.create({ data: { name: e.name, category: e.category, date: new Date(e.date), location: e.location, description: e.description, status: e.status } });
        }
      }
    }

    res.json({ success: true, message: 'Synced successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync' });
  }
});

// --- REGISTER CRUD ROUTES ---
createCrudRoutes('news', 'news');
createCrudRoutes('events', 'event');
createCrudRoutes('cabinet', 'cabinetMember');
createCrudRoutes('programs', 'program');
createCrudRoutes('regions', 'region');
createCrudRoutes('settings', 'settings');

// --- SERVE REACT BUILD (production) ---
// The React app is built to ../build (relative to this server folder).
// Express 5 does not accept app.get('*'), so use a regex that excludes API/upload routes.
const buildPath = path.join(__dirname, '..', 'build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get(/^(?!\/api|\/uploads).*/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
