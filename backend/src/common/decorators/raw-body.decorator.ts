import { applyDecorators, SetMetadata } from '@nestjs/common';

export default function RawBodyRoute() {
  applyDecorators(SetMetadata('fastify-route-config', { rawBody: true }));
}
