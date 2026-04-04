#!/bin/sh
set -e

# Prisma CLI in the standalone runtime image does not include the local
# modules needed to evaluate prisma.config.ts, and db push already receives
# the schema path and DATABASE_URL explicitly below.
rm -f ./prisma.config.ts

echo "Running Prisma db push..."
prisma db push --url "$DATABASE_URL" --schema prisma/schema.prisma

echo "Starting Next.js server..."
exec node server.js
