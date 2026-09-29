# Abdullahi Baiwa Portfolio

One-page professional portfolio for Abdullahi Dangana Baiwa, focused on cybersecurity, web development, networking, systems practice, and technical problem solving.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/abdullahi-baiwa-portfolio run dev` — run the portfolio preview
- `pnpm --filter @workspace/abdullahi-baiwa-portfolio run typecheck` — typecheck the portfolio
- `PORT=5173 BASE_PATH=/ pnpm --filter @workspace/abdullahi-baiwa-portfolio run build` — build the portfolio for production
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/abdullahi-baiwa-portfolio/src/data/profile.ts` — editable personal identity, contact details, skills, services, projects, experience, and credentials
- `artifacts/abdullahi-baiwa-portfolio/src/AppReference.tsx` — single-page portfolio sections and interactions, refactored toward the supplied reference structure
- `artifacts/abdullahi-baiwa-portfolio/src/reference.css` — reference-inspired navy grid theme, glow accents, responsive layout, cards, meters, and motion
- `artifacts/abdullahi-baiwa-portfolio/src/index.css` — shared Tailwind base and font setup
- `artifacts/abdullahi-baiwa-portfolio/public/images/profile.jpg` — optional user-provided profile image path
- `artifacts/abdullahi-baiwa-portfolio/public/documents/Abdullahi-Dangana-Baiwa-CV.pdf` — optional CV path

## Architecture decisions

- The portfolio is frontend-only for now; the contact form validates locally and clearly states that no message is sent until a service is connected.
- Personal content is centralized in `src/data/profile.ts` so future edits do not require searching through UI components.
- Missing profile and CV assets use explicit, non-broken states instead of fake images, fake qualifications, or broken downloads.
- Project actions are honest state controls: FMC SMARTFLOW is marked demo-available and PAYGUARD is marked coming soon until real URLs exist.

## Product

- Responsive one-page portfolio with sticky desktop/mobile navigation
- Hero, biography, service cards, animated skill indicators, project cards, experience, certificates, awards placeholder, contact form, social links, and floating WhatsApp action
- Semantic markup, keyboard-visible focus states, accessible form labels, reduced-motion support, and SEO/Open Graph metadata

## User preferences

- Do not invent employers, awards, certificate details, project URLs, profile photos, or other personal claims.
- Keep the tone professional, realistic, and suitable for clients, recruiters, organizations, and academic contacts.

## Gotchas

- Add the real profile image and CV at the paths documented above before enabling public downloads.
- Replace the temporary social/configuration values only in `src/data/profile.ts` when the user provides final URLs or certificate details.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
