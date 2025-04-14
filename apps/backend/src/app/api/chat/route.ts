import { NextRequest, NextResponse } from 'next/server';
import ChatHistory from '../../libs/backend-utils/chatModel';
import { connectToDatabase } from '../../libs/backend-utils/dbConnect';
import {
  getCorsHeaders,
  handleOptionsRequest,
} from '../../libs/backend-utils/cors';
import { HuggingFaceStream as OpenAIStream } from '../../libs/backend-utils/huggingFaceStream';
import { Message } from '../../libs/backend-utils/huggingFaceStream';

export async function POST(request: NextRequest) {
  try {
    //establishing connection to the database
    await connectToDatabase();

    const { userInput, conversationHistory = [] } = await request.json();

    if (!userInput) {
      return new NextResponse(
        JSON.stringify({ error: 'No message provided' }),
        {
          status: 400,
          headers: getCorsHeaders(request),
        }
      );
    }

    // Save user message to DB
    console.log('Before saving to DB');

    const newUserMessage = new ChatHistory({
      message: userInput,
      sender: 'user',
    });
    await newUserMessage.save();
    console.log('After saving to DB');

    // Prepare messages for OpenAI (including conversation history)
    const messages: Message[] = [
      ...conversationHistory,
      { role: 'user', content: userInput },
    ];

    // Get the AI stream
    let stream;
    try {
      stream = await OpenAIStream(messages);
    } catch (error) {
      console.error('Error creating stream:', error);
      throw error;
    }

    // Save AI response to DB as it streams (for future reference)

    // Return the stream as a response
    return new NextResponse(stream as ReadableStream, {
      headers: {
        ...getCorsHeaders(request),
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: getCorsHeaders(request),
      }
    );
  }
}

// Handle OPTIONS requests (unchanged)
export async function OPTIONS(request: NextRequest) {
  return handleOptionsRequest(request);
}

//Test Get function
export async function GET(request: Request) {
  return new Response('Hello, from API!');
}
