import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ZodValidationPipe } from 'nestjs-zod';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { HealthModule } from './modules/health/health.module';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: config.get('REDIS_URL', 'redis://redis:6379'),
      }),
    }),
    DatabaseModule,
    SubscriptionModule,
    HealthModule,
    WebhooksModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
