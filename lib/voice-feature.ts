export function isVoiceCvEnabled(): boolean {
  if (process.env.VOICE_CV_ENABLED === "true") return true;
  if (process.env.VOICE_CV_ENABLED === "false") return false;
  return process.env.NODE_ENV !== "production";
}
