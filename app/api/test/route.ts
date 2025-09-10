import { NextResponse } from 'next/server';

export async function GET() {
  const timestamp = new Date().toISOString();
  const message = `[DIAGNOSTIC LOG] This is a test log from the /api/test endpoint. Timestamp: ${timestamp}`;
  const errorMessage = `[DIAGNOSTIC ERROR] This is a test error from the /api/test endpoint. Timestamp: ${timestamp}`;

  console.log(message);
  console.error(errorMessage);
  
  return NextResponse.json({ 
    status: 'Test API executed successfully.',
    message: message,
    errorMessage: errorMessage 
  });
}
