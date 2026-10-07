import { applyDecorators, SetMetadata } from '@nestjs/common';

export default function RawBodyRoute() {
  return applyDecorators(
    SetMetadata('fastify-route-config', { rawBody: true }),
  );
}
