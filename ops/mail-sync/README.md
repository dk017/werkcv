# Mail sync (contact@werkcv.nl → database)

Hourly import of the Hostinger mailbox into `EmailMessage`, so replies to follow-up emails are stored and
opt-outs ("Stop", "afmelden", ...) mark the sender `do_not_contact` in `FollowupContact`.

Install on the Hetzner host (once, or after changing these files):

    scp scripts/followups-sync-mail.ts root@65.108.243.208:/opt/werkcv/scripts/
    scp ops/mail-sync/werkcv-mail-sync.sh root@65.108.243.208:/usr/local/bin/
    scp ops/mail-sync/werkcv-mail-sync.service ops/mail-sync/werkcv-mail-sync.timer root@65.108.243.208:/etc/systemd/system/
    ssh root@65.108.243.208 'chmod +x /usr/local/bin/werkcv-mail-sync.sh && systemctl daemon-reload && systemctl enable --now werkcv-mail-sync.timer'

Logs: `journalctl -u werkcv-mail-sync.service -n 50`. Needs `FOLLOWUP_IMAP_*` in `/opt/werkcv/.env`.
