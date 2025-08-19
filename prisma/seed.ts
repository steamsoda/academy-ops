import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.attendance.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.field.deleteMany();
  await prisma.coach.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@dfmonterrey.mx',
      password: 'admin123', // In real app, this would be hashed
      name: 'Admin User',
      role: 'DIRECTOR',
    },
  });

  const coachUser = await prisma.user.create({
    data: {
      email: 'coach@dfmonterrey.mx',
      password: 'coach123',
      name: 'Carlos Rodriguez',
      role: 'COACH',
    },
  });

  const parentUser = await prisma.user.create({
    data: {
      email: 'parent@dfmonterrey.mx',
      password: 'parent123',
      name: 'Maria Garcia',
      role: 'PARENT',
    },
  });

  // Create coach
  const coach = await prisma.coach.create({
    data: {
      userId: coachUser.id,
    },
  });

  // Create parent
  const parent = await prisma.parent.create({
    data: {
      userId: parentUser.id,
    },
  });

  // Create fields
  const fields = await Promise.all([
    prisma.field.create({ data: { name: '11v11', type: '11v11' } }),
    prisma.field.create({ data: { name: '7v7-1', type: '7v7', number: '1' } }),
    prisma.field.create({ data: { name: '7v7-2', type: '7v7', number: '2' } }),
    prisma.field.create({ data: { name: '5v5-1', type: '5v5', number: '1' } }),
    prisma.field.create({ data: { name: '5v5-2', type: '5v5', number: '2' } }),
    prisma.field.create({ data: { name: '3v3-A', type: '3v3', number: 'A' } }),
    prisma.field.create({ data: { name: '3v3-B', type: '3v3', number: 'B' } }),
  ]);

  // Create teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: 'U-12 Azul',
        ageGroup: 'U-12',
        color: 'Azul',
        coachId: coach.id,
      },
    }),
    prisma.team.create({
      data: {
        name: 'U-12 Rojo',
        ageGroup: 'U-12',
        color: 'Rojo',
        coachId: coach.id,
      },
    }),
    prisma.team.create({
      data: {
        name: 'U-14 Azul',
        ageGroup: 'U-14',
        color: 'Azul',
        coachId: coach.id,
      },
    }),
    prisma.team.create({
      data: {
        name: 'U-16 Azul',
        ageGroup: 'U-16',
        color: 'Azul',
        coachId: coach.id,
      },
    }),
  ]);

  // Create players
  const players = await Promise.all([
    prisma.player.create({
      data: {
        name: 'Carlos Rodriguez',
        dateOfBirth: new Date('2012-03-15'),
        age: 12,
        position: 'Forward',
        status: 'ACTIVE',
        parentId: parent.id,
        teamId: teams[0].id, // U-12 Azul
      },
    }),
    prisma.player.create({
      data: {
        name: 'Miguel Torres',
        dateOfBirth: new Date('2011-07-22'),
        age: 13,
        position: 'Midfielder',
        status: 'ACTIVE',
        parentId: parent.id,
        teamId: teams[2].id, // U-14 Azul
      },
    }),
    prisma.player.create({
      data: {
        name: 'Diego Silva',
        dateOfBirth: new Date('2010-11-08'),
        age: 14,
        position: 'Defender',
        status: 'ACTIVE',
        parentId: parent.id,
        teamId: teams[2].id, // U-14 Azul
      },
    }),
    prisma.player.create({
      data: {
        name: 'Luis Garcia',
        dateOfBirth: new Date('2012-01-30'),
        age: 12,
        position: 'Goalkeeper',
        status: 'INACTIVE',
        parentId: parent.id,
        teamId: teams[1].id, // U-12 Rojo
      },
    }),
    prisma.player.create({
      data: {
        name: 'Javier Morales',
        dateOfBirth: new Date('2009-05-12'),
        age: 15,
        position: 'Forward',
        status: 'ACTIVE',
        parentId: parent.id,
        teamId: teams[3].id, // U-16 Azul
      },
    }),
  ]);

  // Create matches
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const matches = await Promise.all([
    prisma.match.create({
      data: {
        date: today,
        startTime: '10:00',
        endTime: '11:30',
        status: 'CONFIRMED',
        homeTeamId: teams[3].id, // U-16 Azul
        awayTeamId: null, // vs external team
        fieldId: fields[0].id, // 11v11
        competition: 'League Match',
        notes: 'Home field',
      },
    }),
    prisma.match.create({
      data: {
        date: tomorrow,
        startTime: '14:00',
        endTime: '15:00',
        status: 'PENDING',
        homeTeamId: teams[1].id, // U-12 Rojo
        awayTeamId: teams[0].id, // U-12 Azul
        fieldId: fields[1].id, // 7v7-1
        competition: 'Internal Scrimmage',
      },
    }),
    prisma.match.create({
      data: {
        date: nextWeek,
        startTime: '16:00',
        endTime: '17:00',
        status: 'CONFIRMED',
        homeTeamId: teams[2].id, // U-14 Azul
        awayTeamId: teams[2].id, // vs same team (training)
        fieldId: fields[3].id, // 5v5-1
        competition: 'Training Match',
      },
    }),
  ]);

  // Create payments
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        playerId: players[0].id,
        amount: 150.0,
        currency: 'MXN',
        description: 'Monthly fee - January 2024',
        status: 'PAID',
        dueDate: new Date('2024-01-31'),
        paidDate: new Date('2024-01-15'),
      },
    }),
    prisma.payment.create({
      data: {
        playerId: players[1].id,
        amount: 150.0,
        currency: 'MXN',
        description: 'Monthly fee - February 2024',
        status: 'PENDING',
        dueDate: new Date('2024-02-28'),
      },
    }),
    prisma.payment.create({
      data: {
        playerId: players[2].id,
        amount: 200.0,
        currency: 'MXN',
        description: 'Tournament fee',
        status: 'OVERDUE',
        dueDate: new Date('2024-01-15'),
      },
    }),
  ]);

  // Create attendance records
  const attendances = await Promise.all([
    prisma.attendance.create({
      data: {
        matchId: matches[0].id,
        playerId: players[4].id, // Javier in U-16 match
        status: 'PRESENT',
      },
    }),
    prisma.attendance.create({
      data: {
        matchId: matches[1].id,
        playerId: players[0].id, // Carlos in U-12 scrimmage
        status: 'PENDING',
      },
    }),
    prisma.attendance.create({
      data: {
        matchId: matches[1].id,
        playerId: players[3].id, // Luis in U-12 scrimmage
        status: 'PENDING',
      },
    }),
  ]);

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${players.length} players, ${teams.length} teams, ${matches.length} matches`);
  console.log('🔑 Admin login: admin@dfmonterrey.mx / admin123');
  console.log('🔑 Coach login: coach@dfmonterrey.mx / coach123');
  console.log('🔑 Parent login: parent@dfmonterrey.mx / parent123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
