import { prisma } from '../lib/db';
import { hash } from 'bcryptjs';

async function main(){
  const email = 'admin@dfmonterrey.mx';
  const password = await hash('admin123', 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password, name: 'Admin', role: 'DIRECTOR' }
  });
  console.log('Seeded admin:', email, 'password: admin123');
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1);});
