import { prisma } from '../lib/db';

async function main(){
  console.log('Seed script - database setup not needed for demo');
  console.log('Admin login: admin@dfmonterrey.mx / admin123');
}

main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1);});
