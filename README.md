# Dragon Force Monterrey – Academy Ops

## Setup
1) Copy `env.example` → `.env` and set `DATABASE_URL` + `NEXTAUTH_SECRET`.
2) `npm i`
3) `npx prisma migrate dev --name init`
4) `npm run seed`
5) `npm run dev` → http://localhost:3000
6) Login: **admin@dfmonterrey.mx** / **admin123**

## Next Steps
- Implement Players, Teams, Scheduling, NFL Grid, Attendance, Results, Compliance, Manual Payments, Settings (Restrictions) per spec.
