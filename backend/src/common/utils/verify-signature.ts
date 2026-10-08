import { createHmac, timingSafeEqual } from 'crypto';

type VerifyGithubSignatureParams = {
  rawBody: string;
  signature: string | undefined;
  secret: string;
};

export function verifyGithubSignature(
  params: VerifyGithubSignatureParams,
): boolean {
  const { rawBody, signature, secret } = params;

  if (!signature) {
    return false;
  }

  const expectedSignature = `sha256=${createHmac('sha256', secret).update(rawBody).digest('hex')}`;

  if (signature.length !== expectedSignature.length) return false;

  return timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );
}
