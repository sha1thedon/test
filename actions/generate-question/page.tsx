import { Request, Response } from 'express'; // Assuming you're using Express for API routes
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateQuestionForTopic(topic: string): Promise<string | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-1106:personal::8qlEKg0p",
      messages: [
        { role: "system", content: "Your AI assistant for computer science questions." },
        { role: "user", content: `generate ${topic}` }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const data = response.choices[0].message.content;

    return data;
  } catch (error) {
    console.error('Error generating question:', error);
    return null;
  }
}
