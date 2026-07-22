# SEO security-header rollout

WerkCV sends the application security headers from `next.config.ts` on every
route. The Content Security Policy intentionally ships as
`Content-Security-Policy-Report-Only` first. Review production browser-console
violations for 24–48 hours before changing it to the enforcing
`Content-Security-Policy` header.

The public nginx configuration is not stored in this repository. Operations
must add the following directive inside the applicable `http` block (or the
WerkCV `server` block) and reload nginx:

```nginx
server_tokens off;
```

After deployment, verify the headers with `curl -I https://werkcv.nl` and
confirm the `Server` response no longer includes an nginx version.
