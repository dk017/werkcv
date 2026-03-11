# Hetzner Deployment

Last verified: March 11, 2026

This document describes the safe deployment flow for `werkcv.nl` on the Hetzner server.

## Current Production Layout

- Server: `root@65.108.243.208`
- Live repo path: `/opt/werkcv`
- Live Docker project: `werkcv`
- App container: `werkcv-app-1`
- DB container: `werkcv-db-1`
- Live app port mapping on server: `3001:3000`

Important:

- The committed repo [`docker-compose.yml`](./docker-compose.yml) maps `3000:3000`.
- The live server copy at `/opt/werkcv/docker-compose.yml` maps `3001:3000`.
- The checkout at `/opt/werkcv` may contain local modified and untracked files.

Because of that, do not assume `/opt/werkcv` is a clean build context.

## Safe Deploy Rule

Deploy from a clean temporary clone of the exact Git commit you want, but reuse:

- `/opt/werkcv/.env`
- `/opt/werkcv/docker-compose.yml`

This avoids:

- accidentally shipping dirty local files from `/opt/werkcv`
- port mapping drift
- confusion about which commit is actually running

## Pre-Deploy

Run locally:

```bash
git push origin main
git rev-parse HEAD
```

Copy the commit SHA. The rest of the deploy uses that exact SHA.

## Deploy

SSH into the server:

```bash
ssh root@65.108.243.208
```

Then run:

```bash
export COMMIT=<commit-sha>
export DEPLOY_DIR=$(mktemp -d /tmp/werkcv-deploy-XXXXXX)

git clone https://github.com/dk017/werkcv.git "$DEPLOY_DIR"
cd "$DEPLOY_DIR"
git checkout "$COMMIT"

cp /opt/werkcv/.env .env
cp /opt/werkcv/docker-compose.yml docker-compose.yml

docker compose -p werkcv up -d --build app
docker compose -p werkcv ps
```

Expected result:

- `werkcv-app-1` should be `Up`
- `werkcv-db-1` should remain `Up (healthy)`

## Verify

Check logs:

```bash
docker logs werkcv-app-1 --tail 50
```

Check the app from inside the server:

```bash
curl -o /dev/null -s -w 'LOCAL_HOME=%{http_code}\n' http://127.0.0.1:3001/
curl -o /dev/null -s -w 'LOCAL_TOOLS=%{http_code}\n' http://127.0.0.1:3001/tools/
```

Check the public site:

```bash
curl -o /dev/null -s -w 'PUBLIC_HOME=%{http_code}\n' https://werkcv.nl/
curl -o /dev/null -s -w 'PUBLIC_TOOLS=%{http_code}\n' https://werkcv.nl/tools/
```

If you deployed a specific new page or tool, verify that URL directly as well.

Example:

```bash
curl -o /dev/null -s -w 'PUBLIC_NETTO_BRUTO=%{http_code}\n' https://werkcv.nl/tools/netto-bruto-calculator
curl -o /dev/null -s -w 'PUBLIC_TRANSITIE=%{http_code}\n' https://werkcv.nl/tools/transitievergoeding-berekenen
```

## Rollback

Use the same process, but with the previous known-good commit SHA:

```bash
export COMMIT=<previous-good-sha>
export DEPLOY_DIR=$(mktemp -d /tmp/werkcv-deploy-XXXXXX)

git clone https://github.com/dk017/werkcv.git "$DEPLOY_DIR"
cd "$DEPLOY_DIR"
git checkout "$COMMIT"

cp /opt/werkcv/.env .env
cp /opt/werkcv/docker-compose.yml docker-compose.yml

docker compose -p werkcv up -d --build app
```

## Do Not Do This

Do not run this from `/opt/werkcv` unless you have first proved all of the following:

- `git status --short` is empty
- there are no untracked files that should not ship
- `/opt/werkcv/docker-compose.yml` still contains the intended production port mapping

Unsafe shortcut:

```bash
cd /opt/werkcv
docker compose up -d --build app
```

That can silently deploy local server-only changes.

## Known Notes

- A transient `Failed to find Server Action` log right after a deploy can happen if an older browser tab hits the new container with stale action IDs. That is not automatically a bad deploy.
- The DB schema push runs inside the app container startup. Check logs if startup is slower than expected.
- If the app container recreates but public checks fail, confirm the port mapping is still `3001:3000` in `/opt/werkcv/docker-compose.yml`.
