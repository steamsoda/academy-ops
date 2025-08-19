import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/players/[id] - Get a specific player
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const player = await prisma.player.findUnique({
      where: { id: params.id },
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
        attendances: {
          include: {
            match: {
              select: {
                id: true,
                date: true,
                startTime: true,
                competition: true,
              },
            },
          },
          orderBy: {
            match: {
              date: 'desc',
            },
          },
          take: 10,
        },
        payments: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!player) {
      return NextResponse.json(
        { success: false, error: 'Player not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: player,
    });
  } catch (error) {
    console.error('Error fetching player:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch player' },
      { status: 500 }
    );
  }
}

// PUT /api/players/[id] - Update a player
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, dateOfBirth, position, teamId, parentId, status } = body;

    // Check if player exists
    const existingPlayer = await prisma.player.findUnique({
      where: { id: params.id },
    });

    if (!existingPlayer) {
      return NextResponse.json(
        { success: false, error: 'Player not found' },
        { status: 404 }
      );
    }

    // Calculate age if dateOfBirth is provided
    let age = existingPlayer.age;
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      const ageDiff = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      age = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
        ? ageDiff - 1 
        : ageDiff;
    }

    const player = await prisma.player.update({
      where: { id: params.id },
      data: {
        name,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        age,
        position,
        teamId,
        parentId,
        status,
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
      message: 'Player updated successfully',
    });
  } catch (error) {
    console.error('Error updating player:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update player' },
      { status: 500 }
    );
  }
}

// DELETE /api/players/[id] - Delete a player
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if player exists
    const existingPlayer = await prisma.player.findUnique({
      where: { id: params.id },
    });

    if (!existingPlayer) {
      return NextResponse.json(
        { success: false, error: 'Player not found' },
        { status: 404 }
      );
    }

    // Delete related records first
    await prisma.attendance.deleteMany({
      where: { playerId: params.id },
    });

    await prisma.payment.deleteMany({
      where: { playerId: params.id },
    });

    // Delete the player
    await prisma.player.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Player deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting player:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete player' },
      { status: 500 }
    );
  }
}
