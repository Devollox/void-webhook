import { FastifyRequest } from 'fastify';

export type GithubRequest = FastifyRequest & { rawBody?: string };
