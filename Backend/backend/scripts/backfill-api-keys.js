// scripts/backfill-api-keys.js
const crypto = require('crypto');
const { Bot } = require('../src/models');

/**
 * Generates a unique API key with 'bf_' prefix.
 */
function generateKey() {
  return `bf_${crypto.randomBytes(16).toString('hex')}`;
}

async function backfill() {
  console.log('--- Starting API Key Backfill ---');
  
  try {
    const bots = await Bot.findAll({
      where: {
        api_key: null
      }
    });

    console.log(`Found ${bots.length} bots needing an API key.`);

    for (const bot of bots) {
      let isUnique = false;
      let key;

      while (!isUnique) {
        key = generateKey();
        const existing = await Bot.findOne({ where: { api_key: key } });
        if (!existing) isUnique = true;
      }

      bot.apiKey = key;
      await bot.save();
      console.log(`Updated bot ${bot.id} with key ${key}`);
    }

    console.log('--- Backfill Completed Successfully ---');
    process.exit(0);
  } catch (err) {
    console.error('Backfill failed:', err);
    process.exit(1);
  }
}

backfill();
