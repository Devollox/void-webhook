import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitService implements OnModuleInit, OnModuleDestroy {
  public channel!: amqp.Channel;
  private connection!: amqp.ChannelModel;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const rabbitUrl =
      this.configService.get<string>('RABBITMQ_URL') ||
      'amqp://void:void@rabbitmq:5672';

    this.connection = await amqp.connect(rabbitUrl);
    this.channel = await this.connection.createChannel();

    const queue = 'discord_notifications';
    await this.channel.assertQueue(queue, { durable: true });
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }

  sendToQueue(queue: string, content: Buffer, options?: amqp.Options.Publish) {
    return this.channel.sendToQueue(queue, content, options);
  }
}
