const app = require('./app');
const db = require('./models');

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ DB Connected');
    // ✅ Removed sync entirely — tables already exist in production

    const PORT = process.env.PORT || 10000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ FULL ERROR:', err);
    console.error('❌ MESSAGE:', err.message);
    console.error('❌ CODE:', err.code);
    console.error('❌ STACK:', err.stack);
    process.exit(1);
  }
}

startServer();