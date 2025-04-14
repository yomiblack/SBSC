import { NextRequest, NextResponse } from 'next/server';

export function getCorsHeaders(request: NextRequest) {
  // Get allowed origins from environment variables
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
  ];

  // Get the request origin
  const requestOrigin = request.headers.get('origin') || '';

  // Validate the origin
  const origin = allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods':
      process.env.ALLOWED_METHODS || 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':
      process.env.ALLOWED_HEADERS || 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
    Vary: 'Origin', // Important for caching behavior
  };
}

export function handleOptionsRequest(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}
