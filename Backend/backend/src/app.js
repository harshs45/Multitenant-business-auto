require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./common/middleware/errorHandler');
const { generalLimiter } = require('./common/middleware/rateLimiter');

const authRoutes       = require('./modules/auth/auth.routes');
const userRoutes       = require('./modules/users/users.routes');
const businessRoutes   = require('./modules/businesses/businesses.routes');
const formSchemaRoutes = require('./modules/form-schema/formSchema.routes');
const botRoutes        = require('./modules/bots/bots.routes');
const featureRoutes    = require('./modules/features/features.routes');
const themeRoutes      = require('./modules/themes/themes.routes');
const embedRoutes      = require('./modules/embed/embed.routes');
const chatRoutes       = require('./modules/chat/chat.routes');
const analyticsRoutes  = require('./modules/analytics/analytics.routes');
const billingRoutes    = require('./modules/billing/billing.routes');
const knowledgeBase    = require('./modules/knowledge-base/knowledgeBase.routes');
const platformAdmin    = require('./modules/platform-admin/platformAdmin.routes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://multitenant-business-auto.vercel.app',
];

/* ─── Global Middleware ──────────────────────────────── */
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(cors({
  origin: function (origin, callback) {
    // 1. Allow internal/server-to-server or tools without origin (like Postman)
    if (!origin) return callback(null, true);

    // 2. Exact whitelist match
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // 3. Special case: Always allow any origin for the widget config retrieval
    // Note: origin check happens before routing, so we can't easily check req.path here
    // but the user's specific request for the widget config being open is better 
    // handled by allowing it globally or by overriding in the route (which we did).
    // To avoid the error below, we allow it here if we want to be safe, 
    // but the best way is to only throw Error if it's NOT a public-safe route.
    
    // For now, let's keep it restricted but allow if CORS_ORIGIN is set to *
    if (process.env.CORS_ORIGIN === '*') {
      return callback(null, true);
    }

    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(generalLimiter);

/* ─── Static Files ───────────────────────────────────── */
app.use('/widget', express.static(path.join(__dirname, 'public/widget')));

/* ─── Health Check ───────────────────────────────────── */
app.get('/api/v1/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      env: process.env.NODE_ENV || 'development',
    },
  });
});

/* ─── API Routes ─────────────────────────────────────── */
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/businesses', businessRoutes);
app.use('/api/v1/form-schema', formSchemaRoutes);
app.use('/api/v1/bots', botRoutes);
app.use('/api/v1/features', featureRoutes);
app.use('/api/v1/themes', themeRoutes);
app.use('/api/v1', embedRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/billing', billingRoutes);
app.use('/api/v1/knowledge-base', knowledgeBase);
app.use('/api/v1/admin', platformAdmin);

/* ─── 404 Handler ────────────────────────────────────── */
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'Route not found' },
  });
});

/* ─── Centralized Error Handler ──────────────────────── */
app.use(errorHandler);

module.exports = app;