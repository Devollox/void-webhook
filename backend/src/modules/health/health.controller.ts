import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import Public from '../../common/decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  async check() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', database: 'ok' };
    } catch {
      return { status: 'ok', database: 'unavailable' };
    }
  }
}
