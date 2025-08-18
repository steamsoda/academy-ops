import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ players: [] });
}

export async function POST() {
  return NextResponse.json({ message: 'Player created' });
}
