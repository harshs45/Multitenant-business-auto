const sendMessage = async (publicKey, data) => {
  const bot = await resolveBot(publicKey);

  const conversation = await Conversation.findOne({
    where: { sessionId: data.sessionId, botId: bot.id },
  });

  if (!conversation) throw AppError.notFound('Chat session not found');
  if (conversation.status !== 'active') {
    throw AppError.badRequest('This conversation has ended');
  }

  // ✅ FIX: safe user message
  const userContent = data.message || data.content || null;

  if (!userContent) {
    throw AppError.badRequest('Message is required');
  }

  await Message.create({
    id: uuidv4(),
    conversationId: conversation.id,
    role: 'user',
    content: userContent,
  });

  const history = await Message.findAll({
    where: { conversationId: conversation.id },
    order: [['createdAt', 'ASC']],
    limit: 20,
  });

  // ✅ DEBUG
  console.log('--- BOT DEBUG ---');
  console.log('Bot ID:', bot?.id);
  console.log('systemPrompt exists:', !!bot?.systemPrompt);

  const finalSystemPrompt =
    bot?.systemPrompt || 'You are a helpful assistant.';

  console.log('FINAL PROMPT:', finalSystemPrompt.slice(0, 150));

  // ✅ FIX: proper function call
  const llmResponse = await llm.complete(
    finalSystemPrompt,
    history.map((m) => ({
      role: m.role,
      content: m.content,
    }))
  );

  console.log('RAW LLM RESPONSE:', llmResponse);

  // ✅ FIX: safe extraction
  const assistantContent =
    typeof llmResponse === 'string'
      ? llmResponse
      : llmResponse?.content || llmResponse?.text || null;

  if (!assistantContent) {
    console.error('Bad LLM response:', llmResponse);
    throw new Error('LLM returned empty response');
  }

  const assistantMsg = await Message.create({
    id: uuidv4(),
    conversationId: conversation.id,
    role: 'assistant',
    content: assistantContent,
    metadata:
      typeof llmResponse === 'object' && llmResponse?.metadata
        ? llmResponse.metadata
        : null,
  });

  conversation.messageCount = (conversation.messageCount || 0) + 2;
  await conversation.save();

  await logUsage(bot.businessId, bot.id, 'message_sent');

  return {
    sessionId: conversation.sessionId,
    reply: assistantMsg.content,
    metadata: assistantMsg.metadata,
  };
};