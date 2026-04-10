'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // ─── 1. Seed User ──────────────────────────────────────
    const userId = uuidv4();
    const passwordHash = await bcrypt.hash('Password123!', 12);

    await queryInterface.bulkInsert('users', [{
      id: userId,
      name: 'Demo Owner',
      email: 'demo@botforge.io',
      password_hash: passwordHash,
      role: 'owner',
      status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
    }]);

    // ─── 2. Seed Business ──────────────────────────────────
    const businessId = uuidv4();

    await queryInterface.bulkInsert('businesses', [{
      id: businessId,
      user_id: userId,
      name: 'Acme Store',
      description: 'A demo e-commerce store selling premium gadgets',
      business_type: 'ecommerce',
      website: 'https://acme-store.example.com',
      status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
    }]);

    // ─── 3. Seed Free Subscription ─────────────────────────
    await queryInterface.bulkInsert('subscriptions', [{
      id: uuidv4(),
      business_id: businessId,
      plan_key: 'starter',
      status: 'active',
      current_period_start: new Date(),
      current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date(),
    }]);

    // ─── 4. Seed Bot ───────────────────────────────────────
    const botId = uuidv4();

    await queryInterface.bulkInsert('bots', [{
      id: botId,
      business_id: businessId,
      name: 'Acme Helper',
      business_description: 'We sell premium gadgets including phones, laptops, and smart home devices.',
      bot_name: 'AcmeBot',
      avatar_style: 'robot',
      welcome_message: 'Hey there! 👋 Welcome to Acme Store. How can I help you today?',
      tone: 'friendly',
      response_language: 'en',
      fallback_email: 'support@acme-store.example.com',
      is_published: true,
      published_at: new Date(),
      setup_step: 5,
      setup_complete: true,
      system_prompt: 'You are "AcmeBot", an AI chatbot assistant.\nRespond in a friendly tone.\nReply in language code: en.\n\n## About the Business\nBusiness name: Acme Store\nBusiness type: E-Commerce\nDescription: We sell premium gadgets including phones, laptops, and smart home devices.\nWebsite: https://acme-store.example.com',
      created_at: new Date(),
      updated_at: new Date(),
    }]);

    // ─── 5. Seed Audience Config ───────────────────────────
    await queryInterface.bulkInsert('bot_audience_configs', [{
      id: uuidv4(),
      bot_id: botId,
      target_audience: 'Tech enthusiasts aged 18-45',
      age_range: '18-45',
      operating_hours: '9:00 AM - 9:00 PM EST',
      support_email: 'support@acme-store.example.com',
      timezone: 'America/New_York',
      type_specific_config: JSON.stringify({ productCategories: 'Phones, Laptops, Smart Home', shippingRegions: 'US, Canada, UK' }),
      created_at: new Date(),
      updated_at: new Date(),
    }]);

    // ─── 6. Seed Features ──────────────────────────────────
    const features = ['order_tracking', 'product_recommendations', 'return_refund_help', 'human_handoff', 'lead_collection', 'faq_answering'];
    await queryInterface.bulkInsert('bot_features',
      features.map((key) => ({
        id: uuidv4(),
        bot_id: botId,
        feature_key: key,
        enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      })),
    );

    // ─── 7. Seed Theme ─────────────────────────────────────
    await queryInterface.bulkInsert('bot_themes', [{
      id: uuidv4(),
      bot_id: botId,
      theme_key: 'ocean_breeze',
      widget_position: 'bottom-right',
      created_at: new Date(),
      updated_at: new Date(),
    }]);

    // ─── 8. Seed Embed Token ───────────────────────────────
    await queryInterface.bulkInsert('embed_tokens', [{
      id: uuidv4(),
      bot_id: botId,
      public_key: 'demo_public_key_acme_store_12345678',
      allowed_domains: JSON.stringify(['https://acme-store.example.com']),
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('embed_tokens', null, {});
    await queryInterface.bulkDelete('bot_themes', null, {});
    await queryInterface.bulkDelete('bot_features', null, {});
    await queryInterface.bulkDelete('bot_audience_configs', null, {});
    await queryInterface.bulkDelete('bots', null, {});
    await queryInterface.bulkDelete('subscriptions', null, {});
    await queryInterface.bulkDelete('businesses', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
