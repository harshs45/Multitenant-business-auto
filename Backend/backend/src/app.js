require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./common/middleware/errorHandler');
const { generalLimiter } = require('./common/middleware/rateLimiter');

// Module routes
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

/* ─── Global Middleware ──────────────────────────────── */
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
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
app.use('/api/v1/auth',         authRoutes);
app.use('/api/v1/users',        userRoutes);
app.use('/api/v1/businesses',   businessRoutes);
app.use('/api/v1/form-schema',  formSchemaRoutes);
app.use('/api/v1/bots',         botRoutes);
app.use('/api/v1/features',     featureRoutes);
app.use('/api/v1/themes',       themeRoutes);
app.use('/api/v1',              embedRoutes);       // /api/v1/bots/:id/embed-token, /api/v1/widget/config/:key
app.use('/api/v1/chat',         chatRoutes);
app.use('/api/v1/analytics',    analyticsRoutes);
app.use('/api/v1/billing',      billingRoutes);
app.use('/api/v1/knowledge-base', knowledgeBase);
app.use('/api/v1/admin',        platformAdmin);

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
