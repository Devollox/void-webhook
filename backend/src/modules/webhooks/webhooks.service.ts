import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { verifyGithubSignature } from '../../common/utils/verify-signature';
import { ConfigService } from '@nestjs/config';
import { GithubRequest } from './types/github-request.type';
import { SubscriptionService } from '../subscription/subscription.service';
import { GithubEventTypeSchema } from '../subscription/dto/create-subscription.schema';
import { z } from 'zod';

export const DISCORD_QUEUE = 'discord_notifications';

const githubPayloadSchema = z.object({
  repository: z.object({
    name: z.string(),
    owner: z.object({
      login: z.string(),
    }),
  }),
});

export type DiscordNotificationPayload = {
  discordWebhookUrl: string;
  owner: string;
  repo: string;
  event: string;
  payload: unknown;
  deliveryId?: string;
};

@Injectable()
export class WebhooksService {
  constructor(
    private configService: ConfigService,
    private subscriptionService: SubscriptionService,
    @InjectQueue(DISCORD_QUEUE) private discordQueue: Queue,
  ) {}

  async handleGithubWebhooks(req: GithubRequest) {
    const valid = verifyGithubSignature({
      rawBody: req.rawBody ?? '',
      signature: req.headers['x-hub-signature-256'] as string | undefined,
      secret: this.configService.getOrThrow('GITHUB_WEBHOOK_SECRET'),
    });

    if (!valid) throw new UnauthorizedException('Invalid signature');

    const eventType = req.headers['x-github-event'] as string | undefined;
    if (!eventType) return;

    const parsedEventType = GithubEventTypeSchema.safeParse(eventType);
    if (!parsedEventType.success) return;

    const parsed = githubPayloadSchema.safeParse(req.body);
    if (!parsed.success) return;

    const { name, owner } = parsed.data.repository;
    const deliveryId = req.headers['x-github-delivery'] as string | undefined;

    const subscriptions = await this.subscriptionService.findMatching({
      owner: owner.login,
      repo: name,
      event: parsedEventType.data,
    });

    for (const subscription of subscriptions) {
      const message: DiscordNotificationPayload = {
        discordWebhookUrl: subscription.discordWebhookUrl,
        owner: owner.login,
        repo: name,
        event: parsedEventType.data,
        payload: req.body,
        deliveryId,
      };

      await this.discordQueue.add(message, {
        jobId: deliveryId,
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: true,
        removeOnFail: false,
      });
    }
  }
}
