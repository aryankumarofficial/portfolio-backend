# Portfolio Backend API

A Fastify-based REST API backend for my portfolio website, built with Bun and PostgreSQL.

## Tech Stack

- **Runtime**: [Bun](https://bun.com)
- **Framework**: Fastify v5
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT with httpOnly cookies
- **Password Hashing**: Argon2
- **AI Moderation**: GROQ SDK
- **Validation**: Zod

## Features

- Contact form submission with AI content moderation
- Admin authentication (login/logout)
- Message management (view and mark as read)
- Rate limiting
- CORS configuration
- JWT-based session management

## Prerequisites

- Bun runtime
- PostgreSQL database
- GROQ API key (for content moderation)

## Environment Variables

Create a `.env` file with the following:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
GROQ_API_KEY=your-groq-api-key
PORT=8000
# auth - used at seeding
ADMIN_EMAIL=admin-email
ADMIN_PASSWORD=admin-password
```

## Installation

```bash
bun install
```

## Database Setup

```bash
# Generate migration files
bun run db:generate

# Push migrations to database
bun run db:migrate

# (Optional) Open Drizzle Studio
bun run db:studio
```

## Running the Server

```bash
# Development (with watch mode)
bun run dev

# Production
bun run start
```

## Seed Admin User

```bash
bun run seed
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | Admin login | No |
| POST | `/auth/logout` | Admin logout | Yes |
| POST | `/contact` | Submit contact form | No |
| GET | `/messages` | Get all messages | Yes |
| PATCH | `/messages/:id` | Mark message as read | Yes |

## License

MIT