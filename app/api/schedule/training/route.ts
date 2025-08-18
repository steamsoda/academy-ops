import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ trainingSessions: [] });
}

export async function POST() {
  return NextResponse.json({ message: 'Training session created' });
}
