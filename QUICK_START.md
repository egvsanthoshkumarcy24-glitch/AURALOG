# 🚀 AuraLog - Quick Start Guide

## Initial Setup (First Time Only)

### 1. Clone and Install
```bash
git clone <repository-url>
cd AURALOG
npm install
```

### 2. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Supabase credentials
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### 3. Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 📁 File Organization

### ✅ Where to Put Your Files

| Type | Location | Example |
|------|----------|---------|
| **React Components** | `client/src/components/` | `DashboardCard.tsx` |
| **UI Components** | `client/src/components/ui/` | `button.tsx` |
| **Pages/Routes** | `client/src/pages/` | `Dashboard.tsx` |
| **Utilities** | `client/src/lib/` | `emotionAnalysis.ts` |
| **Contexts** | `client/src/contexts/` | `AuthContext.tsx` |
| **Hooks** | `client/src/hooks/` | `use-mobile.tsx` |
| **API Routes** | `server/` | `routes.ts` |
| **Shared Types** | `shared/` | `schema.ts` |
| **Static Assets** | `client/public/` | `logo.png` |
| **Environment Variables** | Root (`.env`) | Never commit! |
| **Config Files** | Root | `vite.config.ts` |

---

## 🎯 Common Tasks

### Add a New Page
1. Create file in `client/src/pages/YourPage.tsx`
2. Add route in `client/src/App.tsx`
3. Update navigation in `client/src/components/Navbar.tsx`

### Add a New Component
1. Create file in `client/src/components/YourComponent.tsx`
2. Import and use: `import { YourComponent } from '@/components/YourComponent'`

### Add Environment Variable
1. Add to `.env`: `VITE_YOUR_VAR=value`
2. Add to `.env.example`: `VITE_YOUR_VAR=your_description`
3. Update `client/src/lib/env.ts` to expose the variable
4. Restart dev server

### Install New Package
```bash
npm install package-name
```

### Update Documentation
- Main docs: `README.md`
- Structure guide: `PROJECT_STRUCTURE.md`
- This guide: `QUICK_START.md`

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests (if configured)
npm test
```

---

## 🎨 Import Path Aliases

Use these shortcuts for cleaner imports:

```typescript
// ✅ Good - using aliases
import { Button } from '@/components/ui/button'
import { schema } from '@shared/schema'
import { logo } from '@assets/logo.png'

// ❌ Avoid - relative paths
import { Button } from '../../../components/ui/button'
import { schema } from '../../../shared/schema'
```

---

## 🐛 Troubleshooting

### Environment Variables Not Loading
- Ensure `.env` is in **root directory** (not client/)
- All variables must start with `VITE_`
- Restart dev server after changes

### Import Errors
- Check path aliases in `vite.config.ts`
- Use `@/` for client/src imports
- Use `@shared/` for shared folder
- Use `@assets/` for attached_assets folder

### Port Already in Use
```bash
# Change port in vite.config.ts
server: {
  port: 3001  // Change to different port
}
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📋 Checklist for New Features

- [ ] Create/modify necessary files
- [ ] Update types if needed
- [ ] Test in development
- [ ] Update documentation
- [ ] Test production build
- [ ] Commit with meaningful message

---

## 🔐 Security Reminders

- ❌ **NEVER** commit `.env` file
- ❌ **NEVER** expose API keys in client code
- ✅ Always use `VITE_` prefix for environment variables
- ✅ Keep `.env.example` updated (without real values)
- ✅ Add sensitive files to `.gitignore`

---

## 📚 Useful Links

- [Full Documentation](README.md)
- [Project Structure](PROJECT_STRUCTURE.md)
- [Design Guidelines](design_guidelines.md)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com)

---

**Need Help?** Check `PROJECT_STRUCTURE.md` for detailed information or open an issue on GitHub.

**Last Updated:** November 8, 2025
