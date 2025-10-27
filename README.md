 # SpendWise

SpendWise is a compact personal finance app to track transactions, create budgets and view reports. Built with TypeScript and Supabase for fast development and realtime sync.

## Key features

- Email/password auth, CRUD for transactions & budgets
- Realtime updates (INSERT / UPDATE / DELETE)
- Filters, responsive UI and charts

## Tech stack

| Technology         | Purpose                     |
| ------------------ | --------------------------- |
| React + TypeScript | UI & logic                  |
| Supabase           | Auth, Postgres DB, Realtime |
| TailwindCSS        | Styling                     |
| React Router       | Routing                     |
| shadcn/ui (charts) | UI components & charts      |
| date-fns           | Date handling               |
| Vite               | Dev server / build          |

## Quick start

1. Clone and install:
   ```
   git clone <repo>
   cd spendwise
   npm install
   ```
2. Create `.env` (do NOT commit):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_KEY=public-anon-key
   ```
3. Run:
   ```
   npm run dev
   ```

## Security

- Remove any committed `.env` and rotate exposed keys immediately.

 
