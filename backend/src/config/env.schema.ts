import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(8080),
  DATABASE_URL: z.string().min(1),
  GITHUB_WEBHOOK_SECRET: z.string().min(16),
  DISCORD_USERNAME: z.string().default('Void Webhook'),
  API_KEY: z.string().min(16),
});

export type Env = z.infer<typeof envSchema>;
