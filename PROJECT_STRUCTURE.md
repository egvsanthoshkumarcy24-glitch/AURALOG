# AuraLog - Project Structure Guide

## 📋 Overview

This document provides a detailed overview of the AuraLog project structure and organization.

## 🗂️ Root Directory

```
AURALOG/
├── .env                     # Environment variables (NEVER commit this)
├── .env.example            # Template for environment variables
├── .gitignore              # Git ignore configuration
├── .replit                 # Replit configuration
├── components.json         # Shadcn UI component configuration
├── design_guidelines.md    # Design system guidelines
├── drizzle.config.ts       # Drizzle ORM configuration
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── postcss.config.js       # PostCSS configuration for TailwindCSS
├── README.md               # Main project documentation
├── PROJECT_STRUCTURE.md    # This file - project structure guide
├── tailwind.config.ts      # TailwindCSS configuration
├── tsconfig.json           # TypeScript compiler configuration
└── vite.config.ts          # Vite bundler configuration
```

## 📂 Directory Structure

### `/client` - Frontend Application

The client directory contains all frontend-related code.

```
client/
├── index.html              # HTML entry point
├── public/                 # Static assets (images, fonts, etc.)
└── src/                    # Source code
    ├── App.tsx             # Root React component
    ├── main.tsx            # Application entry point
    ├── index.css           # Global styles and Tailwind imports
    ├── env.d.ts            # Environment variable type definitions
    │
    ├── components/         # React components
    │   ├── *.tsx           # Main component implementations
    │   ├── ui/             # Base UI components (Shadcn/Radix)
    │   └── examples/       # Example implementations
    │
    ├── contexts/           # React Context providers
    │   ├── AuthContext.tsx     # Authentication state
    │   └── ThemeContext.tsx    # Theme management (dark/light)
    │
    ├── hooks/              # Custom React hooks
    │   ├── use-mobile.tsx      # Mobile detection hook
    │   └── use-toast.ts        # Toast notification hook
    │
    ├── lib/                # Utility functions and helpers
    │   ├── emotionAnalysis.ts  # Emotion tracking logic
    │   ├── env.ts              # Environment variable handling
    │   ├── queryClient.ts      # React Query configuration
    │   ├── storage.ts          # Local storage utilities
    │   └── utils.ts            # General utility functions
    │
    └── pages/              # Application pages/routes
        ├── Dashboard.tsx       # Main dashboard
        ├── Insights.tsx        # Analytics and insights
        ├── Login.tsx           # Login page
        ├── Signup.tsx          # Registration page
        ├── Profile.tsx         # User profile
        ├── VoiceJournal.tsx    # Voice recording feature
        ├── VideoSession.tsx    # Video recording feature
        ├── not-found.tsx       # 404 page
        └── examples/           # Example implementations
```

### `/server` - Backend API

Server-side code and API endpoints.

```
server/
├── index.ts                # Express server setup and initialization
├── routes.ts               # API route definitions
├── storage.ts              # File storage and upload handling
└── vite.ts                 # Vite middleware integration
```

### `/db` - Database Configuration

Database schema and configuration files.

```
db/
└── index.ts                # Database connection and setup
```

### `/shared` - Shared Code

Code shared between frontend and backend.

```
shared/
└── schema.ts               # Shared TypeScript types and schemas
```

### `/attached_assets` - Project Assets

Documentation and design assets.

```
attached_assets/
└── *.txt                   # Project planning and documentation
```

## 🔧 Configuration Files

### TypeScript Configuration (`tsconfig.json`)
- Defines TypeScript compiler options
- Sets module resolution strategy
- Configures path aliases

### Vite Configuration (`vite.config.ts`)
- Defines build settings
- Configures development server
- Sets up path aliases (@, @shared, @assets)
- **Environment directory**: Points to root for `.env` files

### TailwindCSS Configuration (`tailwind.config.ts`)
- Defines color scheme
- Sets up design tokens
- Configures plugins and utilities

### Drizzle Configuration (`drizzle.config.ts`)
- Database connection settings
- Migration configuration
- Schema paths

## 🎨 Component Organization

### UI Components (`client/src/components/ui/`)
Base components from Shadcn UI:
- Styled with TailwindCSS
- Built on Radix UI primitives
- Fully accessible and customizable

### Feature Components (`client/src/components/`)
Application-specific components:
- `ConfidenceRing.tsx` - Confidence visualization
- `DashboardCard.tsx` - Dashboard widgets
- `EmotionBadge.tsx` - Emotion display
- `EmotionChart.tsx` - Emotion graphs
- `LogCard.tsx` - Journal entry cards
- `Navbar.tsx` - Navigation bar
- `StressBar.tsx` - Stress level indicator

## 🔐 Environment Variables

### Location
- Production: `.env` in root directory
- Template: `.env.example` in root directory

### Required Variables
```env
VITE_SUPABASE_URL=         # Your Supabase project URL
VITE_SUPABASE_ANON_KEY=    # Your Supabase anonymous key
VITE_API_URL=              # Backend API URL (default: http://localhost:3000/api)
```

### Important Notes
- All Vite environment variables must be prefixed with `VITE_`
- Never commit `.env` to version control
- Always update `.env.example` when adding new variables

## 🚀 Development Workflow

### Starting Development
```bash
npm run dev          # Start development server
```

### Building for Production
```bash
npm run build        # Build optimized production bundle
```

### Running Tests
```bash
npm test             # Run test suite
```

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Define explicit types for props and state
- Avoid `any` type unless absolutely necessary

### React Components
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks

### File Naming
- Components: PascalCase (e.g., `DashboardCard.tsx`)
- Utilities: camelCase (e.g., `emotionAnalysis.ts`)
- Pages: PascalCase (e.g., `Dashboard.tsx`)

### Import Order
1. External dependencies (React, libraries)
2. Internal absolute imports (@/, @shared)
3. Relative imports (../, ./)
4. Types and interfaces
5. Styles

## 🔄 State Management

### Context API
- `AuthContext`: User authentication state
- `ThemeContext`: Theme preferences

### React Query
- API data fetching and caching
- Configured in `lib/queryClient.ts`

### Local Storage
- Utilities in `lib/storage.ts`
- Used for persistent user preferences

## 🎯 Best Practices

1. **Always use path aliases** (@, @shared) for cleaner imports
2. **Keep components pure** - minimize side effects
3. **Validate environment variables** on startup
4. **Use TypeScript strictly** - enable all strict options
5. **Follow accessibility guidelines** - use semantic HTML
6. **Optimize images** - compress and use appropriate formats
7. **Keep bundle size small** - lazy load routes and components

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

When contributing to this project:
1. Follow the existing structure
2. Update documentation when adding features
3. Write meaningful commit messages
4. Test thoroughly before submitting PR
5. Update `.env.example` if adding new environment variables

---

Last Updated: November 8, 2025
