import { ReadableStream } from 'stream/web';

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const API_URL = 'https://api-inference.huggingface.co/models/gpt2';
const API_KEY = process.env.HUGGINGFACE_API_KEY;

export async function HuggingFaceStream(messages: Message[]) {
  const latestUserMessage = messages[messages.length - 1]?.content || '';

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: latestUserMessage }),
  });

  const data = await response.json();
  const generatedText = Array.isArray(data)
    ? data[0]?.generated_text || ''
    : data.generated_text || '';

  // Simulate stream from full response
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(generatedText));
      controller.close();
    },
  });

  return stream;
}
