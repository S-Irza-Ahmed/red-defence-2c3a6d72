# Red Defence — Advanced Cybersecurity Platform

A React + TypeScript single-page application built with Vite, Tailwind CSS, and shadcn/ui.

## Getting Started

```bash
bun install
bun run dev
```

## Root Configuration Files

| Category     | Files                                                          |
|--------------|----------------------------------------------------------------|
| **Build**    | `vite.config.ts`                                               |
| **Styling**  | `tailwind.config.ts`, `postcss.config.js`                      |
| **TypeScript** | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`  |
| **Testing**  | `vitest.config.ts`, `playwright.config.ts`, `playwright-fixture.ts` |
| **Linting**  | `eslint.config.js`                                             |
| **UI**       | `components.json` (shadcn/ui configuration)                    |

> All config files **must** stay at the project root. Do not move them into subdirectories.

## Project Structure

```
src/
├── assets/               # Static assets
│   ├── icons/            #   SVG / icon files
│   ├── images/           #   Raster images (PNG, JPG, WebP)
│   └── fonts/            #   Custom font files
│
├── components/           # Shared, reusable UI components
│   ├── ui/               #   Base primitives (Button, Input, Card …)
│   ├── layout/           #   App shell (Navbar, Footer, PageWrapper)
│   ├── navigation/       #   Navigation primitives (NavLink)
│   └── shared/           #   Cross-feature shared components
│
├── constants/            # App-wide constants & config
│   ├── navigation.ts     #   Nav items
│   ├── routes.ts         #   Route path constants
│   └── config.ts         #   App config & env mappings
│
├── contexts/             # React Context providers
│
├── features/             # Feature modules (self-contained)
│   ├── auth/
│   ├── dashboard/
│   ├── scan/
│   ├── risk-analysis/
│   ├── ai-solution/
│   ├── reports/
│   ├── landing/
│   ├── services/
│   ├── contact/
│   └── not-found/
│
├── hooks/                # Global reusable custom hooks
├── lib/                  # Library configs & utilities
├── services/             # Global API / data-fetching layer
├── test/                 # Global test setup & helpers
│   ├── mocks/            #   Shared mock data
│   └── utils/            #   Shared test utilities
├── types/                # Global TypeScript types
│
├── App.tsx               # Root component + routing
├── index.css             # Global styles + design tokens
├── main.tsx              # Entry point
└── vite-env.d.ts         # Vite type declarations
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed conventions and guidelines.
