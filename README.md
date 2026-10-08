<img width="3844" height="793" alt="484064966-2c662772-bca231-4de4-988f-5304d7dfd87d" src="https://github.com/user-attachments/assets/eea692df-b300-45de-8acb-03ab75cfdf3c" />

##

GitHub to Discord notification service built with **NestJS** and **Fastify**.

## Features

- **Signature Verification**: Every request is verified with HMAC-SHA256 — only GitHub can trigger your webhooks.
- **Flexible Subscriptions**: Subscribe any repo to any Discord channel with per-event filtering.
- **Reliable Delivery**: Built-in job queue with retry, backoff, and deduplication so no notification gets lost or doubled.
- **API Key Protection**: Subscription management is locked behind an API key.

## Built With

- [NestJS](https://nestjs.com) + [Fastify](https://fastify.dev) (Backend)
- [PostgreSQL](https://postgresql.org) + [Prisma](https://prisma.io) (Database)
- [Redis](https://redis.io) + [Bull](https://docs.bullmq.io) (Queue, upgradeable to [RabbitMQ](https://rabbitmq.com) on servers with 1GB+ RAM)
- [Astro](https://astro.build) (Frontend)
- [Docker](https://docker.com) (Infrastructure)

## Usage

Add a subscription via the API and configure your GitHub repo to send webhooks to `/webhooks/github`.

Supported events: `push` `release` `pull_request` `issues`

## Author

Made with ❤️ by [Devollox](https://github.com/Devollox)

<p align="left">
  <img width="128" height="128" alt="void-presence" src="https://github.com/user-attachments/assets/32b65183-a39c-4871-bb37-5fbe01ecaade" />
</p>

**Void Presence** – Control your Discord presence. Own your story.
