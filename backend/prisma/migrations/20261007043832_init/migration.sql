-- CreateEnum
CREATE TYPE "GithubEventType" AS ENUM ('push', 'release', 'pull_request', 'issues');

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "githubOwner" TEXT NOT NULL,
    "githubRepo" TEXT NOT NULL,
    "events" "GithubEventType"[],
    "discordWebhookUrl" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "branchFilter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Subscription_githubOwner_githubRepo_idx" ON "Subscription"("githubOwner", "githubRepo");

-- CreateIndex
CREATE INDEX "Subscription_enabled_idx" ON "Subscription"("enabled");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_githubOwner_githubRepo_discordWebhookUrl_key" ON "Subscription"("githubOwner", "githubRepo", "discordWebhookUrl");
