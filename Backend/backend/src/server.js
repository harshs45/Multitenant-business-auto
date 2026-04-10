const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ DB Connected');

    const PORT = process.env.PORT || 5000;

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
