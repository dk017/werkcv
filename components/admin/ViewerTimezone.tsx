"use client";

import { useSyncExternalStore } from "react";

const browserTimezone = typeof window === "undefined"
  ? "browser local time"
  : Intl.DateTimeFormat().resolvedOptions().timeZone || "browser local time";

function subscribe() {
  return () => undefined;
}

export default function ViewerTimezone() {
  const timezone = useSyncExternalStore(subscribe, () => browserTimezone, () => "browser local time");

  return <span>{timezone}</span>;
}
