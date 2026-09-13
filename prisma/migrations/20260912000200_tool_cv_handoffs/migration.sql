CREATE TABLE "ToolCvHandoff" (
  "id" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "kind" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "consumedAt" TIMESTAMP(3),
  "consumedByUserId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ToolCvHandoff_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ToolCvHandoff_consumedByUserId_fkey" FOREIGN KEY ("consumedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "ToolCvHandoff_tokenHash_key" ON "ToolCvHandoff"("tokenHash");
CREATE INDEX "ToolCvHandoff_expiresAt_idx" ON "ToolCvHandoff"("expiresAt");
CREATE INDEX "ToolCvHandoff_consumedByUserId_consumedAt_idx" ON "ToolCvHandoff"("consumedByUserId", "consumedAt");
