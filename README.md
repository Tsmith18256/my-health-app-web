An app targeted at people that are serious about health & fitness and have been
doing it for a while. This app is meant for more accurate tracking, as opposed
to easier "good enough" tracking.

## Getting Started

Run the app in dev mode with:

```bash
npm run dev
```

## UI

### Styling

Styling in this project is done with CSS modules.

#### Breakpoints

There are 5 breakpoints in this project:

1. Mobile: 0
2. Tablet: 48rem
3. Desktop small: 64rem
4. Desktop medium: 96rem
5. Desktop large: 120rem

These breakpoints are configured in 2 places:

1. **For CSS:**
   [breakpoints.module.css](./src/shared/styles/breakpoints.module.css).
2. **For JavaScript:**
   [breakpoint.enum.ts](./src/shared/enums/breakpoint.enum.ts).

## Database

This project is only designed to work with Postgres. The database connection is
initialized in [db.ts](./src/shared/database/db.ts).

### Migrations

Run all database migrations with:

```bash
npm run migrate
```

Database migrations are managed using
[postgres-shift](https://github.com/porsager/postgres-shift). All migrations are
in the `./migrations` folder, with the main script being
[migrate.mjs](./migrations/migrate.mjs).
