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
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
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