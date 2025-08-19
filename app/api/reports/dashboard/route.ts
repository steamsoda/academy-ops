import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/reports/dashboard - Get dashboard KPIs and statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month'; // month, week, year

    // Calculate date ranges
    const now = new Date();
    const startOfPeriod = new Date(now);
    const endOfPeriod = new Date(now);

    switch (period) {
      case 'week':
        startOfPeriod.setDate(now.getDate() - 7);
        break;
      case 'month':
        startOfPeriod.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startOfPeriod.setFullYear(now.getFullYear() - 1);
        break;
    }

    // Get player statistics
    const totalPlayers = await prisma.player.count();
    const activePlayers = await prisma.player.count({
      where: { status: 'ACTIVE' },
    });
    const newPlayersThisPeriod = await prisma.player.count({
      where: {
        registrationDate: {
          gte: startOfPeriod,
          lte: endOfPeriod,
        },
      },
    });

    // Get match statistics
    const totalMatches = await prisma.match.count({
      where: {
        date: {
          gte: startOfPeriod,
          lte: endOfPeriod,
        },
      },
    });

    const confirmedMatches = await prisma.match.count({
      where: {
        date: {
          gte: startOfPeriod,
          lte: endOfPeriod,
        },
        status: 'CONFIRMED',
      },
    });

    // Get attendance statistics
    const totalAttendanceRecords = await prisma.attendance.count({
      where: {
        match: {
          date: {
            gte: startOfPeriod,
            lte: endOfPeriod,
          },
        },
      },
    });

    const presentAttendance = await prisma.attendance.count({
      where: {
        match: {
          date: {
            gte: startOfPeriod,
            lte: endOfPeriod,
          },
        },
        status: 'PRESENT',
      },
    });

    const attendanceRate = totalAttendanceRecords > 0 
      ? Math.round((presentAttendance / totalAttendanceRecords) * 100)
      : 0;

    // Get payment statistics
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        status: 'PAID',
        paidDate: {
          gte: startOfPeriod,
          lte: endOfPeriod,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const pendingPayments = await prisma.payment.aggregate({
      where: {
        status: 'PENDING',
        dueDate: {
          lte: now,
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Get recent activity
    const recentMatches = await prisma.match.findMany({
      where: {
        date: {
          gte: startOfPeriod,
        },
      },
      include: {
        homeTeam: {
          select: { name: true },
        },
        awayTeam: {
          select: { name: true },
        },
        field: {
          select: { name: true },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: 5,
    });

    const recentPayments = await prisma.payment.findMany({
      where: {
        paidDate: {
          gte: startOfPeriod,
        },
      },
      include: {
        player: {
          select: { name: true },
        },
      },
      orderBy: {
        paidDate: 'desc',
      },
      take: 5,
    });

    // Calculate deltas (simplified - in real app you'd compare with previous period)
    const playerDelta = newPlayersThisPeriod;
    const attendanceDelta = attendanceRate > 85 ? 3 : attendanceRate > 70 ? 0 : -5; // Simplified
    const revenueDelta = totalRevenue._sum.amount || 0;

    return NextResponse.json({
      success: true,
      data: {
        kpis: {
          activePlayers: {
            value: activePlayers,
            delta: playerDelta,
            label: 'Active players',
          },
          attendanceRate: {
            value: `${attendanceRate}%`,
            delta: `${attendanceDelta}%`,
            label: 'Attendance rate',
          },
          matchesThisPeriod: {
            value: totalMatches,
            delta: confirmedMatches,
            label: `Matches this ${period}`,
          },
          revenueThisPeriod: {
            value: `${(totalRevenue._sum.amount || 0).toLocaleString()} MXN`,
            delta: `${revenueDelta.toLocaleString()}`,
            label: `Revenue this ${period}`,
          },
        },
        stats: {
          totalPlayers,
          newPlayersThisPeriod,
          totalMatches,
          confirmedMatches,
          attendanceRate,
          totalRevenue: totalRevenue._sum.amount || 0,
          pendingPayments: pendingPayments._sum.amount || 0,
        },
        recentActivity: {
          matches: recentMatches.map(match => ({
            id: match.id,
            date: match.date,
            time: match.startTime,
            homeTeam: match.homeTeam?.name || 'TBD',
            awayTeam: match.awayTeam?.name || 'TBD',
            field: match.field?.name,
            status: match.status,
            competition: match.competition,
          })),
          payments: recentPayments.map(payment => ({
            id: payment.id,
            date: payment.paidDate,
            player: payment.player.name,
            amount: payment.amount,
            description: payment.description,
          })),
        },
        period,
        lastUpdated: now.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
