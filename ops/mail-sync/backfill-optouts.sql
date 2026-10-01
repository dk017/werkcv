-- One-off (1 Oct 2026): replies that open with "stop"/"afmelden"/... before the sync recognised them
-- were stored as "paused". Mark those senders do_not_contact and cancel any unsent follow-ups to them.
-- Safe to re-run.
begin;
create temp table optouts as
  select distinct email from "EmailMessage"
  where direction = 'inbound' and "bodyPreview" ~* '^\s*(stop|stoppen|unsubscribe|afmelden|uitschrijven)\y';

insert into "FollowupContact" (id, email, source, status, notes, "createdAt", "updatedAt")
  select gen_random_uuid()::text, email, 'imap:INBOX', 'do_not_contact', 'Replied stop/unsubscribe (backfill 2026-10-01).', now(), now()
  from optouts
  on conflict (email) do update
    set status = 'do_not_contact', notes = 'Replied stop/unsubscribe (backfill 2026-10-01).', "updatedAt" = now();

update "FollowupTask"
  set status = 'do_not_contact', "skippedReason" = 'imap_do_not_contact', "updatedAt" = now()
  where lower(email) in (select email from optouts) and "sentAt" is null and status in ('draft', 'approved');

select count(*) as opted_out_senders_now_do_not_contact
  from "FollowupContact" where status = 'do_not_contact' and lower(email) in (select email from optouts);
commit;
