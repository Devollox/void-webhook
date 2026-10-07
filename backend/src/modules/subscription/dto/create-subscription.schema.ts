import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GithubEventTypeSchema = z.enum([
  'push',
  'release',
  'pull_request',
  'issues',
]);

export const CreateSubscriptionSchema = z.object({
  githubOwner: z.string().trim().min(1).max(100),
  githubRepo: z.string().trim().min(1).max(100),
  events: z.array(GithubEventTypeSchema).min(1),
  discordWebhookUrl: z
    .string()
    .url()
    .startsWith('https://discord.com/api/webhooks/'),
  branchFilter: z.string().trim().min(1).max(255).nullable().optional(),
});

export type CreateSubscriptionInput = z.infer<typeof CreateSubscriptionSchema>;

export class CreateSubscriptionDto extends createZodDto(
  CreateSubscriptionSchema,
) {}
