# AuraLog - Personal Mood & Emotion Tracking Application

AuraLog is a modern web application for tracking your emotions and moods, providing insights into your emotional well-being through an intuitive and engaging interface.

## 🌟 Features

- **User Authentication**: Secure login and signup with Supabase
- **Dashboard**: Visual representation of your emotional patterns
- **Emotion Tracking**: Log your emotions with context
- **Voice Journal**: Record voice notes about your emotional state
- **Video Sessions**: Record video logs for more detailed emotional tracking
- **Insights**: Analyze your emotional patterns over time
- **Dark/Light Mode**: Comfortable viewing experience in any lighting condition
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or pnpm (recommended)
- Git

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auralog.git
cd auralog
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install
```

3. Create a Supabase project:
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

4. Set up environment variables:
   - Copy `.env.example` to `.env` in the root directory
   - Update the values with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:3000/api
```

### Running the Application

1. Start the development server:
```bash
# Using npm
npm run dev

# Using pnpm (recommended)
pnpm dev
```

2. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
auralog/
├── .env                    # Environment variables (not in git)
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # TailwindCSS configuration
├── components.json        # Shadcn UI configuration
├── drizzle.config.ts      # Database configuration
├── README.md              # Project documentation
│
├── client/                # Frontend application
│   ├── index.html         # HTML entry point
│   ├── public/            # Static assets
│   └── src/
│       ├── App.tsx        # Root component
│       ├── main.tsx       # Application entry point
│       ├── index.css      # Global styles
│       ├── components/    # Reusable UI components
│       │   ├── ui/        # Base UI components (shadcn)
│       │   └── examples/  # Example component implementations
│       ├── contexts/      # React contexts (Auth, Theme)
│       ├── hooks/         # Custom React hooks
│       ├── lib/           # Utility functions and helpers
│       └── pages/         # Application pages/routes
│
├── server/                # Backend API
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Storage logic
│   └── vite.ts            # Vite integration
│
├── db/                    # Database configuration
│   └── index.ts           # Database setup
│
├── shared/                # Shared types and schemas
│   └── schema.ts          # Shared data schemas
│
└── attached_assets/       # Project assets and documentation
```

## 🛠️ Built With

- **Frontend**:
  - React with TypeScript
  - Vite for build tooling
  - TailwindCSS for styling
  - Radix UI for accessible components
  - Framer Motion for animations
  - Wouter for routing
  - Tanstack Query for data fetching

- **Backend**:
  - Supabase for authentication and database
  - PostgreSQL for data storage

## 🔐 Authentication

The application uses Supabase for authentication. Make sure your Supabase project is properly configured with:
- Email authentication enabled
- Password recovery enabled (optional)
- Required email verification (recommended)

## 🎨 Customization

### Theme

The application supports both light and dark modes. The theme can be customized in:
- `tailwind.config.ts` for color schemes
- `src/contexts/ThemeContext.tsx` for theme logic

### Components

All UI components are built using Radix UI primitives and styled with TailwindCSS. You can customize the appearance by:
- Modifying the components in `src/components/ui/`
- Updating the TailwindCSS configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure your `.env` file is in the root directory
   - Make sure all variable names start with `VITE_`
   - Restart the development server after adding new environment variables

2. **Authentication Issues**
   - Verify your Supabase credentials are correct
   - Check if your Supabase project has the correct authentication settings
   - Ensure your network connection is stable

3. **Build Errors**
   - Clear your node_modules and reinstall dependencies
   - Update all dependencies to their latest compatible versions
   - Check for TypeScript errors in your codebase

For more help, please open an issue in the GitHub repository.

## 📫 Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/auralog](https://github.com/yourusername/auralog)