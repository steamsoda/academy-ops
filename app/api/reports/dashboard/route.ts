import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    activePlayers: 0,
    attendanceRate: 0,
    matchesThisWeek: 0
  });
}
