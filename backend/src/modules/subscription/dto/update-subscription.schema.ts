import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { GithubEventTypeSchema } from './create-subscription.schema';

export const UpdateSubscriptionSchema = z.object({
  events: z.array(GithubEventTypeSchema).min(1).optional(),
  discordWebhookUrl: z
    .string()
    .url()
    .startsWith('https://discord.com/api/webhooks/')
    .optional(),
  branchFilter: z.string().trim().min(1).max(255).nullable().optional(),
  enabled: z.boolean().optional(),
});

export type UpdateSubscriptionInput = z.infer<typeof UpdateSubscriptionSchema>;

export class UpdateSubscriptionDto extends createZodDto(
  UpdateSubscriptionSchema,
) {}
