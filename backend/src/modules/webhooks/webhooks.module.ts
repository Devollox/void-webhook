import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { WebhooksService, DISCORD_QUEUE } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { WebhooksConsumer } from './webhooks.consumer';
import { DiscordService } from './discord.service';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [
    SubscriptionModule,
    BullModule.registerQueue({
      name: DISCORD_QUEUE,
    }),
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService, WebhooksConsumer, DiscordService],
})
export class WebhooksModule {}
