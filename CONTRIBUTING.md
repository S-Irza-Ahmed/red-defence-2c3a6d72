# Contributing Guide — Red Defence

## Folder Structure

```
src/
├── assets/              # Static assets: images, icons, fonts
├── components/
│   ├── layout/          # App-level layout (Navbar, Footer, Sidebar)
│   ├── navigation/      # Navigation primitives (NavLink)
│   └── ui/              # Reusable UI primitives (shadcn + custom)
├── constants/           # App-wide constants and config values
├── contexts/            # React context providers (state management)
├── features/            # Feature-based modules (see below)
│   ├── ai-solution/
│   ├── auth/
│   ├── contact/
│   ├── dashboard/
│   ├── landing/
│   ├── not-found/
│   ├── reports/
│   ├── risk-analysis/
│   ├── scan/
│   └── services/
├── hooks/               # Shared custom hooks
├── lib/                 # Utility functions (cn, formatters, etc.)
├── services/            # API clients, data-fetching logic
├── test/                # Test setup and global test helpers
├── types/               # Global TypeScript types and interfaces
├── App.tsx              # Root component with routing
├── index.css            # Global styles and design tokens
└── main.tsx             # Entry point
```

## Adding a New Feature

1. Create a folder under `src/features/<feature-name>/`
2. Add your page component as `<FeatureName>Page.tsx`
3. If needed, add a `types.ts` for feature-specific types
4. Export everything from an `index.ts` barrel file
5. Re-export from `src/features/index.ts`
6. Add the route in `src/App.tsx`
7. If it needs a nav link, add it to `src/constants/navigation.ts`

### Example feature structure

```
src/features/monitoring/
├── MonitoringPage.tsx     # Main page component
├── components/            # Feature-specific components
│   └── AlertList.tsx
├── hooks/                 # Feature-specific hooks
│   └── useAlerts.ts
├── types.ts               # Feature-specific types
└── index.ts               # Barrel file
```

## Naming Conventions

| Item           | Convention               | Example                    |
|----------------|--------------------------|----------------------------|
| Folders        | `kebab-case`             | `risk-analysis/`           |
| Components     | `PascalCase.tsx`         | `ScanPage.tsx`             |
| Hooks          | `use-kebab-case.ts`      | `use-mobile.tsx`           |
| Types files    | `types.ts` or `PascalCase` | `types.ts`, `workflow.ts`|
| Constants      | `kebab-case.ts`          | `navigation.ts`            |
| Barrel files   | `index.ts`               | `index.ts`                 |
| CSS classes    | Tailwind + design tokens | Use `text-primary`, not raw colors |

## Where Things Go

| I need to add…              | Location                                  |
|-----------------------------|--------------------------------------------|
| A new page/feature          | `src/features/<name>/`                     |
| A reusable UI component     | `src/components/ui/`                       |
| A layout component          | `src/components/layout/`                   |
| A shared hook               | `src/hooks/`                               |
| A feature-specific hook     | `src/features/<name>/hooks/`               |
| Global TypeScript types     | `src/types/`                               |
| Feature-specific types      | `src/features/<name>/types.ts`             |
| App-wide constants          | `src/constants/`                           |
| API/data-fetching logic     | `src/services/`                            |
| Static assets               | `src/assets/`                              |
| Test setup files            | `src/test/`                                |
| Tests for a feature         | `src/features/<name>/__tests__/`           |

## Import Rules

- Use `@/` path alias for all imports (e.g. `@/components/ui/button`)
- Prefer importing from barrel files: `import { ScanPage } from '@/features'`
- Never use relative imports that go up more than one level (`../../`)
