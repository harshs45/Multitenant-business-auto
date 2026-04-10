const { z } = require('zod');

const generateBotSchema = z.object({
  body: z.object({
    businessName: z.string().min(1, "Business name is required").max(100),
    websiteUrl: z.string().url().optional().or(z.literal('')),
    businessType: z.string().min(1, "Business type is required"),
    businessDescription: z.string().optional(),
    
    botName: z.string().min(1, "Bot name is required").max(100),
    avatarStyle: z.string().optional(),
    welcomeMessage: z.string().optional(),
    toneOfVoice: z.string().optional(),
    responseLanguage: z.string().optional(),
    fallbackEmail: z.string().email().optional().or(z.literal('')),
    
    supportEmail: z.string().email().optional().or(z.literal('')),
    businessHours: z.string().optional(),
    adaptiveFields: z.record(z.any()).optional(),
    faqTopics: z.array(z.string()).optional(),
    
    features: z.record(z.boolean()).optional(),
    
    themeId: z.string().optional(),
    accentColor: z.string().optional(),
    widgetPosition: z.string().optional(),
    borderRadius: z.number().int().min(0).max(50).optional(),
    fontStyle: z.string().optional(),
  }),
});

module.exports = {
  generateBotSchema,
};
