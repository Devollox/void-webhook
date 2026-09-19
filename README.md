# Void Presence Webhook

Void Presence Webhook is a NestJS-based service for receiving external events and processing them asynchronously.

## Planned Architecture

```text
External Service
      ↓
Nginx
      ↓
NestJS Webhook API
      ↓
RabbitMQ
      ↓
Background Worker
```

The root page will contain a small Astro landing page explaining what the webhook does and how to use it.

```text
/         → Astro landing page
/webhook  → NestJS webhook endpoint
```

## How It Will Work

1. An external service sends a request to `/webhook`.
2. NestJS validates the request and its payload.
3. The event is saved to PostgreSQL through Prisma.
4. The event is published to RabbitMQ.
5. The API quickly returns a success response.
6. A background worker processes the event separately.
7. Redis may be used for caching, rate limiting, and temporary data.

## Planned Technologies

- Astro for the landing page.
- Nginx for HTTPS and reverse proxying.
- NestJS for the backend API.
- PostgreSQL for persistent data.
- Prisma for type-safe database access.
- RabbitMQ for asynchronous event processing.
- Redis for caching and temporary data.
- Docker for running the services.
