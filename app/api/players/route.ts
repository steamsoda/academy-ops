import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/players - Get all players with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const teamId = searchParams.get('teamId');
    const status = searchParams.get('status');

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { position: { contains: search, mode: 'insensitive' } },
        { Team: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
    
    if (teamId) {
      where.teamId = teamId;
    }
    
    if (status) {
      where.status = status;
    }

    const players = await prisma.player.findMany({
      where,
      include: {
        Team: {
          select: {
            id: true,
            name: true,
            ageGroup: true,
            color: true,
          },
        },
        Parent: {
          select: {
            id: true,
            User: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: players,
      count: players.length,
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}

// POST /api/players - Create a new player
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, dateOfBirth, position, teamId, parentId } = body;

    // Validate required fields
    if (!name || !dateOfBirth) {
      return NextResponse.json(
        { success: false, error: 'Name and date of birth are required' },
        { status: 400 }
      );
    }

    // Calculate age
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
      ? age - 1 
      : age;

    const player = await prisma.player.create({
      data: {
        name,
        dateOfBirth: birthDate,
        age: actualAge,
        position,
        teamId,
        parentId,
        status: 'ACTIVE',
      },
      include: {
        Team: {
          select: {
            id: true,
            name: true,
            ageGroup: true,
            color: true,
          },
        },
        Parent: {
          select: {
            id: true,
            User: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: player,
      message: 'Player created successfully',
    });
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create player' },
      { status: 500 }
    );
  }
}
