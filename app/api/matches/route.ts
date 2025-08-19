import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/matches - Get all matches with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const teamId = searchParams.get('teamId');
    const status = searchParams.get('status');
    const fieldId = searchParams.get('fieldId');

    // Build where clause
    const where: any = {};
    
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      where.date = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }
    
    if (teamId) {
      where.OR = [
        { homeTeamId: teamId },
        { awayTeamId: teamId },
      ];
    }
    
    if (status) {
      where.status = status;
    }
    
    if (fieldId) {
      where.fieldId = fieldId;
    }

    const matches = await prisma.match.findMany({
      where,
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true,
            ageGroup: true,
            color: true,
          },
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
            ageGroup: true,
            color: true,
          },
        },
        field: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        attendances: {
          include: {
            player: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' },
      ],
    });

    return NextResponse.json({
      success: true,
      data: matches,
      count: matches.length,
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}

// POST /api/matches - Create a new match
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      date,
      startTime,
      endTime,
      homeTeamId,
      awayTeamId,
      fieldId,
      competition,
      notes,
    } = body;

    // Validate required fields
    if (!date || !startTime || !fieldId) {
      return NextResponse.json(
        { success: false, error: 'Date, start time, and field are required' },
        { status: 400 }
      );
    }

    // Check for field conflicts
    const conflictingMatch = await prisma.match.findFirst({
      where: {
        fieldId,
        date: new Date(date),
        status: {
          in: ['SCHEDULED', 'CONFIRMED'],
        },
        OR: [
          {
            startTime: {
              lte: startTime,
            },
            endTime: {
              gt: startTime,
            },
          },
          {
            startTime: {
              lt: endTime || startTime,
            },
            endTime: {
              gte: endTime || startTime,
            },
          },
        ],
      },
    });

    if (conflictingMatch) {
      return NextResponse.json(
        { success: false, error: 'Field is already booked for this time' },
        { status: 409 }
      );
    }

    const match = await prisma.match.create({
      data: {
        date: new Date(date),
        startTime,
        endTime,
        homeTeamId,
        awayTeamId,
        fieldId,
        competition,
        notes,
        status: 'SCHEDULED',
      },
      include: {
        homeTeam: {
          select: {
            id: true,
            name: true,
            ageGroup: true,
            color: true,
          },
        },
        awayTeam: {
          select: {
            id: true,
            name: true,
            ageGroup: true,
            color: true,
          },
        },
        field: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: match,
      message: 'Match created successfully',
    });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create match' },
      { status: 500 }
    );
  }
}
