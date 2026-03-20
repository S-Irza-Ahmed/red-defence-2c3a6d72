# Contributing Guide — Red Defence

## Folder Structure

```
src/
├── assets/              # Static assets: images, icons, fonts
│   ├── icons/           #   SVG and icon files
│   ├── images/          #   Raster images (PNG, JPG, WebP)
│   └── fonts/           #   Custom font files
├── components/
│   ├── layout/          # App-level layout (Navbar, Footer, Sidebar)
│   ├── navigation/      # Navigation primitives (NavLink)
│   ├── shared/          # Cross-feature shared components
│   └── ui/              # Reusable UI primitives (shadcn + custom)
├── constants/           # App-wide constants and config values
│   ├── navigation.ts    #   Nav items
│   ├── routes.ts        #   Route path constants
│   └── config.ts        #   App config, env mappings, storage keys
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
├── lib/                 # Utility functions and library configs
│   ├── utils.ts         #   cn() helper (shadcn/ui)
│   └── queryClient.ts   #   React Query client instance
├── services/            # Global API clients, data-fetching logic
├── test/                # Global test setup and helpers
│   ├── setup.ts         #   Vitest global setup
│   ├── mocks/           #   Shared mock data and handlers
│   └── utils/           #   Shared test helper functions
├── types/               # Global TypeScript types and interfaces
├── App.tsx              # Root component with routing
├── index.css            # Global styles and design tokens
└── main.tsx             # Entry point
```

## Adding a New Feature

1. Create a folder under `src/features/<feature-name>/`
2. Add your page component as `<FeatureName>Page.tsx`
3. Add internal subfolders as needed:

```
src/features/monitoring/
├── MonitoringPage.tsx     # Main page component
├── components/            # Feature-specific components
│   └── AlertList.tsx
├── hooks/                 # Feature-specific hooks
│   └── useAlerts.ts
├── services/              # Feature-specific API calls
│   └── monitoringService.ts
├── types/                 # Feature-specific types
│   └── types.ts
└── index.ts               # Barrel file
```

4. Export everything from an `index.ts` barrel file
5. Re-export from `src/features/index.ts`
6. Add the route in `src/App.tsx`
7. If it needs a nav link, add it to `src/constants/navigation.ts`
8. Add the route path constant to `src/constants/routes.ts`

## Where Things Go

| I need to add…                  | Location                                    |
|---------------------------------|---------------------------------------------|
| A new page/feature              | `src/features/<name>/`                      |
| A reusable UI primitive         | `src/components/ui/`                        |
| A cross-feature shared component| `src/components/shared/`                    |
| A layout component              | `src/components/layout/`                    |
| A shared hook                   | `src/hooks/`                                |
| A feature-specific hook         | `src/features/<name>/hooks/`                |
| A feature-specific API call     | `src/features/<name>/services/`             |
| A global API service            | `src/services/`                             |
| Global TypeScript types         | `src/types/`                                |
| Feature-specific types          | `src/features/<name>/types/`                |
| App-wide constants              | `src/constants/`                            |
| Route path constants            | `src/constants/routes.ts`                   |
| Static assets                   | `src/assets/` (icons/, images/, or fonts/)  |
| Global test setup               | `src/test/`                                 |
| Shared mock data                | `src/test/mocks/`                           |
| Tests for a feature             | `src/features/<name>/__tests__/`            |

## Naming Conventions

| Item           | Convention               | Example                      |
|----------------|--------------------------|------------------------------|
| Folders        | `kebab-case`             | `risk-analysis/`             |
| Components     | `PascalCase.tsx`         | `ScanPage.tsx`               |
| Hooks          | `camelCase.ts`           | `useAuth.ts`                 |
| Services       | `camelCase.ts`           | `authService.ts`             |
| Types files    | `camelCase.ts`           | `types.ts`, `api.types.ts`   |
| Constants      | `camelCase.ts`           | `routes.ts`, `config.ts`     |
| Barrel files   | `index.ts`               | `index.ts`                   |
| Test files     | `*.test.tsx` / `.spec`   | `ScanPage.test.tsx`          |
| CSS classes    | Tailwind + design tokens | Use `text-primary`, not raw colors |

## Import Rules

- Use `@/` path alias for all imports (e.g., `@/components/ui/button`)
- Prefer importing from barrel files: `import { ScanPage } from '@/features'`
- Never use relative imports that go up more than one level (`../../`)
- Import route constants from `@/constants/routes` instead of hardcoding paths

## Key Rules

- **No business logic in `src/components/`** — components are UI only
- **Feature modules are self-contained** — keep feature-specific code inside its feature folder
- **Shared across 2+ features?** → move it to `src/components/shared/` or `src/hooks/`
- **Every folder gets a barrel file** (`index.ts`) for clean imports
- **Tests co-locate with features** in `__tests__/` subdirectories
