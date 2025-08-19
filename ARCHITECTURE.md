
# Project Architecture & Code Organisation

This project is built with **TanStack Router**, **Drizzle ORM + Postgres**, and follows a **feature-first structure** inspired by Nx monorepos.  
The goal is to **keep features isolated, code discoverable, and dependencies flowing in one direction**.

---

## Folder Structure

```
src/
  routes/           # Route definitions (feature-shells)
  features/         # Domain features (business logic, state, components)
    auth/
    users/
    dashboard/
  components/ui/    # Shared, reusable UI building blocks (buttons, modals, etc.)
  lib/              # Shared libraries (api clients, hooks, form helpers, etc.)
  utils/            # Generic utilities (formatting, parsing, constants)
  db/               # Database layer (drizzle schema, queries, migrations)
```

---

## Architectural Principles

### 1. **Routes as Feature-Shells**
- Routes live in `src/routes/`.
- They should be **thin wrappers** around feature modules.
- A route should orchestrate **what features to load**, but the **feature itself owns its logic**.

✅ Example:
```tsx
// src/routes/dashboard.tsx
import { DashboardPage } from "@/features/dashboard"

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
})
```

---

### 2. **Features Own Their Logic**
- A feature is self-contained in `src/features/<name>/`.
- Each feature may include:
  - `components/` → UI specific to that feature
  - `hooks/` → TanStack Query hooks or custom state
  - `services/` → feature-specific data access, calls into `db` or `lib`
  - `types.ts` → shared types

✅ Example:
```
src/features/auth/
  components/LoginForm.tsx
  hooks/useLogin.ts
  services/authService.ts
  types.ts
```

---

### 3. **Shared UI Components**
- Put **reusable, styling-agnostic components** in `src/components/ui/`.
- Think: `Button`, `Modal`, `Card`, `FormInput`.
- These components should **not depend on features**.

---

### 4. **Libs & Utils**
- `lib/` → Opinionated, app-wide utilities (API client, toast system, validation helpers).
- `utils/` → Pure functions, formatting, math, string helpers.  
- **Features can depend on lib/utils**, but not the other way around.

---

### 5. **Database Layer**
- All DB code lives in `src/db/`:
  - `schema.ts` → Drizzle schema
  - `queries/` → Reusable query functions
  - `migrations/` → Database migrations
- Features should **not query the database directly**; instead, go through **services**.

✅ Example:
```ts
// src/db/queries/users.ts
import { db } from "@/db"
import { users } from "@/db/schema"

export const getUserById = (id: string) => {
  return db.query.users.findFirst({ where: eq(users.id, id) })
}
```

---

## Dependency Flow

- `routes` → `features`
- `features` → `db`, `lib`, `utils`, `components/ui`
- `lib/utils/components` → **never import from features**
- `db` → isolated (no imports from features or routes)

Think of it as **one-way arrows pointing downwards**.

---

## Developer Rules of Thumb

1. **If it’s domain-specific, it belongs in a feature.**
2. **If it’s generic and reusable across the app, put it in shared.**
3. **Routes never own logic** — they delegate to features.
4. **DB queries live in `db/`, not inside features.**
5. **Keep imports flowing one way:**  
   `routes → features → shared (ui/lib/utils/db)`  

---

👉 If you’re unsure where code belongs, ask:  
- *“Will this ever be reused across features?”* → Shared  
- *“Does this only matter for this domain?”* → Feature  
- *“Is this just a wrapper/orchestrator?”* → Route  
