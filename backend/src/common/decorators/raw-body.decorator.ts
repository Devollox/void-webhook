import { applyDecorators, SetMetadata } from '@nestjs/common';

export function RawBodyRoute() {
  return applyDecorators(
    SetMetadata('fastify-route-config', { rawBody: true }),
  );
}
