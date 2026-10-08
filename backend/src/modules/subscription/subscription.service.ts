import { Injectable, NotFoundException } from '@nestjs/common';
import { Subscription } from '../../../generated/prisma/client';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateSubscriptionInput,
  GithubEventType,
} from './dto/create-subscription.schema';
import { UpdateSubscriptionInput } from './dto/update-subscription.schema';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSubscriptionInput): Promise<Subscription> {
    return this.prisma.subscription.create({
      data: {
        ...data,
        branchFilter: data.branchFilter ?? null,
      },
    });
  }

  async findAll(): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Subscription> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
    });
    if (!subscription) throw new NotFoundException('Subscription not found');
    return subscription;
  }

  async findMatching(params: {
    owner: string;
    repo: string;
    event: GithubEventType;
  }): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({
      where: {
        githubOwner: params.owner,
        githubRepo: params.repo,
        events: { has: params.event },
        enabled: true,
      },
    });
  }

  async update(
    id: string,
    data: UpdateSubscriptionInput,
  ): Promise<Subscription> {
    await this.findOne(id);
    return this.prisma.subscription.update({
      where: { id },
      data,
    });
  }

  async disable(id: string): Promise<Subscription> {
    await this.findOne(id);
    return this.prisma.subscription.update({
      where: { id },
      data: { enabled: false },
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.subscription.delete({ where: { id } });
  }
}
