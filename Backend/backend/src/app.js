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
const widgetRoutes     = require('./modules/widget/widget.routes');

const app = express();
app.set('trust proxy', 1); // ✅ ADD THIS

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5500',
  'http://127.0.0.1:5500',  // ✅ your local test server
  'https://multitenant-business-auto.vercel.app',
];
/* ─── Global Middleware ──────────────────────────────── */
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// ✅ Public widget routes — open to any origin (must be before global CORS)
app.use('/widget', cors({ origin: '*' }));
app.use('/api/v1/widget', cors({ origin: '*' }));
app.use('/api/v1/chat', cors({ origin: '*' }));

// 🔒 All other routes — restricted to known origins
app.use(cors({
  origin: function (origin, callback) {
    // Allow internal/server-to-server or tools without origin (like Postman)
    if (!origin) return callback(null, true);

    // Exact whitelist match
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow all if CORS_ORIGIN env is set to *
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
app.use('/api/v1/widget', widgetRoutes);

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