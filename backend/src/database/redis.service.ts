import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(configService: ConfigService) {
    const redisUrl =
      configService.get<string>('REDIS_URL') || 'redis://localhost:6379';

    super(redisUrl);
  }

  async onModuleDestroy() {
    await this.quit();
  }
}
