const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅  Database connected successfully');

    // Start HTTP server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀  BotForge API running on http://localhost:${PORT}`);
      console.log(`📋  Health check: http://localhost:${PORT}/api/v1/health`);
      console.log(`🌍  Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('❌  Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
