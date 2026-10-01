#!/bin/sh
# Imports contact@werkcv.nl (Hostinger IMAP) into EmailMessage and applies opt-outs to FollowupContact.
# Runs on the Hetzner host from /opt/werkcv, which has imapflow and mailparser in node_modules.
# DATABASE_URL in .env uses the compose hostname "db", which only resolves inside containers,
# so point it at the database container's current IP for this run.
set -eu
cd /opt/werkcv
db_ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}' werkcv-db-1 | cut -d' ' -f1)
DATABASE_URL=$(grep '^DATABASE_URL=' .env | cut -d= -f2- | tr -d '"' | sed "s/@db:/@${db_ip}:/")
export DATABASE_URL
exec node_modules/.bin/tsx scripts/followups-sync-mail.ts
