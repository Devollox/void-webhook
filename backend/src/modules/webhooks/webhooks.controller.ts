import { Controller, HttpCode, Post, Req } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { Public } from '../../common/decorators/public.decorator';
import RawBodyRoute from '../../common/decorators/raw-body.decorator';
import { GithubRequest } from './types/github-request.type';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Public()
  @RawBodyRoute()
  @HttpCode(200)
  @Post('/github')
  async handleGithubWebhook(@Req() req: GithubRequest) {
    await this.webhooksService.handleGithubWebhooks(req);
  }
}
