const { OpenAI } = require('openai');

const chatCompletion = async (messages) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    response_format: { type: 'json_object' },
    messages,
  });

  return JSON.parse(completion.choices[0].message.content);
};

module.exports = { chatCompletion };
