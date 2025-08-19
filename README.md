# Dragon Force Monterrey - Academy Operations

A Windows 98-inspired academy management system built with Next.js, Prisma, and TypeScript. Features a high-density UI with retro aesthetics and comprehensive academy operations management.

## 🎨 Features

- **Windows 98 UI Theme**: Classic beveled panels, sharp corners, and retro aesthetics
- **High-Density Layout**: Maximum information visibility with compact design
- **Dark/Light Theme Toggle**: Switch between Retro 98 and Dark themes
- **Player Management**: Complete CRUD operations for academy players
- **Team Management**: Organize players into age-based teams
- **Match Scheduling**: Visual grid-based schedule management
- **Attendance Tracking**: Monitor player attendance for matches
- **Payment Management**: Track fees and payments
- **Dashboard Analytics**: Real-time KPIs and activity monitoring
- **Export Functionality**: CSV exports for data analysis

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   cd academy-ops
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` and set your configuration values.

3. **Set up the database**
   ```bash
   npm run db:setup
   ```
   This will:
   - Generate Prisma client
   - Push schema to database
   - Seed with sample data

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000)

### Default Login Credentials

- **Admin**: `admin@dfmonterrey.mx` / `admin123`
- **Coach**: `coach@dfmonterrey.mx` / `coach123`
- **Parent**: `parent@dfmonterrey.mx` / `parent123`

## 🗄️ Database Schema

The system uses Prisma with SQLite and includes the following models:

- **Users**: Authentication and role management
- **Players**: Academy player information
- **Teams**: Age-based team organization
- **Matches**: Game scheduling and results
- **Fields**: Facility management
- **Attendance**: Player attendance tracking
- **Payments**: Financial management
- **Documents**: File management

## 🎯 API Endpoints

### Players
- `GET /api/players` - List all players with filtering
- `POST /api/players` - Create new player
- `GET /api/players/[id]` - Get specific player
- `PUT /api/players/[id]` - Update player
- `DELETE /api/players/[id]` - Delete player

### Matches
- `GET /api/matches` - List matches with filtering
- `POST /api/matches` - Create new match

### Dashboard
- `GET /api/reports/dashboard` - Get KPI data and recent activity

## 🎨 UI Components

The system uses custom Windows 98-inspired components:

- `Panel98` - Beveled panel containers
- `Button98` - Classic button styling
- `Input98` - Text and select inputs
- `Table98` - Dense data tables
- `Kpi98` - Compact KPI displays
- `Toolbar98` - Control toolbars
- `ThemeToggle98` - Theme switcher

## 📊 Sample Data

The seed script creates:

- **4 Teams**: U-12 Azul, U-12 Rojo, U-14 Azul, U-16 Azul
- **5 Players**: Various ages and positions
- **3 Matches**: Scheduled games with different statuses
- **3 Payments**: Different payment statuses
- **7 Fields**: Various field types and sizes

## 🔧 Development

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Seed database
npm run db:seed

# Full database setup
npm run db:setup
```

### Adding New Features

1. **Database Changes**: Update `prisma/schema.prisma`
2. **API Routes**: Create new routes in `app/api/`
3. **UI Components**: Add to `components/ui98/`
4. **Pages**: Create new pages in `app/`

## 🎨 Theme System

The application supports two themes:

- **Retro 98**: Light theme with classic Windows 98 aesthetics
- **Dark**: Dark theme for modern preferences

Theme preference is stored in localStorage and persists across sessions.

## 📱 Responsive Design

The UI is optimized for desktop use with the Windows 98 aesthetic, but includes responsive considerations for different screen sizes.

## 🔒 Security

- Role-based access control
- Input validation and sanitization
- Secure API endpoints
- Environment variable protection

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Ensure database is properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ for Dragon Force Monterrey Academy**
