"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CVData } from "@/lib/cv";
import { getCompletionState } from "@/lib/cv-completion";
import { track } from "@/lib/analytics";
import { applyVoiceCvChanges, VoiceAnswer, VoiceCvChange, VoiceSection, voiceCvChangeSchema } from "@/lib/voice-cv";

type Stage = "intro" | "question" | "answer_review" | "interview_review" | "creating_proposal" | "proposal_review";
type RecordingState = "idle" | "permission" | "connecting" | "recording" | "paused" | "finalizing" | "error";
type EntryPoint = "empty_state" | "toolbar";

type InterviewQuestion = {
  promptId: string;
  section: VoiceSection;
  titleNl: string;
  titleEn: string;
  promptNl: string;
  promptEn: string;
  hintNl: string;
  hintEn: string;
};

const BASE_QUESTIONS: InterviewQuestion[] = [
  {
    promptId: "contact-1",
    section: "contact",
    titleNl: "Contact en gewenste functie",
    titleEn: "Contact and target role",
    promptNl: "Vertel je naam, woonplaats, e-mailadres of telefoonnummer en welke functie je zoekt.",
    promptEn: "Tell us your name, location, email address or phone number, and the role you are targeting.",
    hintNl: "Noem gegevens rustig en precies. Je controleert de transcriptie voordat we iets verwerken.",
    hintEn: "Say names and contact details slowly and precisely. You will review the transcript before anything is processed.",
  },
  {
    promptId: "profile-1",
    section: "profile",
    titleNl: "Professioneel profiel",
    titleEn: "Professional profile",
    promptNl: "Vertel wat voor professional je bent, waar je expertise ligt, in welke sectoren je hebt gewerkt en welke functie je zoekt.",
    promptEn: "Describe the kind of professional you are, your areas of expertise, the sectors you have worked in, and the role you are targeting.",
    hintNl: "Noem alleen een aantal jaren als je dat zeker weet. Wij schrijven hiervan een professionele profieltekst.",
    hintEn: "Only state a number of years if you know it. We will turn your facts into a professional profile.",
  },
  {
    promptId: "experience-1",
    section: "experience",
    titleNl: "Werkervaring",
    titleEn: "Work experience",
    promptNl: "Vertel over één baan: je exacte functie, werkgever, plaats en periode. Beschrijf daarna je sterkste projecten, wat jij deed, welke tools je gebruikte en wat het opleverde.",
    promptEn: "Describe one job: your exact title, employer, location, and dates. Then explain your strongest projects, what you did, the tools you used, and the outcome.",
    hintNl: "Denk per voorbeeld aan: situatie of doel → jouw actie → resultaat. Noem cijfers alleen als je ze echt weet.",
    hintEn: "For each example, think: context or goal → your action → result. Include numbers only when you genuinely know them.",
  },
  {
    promptId: "education-1",
    section: "education",
    titleNl: "Opleiding",
    titleEn: "Education",
    promptNl: "Vertel over één opleiding: diploma of richting, school, plaats, periode en relevante details.",
    promptEn: "Describe one education: degree or subject, school, location, dates, and relevant details.",
    hintNl: "Gebruik de officiële naam van je opleiding. Noem specialisatie, resultaat of afstudeerproject alleen als het relevant is.",
    hintEn: "Use the official programme or degree name. Add a specialisation, result, or final project only when relevant.",
  },
  {
    promptId: "skills-1",
    section: "skills",
    titleNl: "Vaardigheden en talen",
    titleEn: "Skills and languages",
    promptNl: "Noem je belangrijkste concrete vaardigheden, technologieën, methodes en talen. Vertel kort waar je de belangrijkste vaardigheden hebt gebruikt.",
    promptEn: "List your strongest concrete skills, technologies, methods, and languages. Briefly say where you used the most important ones.",
    hintNl: "Bijvoorbeeld Java, Spring Boot, microservices of projectmanagement. Noem een niveau alleen als je dat zeker weet.",
    hintEn: "For example Java, Spring Boot, microservices, or project management. State a level only when you are sure.",
  },
];

const MAX_ANSWER_SECONDS = 3 * 60;
const MAX_INTERVIEW_SECONDS = 15 * 60;
const STORAGE_TTL_MS = 24 * 60 * 60 * 1000;

type StoredDraft = {
  version: 2;
  cvId: string;
  updatedAt: number;
  questions: InterviewQuestion[];
  answers: Record<string, string>;
  currentIndex: number;
  currentTranscript: string;
  totalDurationSeconds: number;
};

function storageKey(cvId: string) {
  return `werkcv_voice_interview_v1_${cvId}`;
}

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

function fieldLabel(key: string, isEnglish: boolean): string {
  const labels: Record<string, [string, string]> = {
    role: ["Functietitel", "Job title"],
    company: ["Werkgever", "Employer"],
    location: ["Plaats", "Location"],
    start: ["Van", "Start"],
    end: ["Tot", "End"],
    description: ["Functiecontext", "Role context"],
    highlights: ["Resultaten en bijdragen", "Achievements and contributions"],
    degree: ["Opleiding of diploma", "Degree or programme"],
    school: ["Onderwijsinstelling", "Institution"],
    name: ["Naam", "Name"],
    level: ["Niveau (1-5)", "Level (1-5)"],
  };
  return labels[key]?.[isEnglish ? 1 : 0] || key;
}

function humanValue(value: unknown, isEnglish = false): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map((entry) => humanValue(entry, isEnglish)).filter(Boolean).join("\n");
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([, entry]) => entry !== "" && (!Array.isArray(entry) || entry.length > 0))
      .map(([key, entry]) => `${fieldLabel(key, isEnglish)}: ${Array.isArray(entry) ? entry.join("; ") : String(entry)}`)
      .join("\n");
  }
  return "";
}

function changeLabel(change: VoiceCvChange, isEnglish: boolean): string {
  const personalLabels: Record<string, [string, string]> = {
    "personal.name": ["Naam", "Name"],
    "personal.title": ["Gewenste functie", "Target role"],
    "personal.email": ["E-mailadres", "Email address"],
    "personal.phone": ["Telefoonnummer", "Phone number"],
    "personal.location": ["Woonplaats", "Location"],
    "personal.summary": ["Professioneel profiel", "Professional profile"],
  };
  if (change.targetPath && personalLabels[change.targetPath]) {
    return personalLabels[change.targetPath][isEnglish ? 1 : 0];
  }
  const after = change.after && typeof change.after === "object" && !Array.isArray(change.after)
    ? change.after as Record<string, unknown>
    : {};
  const anchor = String(after.company || after.school || after.name || "").trim();
  const sectionLabel = change.section === "experience"
    ? (isEnglish ? "Work experience" : "Werkervaring")
    : change.section === "education"
      ? (isEnglish ? "Education" : "Opleiding")
      : change.targetPath?.startsWith("languages")
        ? (isEnglish ? "Language" : "Taal")
        : (isEnglish ? "Skill" : "Vaardigheid");
  return anchor ? `${sectionLabel} — ${anchor}` : sectionLabel;
}

function EditableAfterValue({ change, onChange, isEnglish }: { change: VoiceCvChange; onChange: (value: unknown) => void; isEnglish: boolean }) {
  if (typeof change.after === "string") {
    return (
      <textarea
        value={change.after}
        onChange={(event) => onChange(event.target.value)}
        rows={change.section === "profile" ? 4 : 2}
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      />
    );
  }

  if (change.after && typeof change.after === "object" && !Array.isArray(change.after)) {
    const objectValue = change.after as Record<string, unknown>;
    return (
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {Object.entries(objectValue).map(([key, value]) => (
          <label key={key} className={Array.isArray(value) ? "sm:col-span-2" : ""}>
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{fieldLabel(key, isEnglish)}</span>
            {Array.isArray(value) ? (
              <textarea
                value={value.join("\n")}
                onChange={(event) => onChange({ ...objectValue, [key]: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) })}
                rows={3}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500"
              />
            ) : (
              <input
                type={typeof value === "number" ? "number" : "text"}
                min={typeof value === "number" ? 1 : undefined}
                max={typeof value === "number" ? 5 : undefined}
                value={String(value ?? "")}
                onChange={(event) => onChange({ ...objectValue, [key]: typeof value === "number" ? Math.max(1, Math.min(5, Number(event.target.value) || 3)) : event.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500"
              />
            )}
          </label>
        ))}
      </div>
    );
  }

  return <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{humanValue(change.after, isEnglish)}</p>;
}

export default function VoiceCvAssistant({
  cvId,
  uiLanguage,
  currentCv,
  entryPoint,
  onApply,
  onClose,
}: {
  cvId: string;
  uiLanguage: "nl" | "en";
  currentCv: CVData;
  entryPoint: EntryPoint;
  onApply: (data: CVData) => void;
  onClose: () => void;
}) {
  const isEnglish = uiLanguage === "en";
  const tr = useCallback((nl: string, en: string) => isEnglish ? en : nl, [isEnglish]);
  const [stage, setStage] = useState<Stage>("intro");
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [questions, setQuestions] = useState<InterviewQuestion[]>(BASE_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [answerSeconds, setAnswerSeconds] = useState(0);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(0);
  const [inputLevel, setInputLevel] = useState(0);
  const [error, setError] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [missingDetails, setMissingDetails] = useState<string[]>([]);
  const [changes, setChanges] = useState<VoiceCvChange[]>([]);
  const [selectedChanges, setSelectedChanges] = useState<Set<string>>(new Set());
  const [restored, setRestored] = useState(false);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const channelRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const transcriptPartsRef = useRef<Map<string, string>>(new Map());
  const transcriptBaseRef = useRef("");
  const finalizingRef = useRef(false);
  const finalizationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answerStartedAtRef = useRef<number | null>(null);
  const currentQuestion = questions[currentIndex];
  const currentQuestionRef = useRef(currentQuestion);
  const currentTranscriptRef = useRef(currentTranscript);
  const answerSecondsRef = useRef(answerSeconds);
  const initialCompletionScoreRef = useRef(getCompletionState(currentCv, uiLanguage).score);

  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
    currentTranscriptRef.current = currentTranscript;
    answerSecondsRef.current = answerSeconds;
  }, [answerSeconds, currentQuestion, currentTranscript]);

  const cleanupRealtime = useCallback(() => {
    if (finalizationTimerRef.current) clearTimeout(finalizationTimerRef.current);
    finalizationTimerRef.current = null;
    finalizingRef.current = false;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    channelRef.current?.close();
    channelRef.current = null;
    peerRef.current?.close();
    peerRef.current = null;
    void audioContextRef.current?.close();
    audioContextRef.current = null;
    setInputLevel(0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    track("voice_mode_opened", {
      cvId,
      uiLanguage,
      entryPoint,
      completionScore: initialCompletionScoreRef.current,
    });
    try {
      const raw = window.sessionStorage.getItem(storageKey(cvId));
      if (raw) {
        const draft = JSON.parse(raw) as StoredDraft;
        if (draft.version === 2 && draft.cvId === cvId && Date.now() - draft.updatedAt < STORAGE_TTL_MS) {
          setQuestions(draft.questions.length ? draft.questions : BASE_QUESTIONS);
          setAnswers(draft.answers || {});
          setCurrentIndex(Math.max(0, Math.min(draft.currentIndex, (draft.questions.length || BASE_QUESTIONS.length) - 1)));
          setCurrentTranscript(draft.currentTranscript || "");
          setTotalDurationSeconds(draft.totalDurationSeconds || 0);
          setRestored(true);
        } else {
          window.sessionStorage.removeItem(storageKey(cvId));
        }
      }
    } catch {
      // Recovery is optional; voice mode still works without session storage.
    }
    return () => {
      document.body.style.overflow = "";
      cleanupRealtime();
    };
  }, [cleanupRealtime, cvId, entryPoint, uiLanguage]);

  useEffect(() => {
    if (stage === "proposal_review" || stage === "creating_proposal") return;
    try {
      const draft: StoredDraft = {
        version: 2,
        cvId,
        updatedAt: Date.now(),
        questions,
        answers,
        currentIndex,
        currentTranscript,
        totalDurationSeconds,
      };
      window.sessionStorage.setItem(storageKey(cvId), JSON.stringify(draft));
    } catch {
      // Do not interrupt the interview when browser storage is unavailable.
    }
  }, [answers, currentIndex, currentTranscript, cvId, questions, stage, totalDurationSeconds]);

  useEffect(() => {
    if (recordingState !== "recording") return;
    const interval = window.setInterval(() => {
      setAnswerSeconds((seconds) => {
        if (seconds + 1 >= MAX_ANSWER_SECONDS) return MAX_ANSWER_SECONDS;
        return seconds + 1;
      });
      setTotalDurationSeconds((seconds) => Math.min(MAX_INTERVIEW_SECONDS, seconds + 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [recordingState]);

  const updateLiveTranscript = useCallback(() => {
    const streamed = Array.from(transcriptPartsRef.current.values()).join(" ").trim();
    setCurrentTranscript([transcriptBaseRef.current, streamed].filter(Boolean).join(" ").replace(/\s+/g, " ").trim());
  }, []);

  const completeAnswer = useCallback((inputMethod: "voice" | "typed" | "skipped", transcriptOverride?: string) => {
    const question = currentQuestionRef.current;
    if (!question) return;
    const transcript = inputMethod === "skipped" ? "" : (transcriptOverride ?? currentTranscriptRef.current).trim();
    currentTranscriptRef.current = transcript;
    setCurrentTranscript(transcript);
    setAnswers((existing) => ({ ...existing, [question.promptId]: transcript }));
    track("voice_answer_completed", {
      cvId,
      uiLanguage,
      section: question.section,
      durationSeconds: answerSecondsRef.current,
      inputMethod,
    });
    setRecordingState("idle");
    setStage("answer_review");
  }, [cvId, uiLanguage]);

  const handleRealtimeEvent = useCallback((event: MessageEvent<string>) => {
    let payload: { type?: string; item_id?: string; delta?: string; transcript?: string; error?: { code?: string } };
    try {
      payload = JSON.parse(event.data);
    } catch {
      return;
    }
    if (payload.type === "conversation.item.input_audio_transcription.delta" && payload.item_id) {
      transcriptPartsRef.current.set(payload.item_id, `${transcriptPartsRef.current.get(payload.item_id) || ""}${payload.delta || ""}`);
      updateLiveTranscript();
    }
    if (payload.type === "conversation.item.input_audio_transcription.completed" && payload.item_id) {
      transcriptPartsRef.current.set(payload.item_id, payload.transcript || transcriptPartsRef.current.get(payload.item_id) || "");
      const finalTranscript = [transcriptBaseRef.current, ...Array.from(transcriptPartsRef.current.values())]
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      currentTranscriptRef.current = finalTranscript;
      setCurrentTranscript(finalTranscript);
      if (finalizingRef.current) {
        finalizingRef.current = false;
        if (finalizationTimerRef.current) clearTimeout(finalizationTimerRef.current);
        window.setTimeout(() => completeAnswer("voice", finalTranscript), 0);
      }
    }
    if (payload.type === "error") {
      if (finalizingRef.current && payload.error?.code === "input_audio_buffer_commit_empty") {
        finalizingRef.current = false;
        completeAnswer(currentTranscriptRef.current.trim() ? "typed" : "skipped");
        return;
      }
      setError(tr("De live transcriptie is onderbroken. Je kunt je antwoord typen.", "Live transcription was interrupted. You can type your answer."));
      setRecordingState("error");
    }
  }, [completeAnswer, tr, updateLiveTranscript]);

  const startMeter = useCallback((stream: MediaStream) => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;
    context.createMediaStreamSource(stream).connect(analyser);
    const values = new Uint8Array(analyser.frequencyBinCount);
    audioContextRef.current = context;
    const measure = () => {
      analyser.getByteFrequencyData(values);
      const average = values.reduce((sum, value) => sum + value, 0) / values.length;
      setInputLevel(Math.min(100, Math.round(average * 1.8)));
      animationFrameRef.current = requestAnimationFrame(measure);
    };
    measure();
  }, []);

  const connectRealtime = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof RTCPeerConnection === "undefined") {
      track("voice_permission_result", { cvId, uiLanguage, result: "unsupported" });
      setError(tr("Je browser ondersteunt live opnemen niet. Typ je antwoord hieronder.", "Your browser does not support live recording. Type your answer below."));
      setRecordingState("error");
      return;
    }

    setError("");
    setRecordingState("permission");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      track("voice_permission_result", { cvId, uiLanguage, result: "granted" });
    } catch (permissionError) {
      track("voice_permission_result", {
        cvId,
        uiLanguage,
        result: permissionError instanceof DOMException && permissionError.name === "NotAllowedError" ? "denied" : "error",
      });
      setError(tr("Microfoontoegang is niet beschikbaar. Je kunt je antwoord typen.", "Microphone access is unavailable. You can type your answer."));
      setRecordingState("error");
      return;
    }

    try {
      setRecordingState("connecting");
      streamRef.current = stream;
      startMeter(stream);
      const tokenResponse = await fetch("/api/voice/session", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-WerkCV-Language": uiLanguage },
        body: JSON.stringify({ cvId, uiLanguage }),
      });
      const token = await tokenResponse.json() as { clientSecret?: string; error?: string };
      if (!tokenResponse.ok || !token.clientSecret) throw new Error(token.error || "SESSION_FAILED");

      const peer = new RTCPeerConnection();
      const channel = peer.createDataChannel("oai-events");
      peerRef.current = peer;
      channelRef.current = channel;
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      channel.addEventListener("message", handleRealtimeEvent);

      const openPromise = new Promise<void>((resolve, reject) => {
        const timeout = window.setTimeout(() => reject(new Error("DATA_CHANNEL_TIMEOUT")), 10_000);
        channel.addEventListener("open", () => { window.clearTimeout(timeout); resolve(); }, { once: true });
      });
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: { Authorization: `Bearer ${token.clientSecret}`, "Content-Type": "application/sdp" },
      });
      if (!sdpResponse.ok) throw new Error("SDP_FAILED");
      await peer.setRemoteDescription({ type: "answer", sdp: await sdpResponse.text() });
      await openPromise;
      transcriptBaseRef.current = currentTranscript.trim();
      transcriptPartsRef.current.clear();
      answerStartedAtRef.current = Date.now();
      setRecordingState("recording");
      track("voice_answer_started", { cvId, uiLanguage, section: currentQuestionRef.current.section });
    } catch {
      cleanupRealtime();
      setError(tr("Opnemen kon niet starten. Je kunt je antwoord typen en doorgaan.", "Recording could not start. You can type your answer and continue."));
      setRecordingState("error");
    }
  }, [cleanupRealtime, currentTranscript, cvId, handleRealtimeEvent, startMeter, tr, uiLanguage]);

  const startOrResume = async () => {
    if (totalDurationSeconds >= MAX_INTERVIEW_SECONDS || answerSeconds >= MAX_ANSWER_SECONDS) {
      setError(tr("De maximale opnametijd is bereikt. Controleer of typ je antwoord.", "The maximum recording time has been reached. Review or type your answer."));
      return;
    }
    if (recordingState === "paused" && streamRef.current && channelRef.current?.readyState === "open") {
      streamRef.current.getAudioTracks().forEach((track) => { track.enabled = true; });
      setRecordingState("recording");
      return;
    }
    if (streamRef.current && channelRef.current?.readyState === "open") {
      transcriptBaseRef.current = currentTranscriptRef.current.trim();
      transcriptPartsRef.current.clear();
      channelRef.current.send(JSON.stringify({ type: "input_audio_buffer.clear" }));
      streamRef.current.getAudioTracks().forEach((track) => { track.enabled = true; });
      answerStartedAtRef.current = Date.now();
      setRecordingState("recording");
      track("voice_answer_started", { cvId, uiLanguage, section: currentQuestionRef.current.section });
      return;
    }
    await connectRealtime();
  };

  const pause = () => {
    streamRef.current?.getAudioTracks().forEach((track) => { track.enabled = false; });
    setRecordingState("paused");
    track("voice_answer_paused", { cvId, uiLanguage, section: currentQuestion.section, durationSeconds: answerSeconds });
  };

  const finishRecording = () => {
    streamRef.current?.getAudioTracks().forEach((track) => { track.enabled = false; });
    if (channelRef.current?.readyState !== "open") {
      completeAnswer(currentTranscriptRef.current.trim() ? "typed" : "skipped");
      return;
    }
    finalizingRef.current = true;
    setRecordingState("finalizing");
    channelRef.current.send(JSON.stringify({ type: "input_audio_buffer.commit" }));
    finalizationTimerRef.current = setTimeout(() => {
      finalizingRef.current = false;
      completeAnswer(currentTranscriptRef.current.trim() ? "typed" : "skipped");
    }, 8_000);
  };

  useEffect(() => {
    if (recordingState !== "recording") return;
    if (answerSeconds < MAX_ANSWER_SECONDS && totalDurationSeconds < MAX_INTERVIEW_SECONDS) return;
    streamRef.current?.getAudioTracks().forEach((track) => { track.enabled = false; });
    setRecordingState("paused");
    setError(tr("De maximale opnametijd is bereikt. Rond dit antwoord af of pas de tekst aan.", "The maximum recording time has been reached. Finish this answer or edit the text."));
  }, [answerSeconds, recordingState, totalDurationSeconds, tr]);

  const reRecord = () => {
    if (channelRef.current?.readyState === "open") channelRef.current.send(JSON.stringify({ type: "input_audio_buffer.clear" }));
    transcriptPartsRef.current.clear();
    transcriptBaseRef.current = "";
    setCurrentTranscript("");
    setAnswerSeconds(0);
    setRecordingState("idle");
    setStage("question");
  };

  const moveFromReview = (direction: "next" | "back") => {
    setAnswers((existing) => ({ ...existing, [currentQuestion.promptId]: currentTranscript.trim() }));
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) {
      setStage("question");
      return;
    }
    if (nextIndex >= questions.length) {
      cleanupRealtime();
      setStage("interview_review");
      return;
    }
    setCurrentIndex(nextIndex);
    setCurrentTranscript(answers[questions[nextIndex].promptId] || "");
    setAnswerSeconds(0);
    setRecordingState("idle");
    setStage("question");
  };

  const addAnother = (section: "experience" | "education") => {
    const count = questions.filter((question) => question.section === section).length + 1;
    const question: InterviewQuestion = section === "experience"
      ? { ...BASE_QUESTIONS[2], promptId: `experience-${Date.now()}`, titleNl: `Werkervaring ${count}`, titleEn: `Work experience ${count}` }
      : { ...BASE_QUESTIONS[3], promptId: `education-${Date.now()}`, titleNl: `Opleiding ${count}`, titleEn: `Education ${count}` };
    const nextQuestions = [...questions];
    nextQuestions.splice(currentIndex + 1, 0, question);
    setQuestions(nextQuestions);
    setAnswers((existing) => ({ ...existing, [currentQuestion.promptId]: currentTranscript.trim() }));
    setCurrentIndex(currentIndex + 1);
    setCurrentTranscript("");
    setAnswerSeconds(0);
    setRecordingState("idle");
    setStage("question");
  };

  const createProposal = async () => {
    const interviewAnswers: VoiceAnswer[] = questions.map((question) => ({
      promptId: question.promptId,
      section: question.section,
      transcript: answers[question.promptId]?.trim() || "",
    })).filter((answer) => answer.transcript);
    if (!interviewAnswers.length) {
      setError(tr("Voeg ten minste één antwoord toe.", "Add at least one answer."));
      return;
    }
    setError("");
    setStage("creating_proposal");
    track("voice_interview_reviewed", { cvId, uiLanguage, answerCount: interviewAnswers.length, totalDurationSeconds });
    track("voice_proposal_started", { cvId, uiLanguage, answerCount: interviewAnswers.length });
    try {
      const response = await fetch("/api/voice/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-WerkCV-Language": uiLanguage },
        body: JSON.stringify({
          cvId,
          uiLanguage,
          currentCv: { ...currentCv, personal: { ...currentCv.personal, photo: "" } },
          answers: interviewAnswers,
        }),
      });
      const body = await response.json() as { changes?: unknown[]; warnings?: string[]; followUpQuestions?: string[]; missingCoreDetails?: string[]; error?: string; code?: string };
      if (!response.ok || !body.changes) throw Object.assign(new Error(body.error || "PROPOSAL_FAILED"), { code: body.code || "PROPOSAL_FAILED" });
      const parsedChanges = body.changes.map((change) => voiceCvChangeSchema.parse(change));
      setChanges(parsedChanges);
      setSelectedChanges(new Set(parsedChanges.map((change) => change.id)));
      setWarnings(body.warnings || []);
      setFollowUpQuestions(body.followUpQuestions || []);
      setMissingDetails(body.missingCoreDetails || []);
      setStage("proposal_review");
      track("voice_proposal_completed", { cvId, uiLanguage, changeCount: parsedChanges.length });
    } catch (proposalError) {
      const errorCode = proposalError && typeof proposalError === "object" && "code" in proposalError ? String(proposalError.code) : "PROPOSAL_FAILED";
      track("voice_proposal_failed", { cvId, uiLanguage, errorCode });
      setError(tr("We konden nog geen voorstel maken. Controleer je antwoorden en probeer opnieuw.", "We could not create a proposal yet. Review your answers and try again."));
      setStage("interview_review");
    }
  };

  const applyChanges = () => {
    const approved = changes.filter((change) => selectedChanges.has(change.id));
    const nextCv = applyVoiceCvChanges(currentCv, approved);
    track("voice_changes_applied", {
      cvId,
      uiLanguage,
      selectedChangeCount: approved.length,
      completionScoreBefore: getCompletionState(currentCv, uiLanguage).score,
      completionScoreAfter: getCompletionState(nextCv, uiLanguage).score,
    });
    window.sessionStorage.removeItem(storageKey(cvId));
    cleanupRealtime();
    onApply(nextCv);
  };

  const close = (discard = false) => {
    if (discard) window.sessionStorage.removeItem(storageKey(cvId));
    track("voice_mode_cancelled", {
      cvId,
      uiLanguage,
      stage,
      answerCount: Object.values(answers).filter((answer) => answer.trim()).length,
    });
    cleanupRealtime();
    onClose();
  };

  const sectionProgress = useMemo(() => `${Math.min(currentIndex + 1, questions.length)} / ${questions.length}`, [currentIndex, questions.length]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="voice-cv-title">
      <div className="flex max-h-[96dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-[#FFFEF9] shadow-2xl sm:max-h-[92vh] sm:rounded-3xl">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-teal-700">WerkCV Voice</p>
            <h2 id="voice-cv-title" className="text-lg font-black text-slate-950">{tr("Bouw je CV door te vertellen", "Build your CV by talking")}</h2>
          </div>
          <button type="button" onClick={() => close(false)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label={tr("Sluiten", "Close")}>✕</button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {restored && stage === "intro" ? (
            <div className="mb-4 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-900">
              {tr("We hebben je eerdere tekstantwoorden hersteld.", "We restored your earlier text answers.")}
            </div>
          ) : null}

          {stage === "intro" ? (
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl border border-teal-200 bg-white p-5 sm:p-7">
                <h3 className="text-xl font-black text-slate-950">{tr("Rustig, stap voor stap", "Calm and step by step")}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {tr("WerkCV toont vijf korte vragen. Jij praat, controleert de tekst en kiest daarna precies welke gegevens in je CV komen.", "WerkCV shows five short questions. You talk, review the text, and then choose exactly which details enter your CV.")}
                </p>
                <ul className="mt-5 space-y-3 text-sm font-medium text-slate-700">
                  <li>✓ {tr("WerkCV praat niet terug", "WerkCV does not speak back")}</li>
                  <li>✓ {tr("Pauzeren, typen, overslaan en opnieuw opnemen kan altijd", "You can always pause, type, skip, or re-record")}</li>
                  <li>✓ {tr("Je CV verandert pas nadat jij het voorstel goedkeurt", "Your CV changes only after you approve the proposal")}</li>
                  <li>✓ {tr("WerkCV bewaart geen audio", "WerkCV does not store audio")}</li>
                </ul>
                <button type="button" onClick={() => { setStage("question"); setCurrentTranscript(answers[questions[currentIndex].promptId] || currentTranscript); }} className="mt-6 w-full rounded-xl bg-teal-700 px-5 py-3.5 text-sm font-black text-white hover:bg-teal-800">
                  {restored ? tr("Doorgaan met interview", "Continue interview") : tr("Start het interview", "Start the interview")}
                </button>
              </div>
            </div>
          ) : null}

          {(stage === "question" || stage === "answer_review") && currentQuestion ? (
            <div className="mx-auto max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-teal-600" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} /></div>
                <span className="text-xs font-bold text-slate-500">{sectionProgress}</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <p className="text-xs font-black uppercase tracking-wide text-teal-700">{isEnglish ? currentQuestion.titleEn : currentQuestion.titleNl}</p>
                <h3 className="mt-2 text-xl font-black leading-snug text-slate-950">{isEnglish ? currentQuestion.promptEn : currentQuestion.promptNl}</h3>
                <p className="mt-3 rounded-xl bg-teal-50 px-4 py-3 text-sm leading-6 text-teal-950">{isEnglish ? currentQuestion.hintEn : currentQuestion.hintNl}</p>

                {stage === "question" ? (
                  <div className="mt-6">
                    <div className={`rounded-2xl border p-4 ${recordingState === "recording" ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-slate-50"}`} aria-live="polite">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className={`h-3 w-3 rounded-full ${recordingState === "recording" ? "animate-pulse bg-rose-500" : recordingState === "paused" ? "bg-amber-500" : "bg-slate-300"}`} />
                          <span className="text-sm font-bold text-slate-800">
                            {recordingState === "recording" ? tr("Opnemen", "Recording") : recordingState === "paused" ? tr("Gepauzeerd", "Paused") : recordingState === "finalizing" ? tr("Transcript afronden…", "Finalising transcript…") : recordingState === "permission" ? tr("Microfoon toestaan…", "Allow microphone…") : recordingState === "connecting" ? tr("Verbinden…", "Connecting…") : tr("Klaar om te beginnen", "Ready to begin")}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-bold text-slate-600">{formatSeconds(answerSeconds)} / 3:00</span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-teal-500 transition-[width]" style={{ width: `${inputLevel}%` }} /></div>
                    </div>

                    {error ? <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">{error}</p> : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {recordingState !== "recording" && recordingState !== "finalizing" ? (
                        <button type="button" onClick={startOrResume} className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-black text-white hover:bg-teal-800">● {recordingState === "paused" ? tr("Hervatten", "Resume") : tr("Start opname", "Start recording")}</button>
                      ) : null}
                      {recordingState === "recording" ? <button type="button" onClick={pause} className="rounded-xl border border-amber-300 bg-amber-50 px-5 py-3 text-sm font-black text-amber-900">Ⅱ {tr("Pauze", "Pause")}</button> : null}
                      {(recordingState === "recording" || recordingState === "paused") ? <button type="button" onClick={finishRecording} className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800">■ {tr("Klaar met antwoord", "Done with answer")}</button> : null}
                    </div>

                    <label className="mt-5 block">
                      <span className="text-xs font-black uppercase tracking-wide text-slate-600">{tr("Live tekst — je kunt ook typen", "Live text — you can also type")}</span>
                      <textarea value={currentTranscript} onChange={(event) => setCurrentTranscript(event.target.value)} rows={7} placeholder={tr("Je antwoord verschijnt hier…", "Your answer appears here…")} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
                    </label>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <button type="button" onClick={() => completeAnswer("skipped")} className="text-sm font-bold text-slate-500 underline">{tr("Overslaan", "Skip")}</button>
                      {currentTranscript.trim() && recordingState !== "recording" && recordingState !== "finalizing" ? <button type="button" onClick={() => completeAnswer("typed")} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white">{tr("Controleer antwoord", "Review answer")} →</button> : null}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6">
                    <label className="block">
                      <span className="text-xs font-black uppercase tracking-wide text-slate-600">{tr("Controleer namen, contactgegevens en datums", "Check names, contact details, and dates")}</span>
                      <textarea value={currentTranscript} onChange={(event) => setCurrentTranscript(event.target.value)} rows={8} className="mt-2 w-full rounded-xl border border-teal-300 bg-teal-50/40 px-4 py-3 text-sm leading-6 outline-none focus:border-teal-600" />
                    </label>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <button type="button" onClick={reRecord} className="text-sm font-bold text-slate-600 underline">{tr("Opnieuw opnemen", "Re-record")}</button>
                      <div className="flex gap-2">
                        {currentIndex > 0 ? <button type="button" onClick={() => moveFromReview("back")} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-black">← {tr("Vorige", "Back")}</button> : null}
                        {(currentQuestion.section === "experience" || currentQuestion.section === "education") ? <button type="button" onClick={() => addAnother(currentQuestion.section as "experience" | "education")} className="rounded-xl border border-teal-300 bg-teal-50 px-4 py-3 text-sm font-black text-teal-900">+ {currentQuestion.section === "experience" ? tr("Nog een baan", "Another job") : tr("Nog een opleiding", "Another education")}</button> : null}
                        <button type="button" onClick={() => moveFromReview("next")} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white">{currentIndex + 1 >= questions.length ? tr("Alles controleren", "Review everything") : tr("Volgende", "Next")} →</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {(stage === "interview_review" || stage === "creating_proposal") ? (
            <div className="mx-auto max-w-3xl">
              <h3 className="text-xl font-black text-slate-950">{tr("Controleer wat je hebt verteld", "Review what you said")}</h3>
              <p className="mt-1 text-sm text-slate-600">{tr("Pas namen, e-mailadressen, telefoonnummers en datums aan voordat WerkCV er CV-velden van maakt.", "Correct names, email addresses, phone numbers, and dates before WerkCV turns them into CV fields.")}</p>
              <div className="mt-5 space-y-4">
                {questions.map((question) => (
                  <label key={question.promptId} className="block rounded-xl border border-slate-200 bg-white p-4">
                    <span className="text-xs font-black uppercase tracking-wide text-teal-700">{isEnglish ? question.titleEn : question.titleNl}</span>
                    <textarea value={answers[question.promptId] || ""} onChange={(event) => setAnswers((existing) => ({ ...existing, [question.promptId]: event.target.value }))} rows={4} placeholder={tr("Overgeslagen", "Skipped")} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm leading-6 outline-none focus:border-teal-500" />
                  </label>
                ))}
              </div>
              {error ? <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-900">{error}</p> : null}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button type="button" disabled={stage === "creating_proposal"} onClick={() => { setCurrentIndex(questions.length - 1); setCurrentTranscript(answers[questions.at(-1)?.promptId || ""] || ""); setStage("answer_review"); }} className="text-sm font-bold text-slate-600 underline">← {tr("Terug naar vragen", "Back to questions")}</button>
                <button type="button" disabled={stage === "creating_proposal"} onClick={createProposal} className="rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-black text-white disabled:opacity-60">{stage === "creating_proposal" ? tr("Voorstel maken…", "Creating proposal…") : tr("Maak mijn CV-voorstel", "Create my CV proposal")}</button>
              </div>
            </div>
          ) : null}

          {stage === "proposal_review" ? (
            <div className="mx-auto max-w-3xl">
              <h3 className="text-xl font-black text-slate-950">{tr("Kies wat er in je CV komt", "Choose what enters your CV")}</h3>
              <p className="mt-1 text-sm text-slate-600">{tr("Er wordt niets verwijderd. Je kunt elk voorstel aanpassen of uitzetten.", "Nothing will be deleted. You can edit or turn off every proposal.")}</p>
              {warnings.length ? <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-sm font-black text-amber-950">{tr("Controleer deze punten", "Check these points")}</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900">{warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul></div> : null}
              {followUpQuestions.length ? <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4"><p className="text-sm font-black text-sky-950">{tr("Maak je CV later nog sterker", "Make your CV even stronger later")}</p><p className="mt-1 text-sm text-sky-900">{tr("Deze gegevens hebben we niet ingevuld of geraden:", "We did not fill in or guess these details:")}</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-sky-900">{followUpQuestions.map((question, index) => <li key={index}>{question}</li>)}</ul></div> : null}
              {missingDetails.length ? <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><strong>{tr("Nog niet gevonden:", "Not found yet:")}</strong> {missingDetails.join(", ")}</div> : null}
              <div className="mt-5 space-y-4">
                {changes.length ? changes.map((change, index) => (
                  <article key={change.id} className={`rounded-xl border p-4 ${selectedChanges.has(change.id) ? "border-teal-300 bg-white" : "border-slate-200 bg-slate-50 opacity-70"}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div><span className="rounded-full bg-teal-100 px-2 py-1 text-[11px] font-black uppercase text-teal-800">{change.action === "add" ? tr("Toevoegen", "Add") : tr("Bijwerken", "Update")}</span><p className="mt-2 text-sm font-black text-slate-800">{changeLabel(change, isEnglish)}</p></div>
                      <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={selectedChanges.has(change.id)} onChange={(event) => setSelectedChanges((existing) => { const next = new Set(existing); if (event.target.checked) next.add(change.id); else next.delete(change.id); return next; })} className="h-5 w-5 accent-teal-700" />{tr("Gebruiken", "Include")}</label>
                    </div>
                    {change.before !== undefined ? <div className="mt-3 rounded-lg bg-slate-100 px-3 py-2"><p className="text-[11px] font-black uppercase text-slate-500">{tr("Nu", "Current")}</p><p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{humanValue(change.before, isEnglish)}</p></div> : null}
                    <div className="mt-3"><p className="text-[11px] font-black uppercase text-teal-700">{tr("Voorstel", "Proposal")}</p><EditableAfterValue change={change} isEnglish={isEnglish} onChange={(after) => setChanges((existing) => existing.map((entry, entryIndex) => entryIndex === index ? { ...entry, after } : entry))} /></div>
                    {change.reviewNote === "SKILL_LEVEL_NOT_STATED" ? <p className="mt-2 text-xs text-slate-500">{tr("Je noemde geen niveau. 3/5 is een neutrale, aanpasbare standaardwaarde.", "You did not state a level. 3/5 is a neutral, editable default.")}</p> : null}
                    {change.reviewNote === "LANGUAGE_LEVEL_NOT_STATED" ? <p className="mt-2 text-xs text-slate-500">{tr("Je noemde geen taalniveau. Controleer de voorgestelde standaardwaarde.", "You did not state a language level. Review the proposed default.")}</p> : null}
                  </article>
                )) : <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm font-semibold text-slate-600">{tr("We vonden geen nieuwe of gewijzigde CV-gegevens. Je huidige CV blijft ongewijzigd.", "We found no new or changed CV details. Your current CV remains unchanged.")}</div>}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button type="button" onClick={() => setStage("interview_review")} className="text-sm font-bold text-slate-600 underline">← {tr("Transcript aanpassen", "Edit transcript")}</button>
                <button type="button" disabled={selectedChanges.size === 0} onClick={applyChanges} className="rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50">{tr(`${selectedChanges.size} wijzigingen toepassen`, `Apply ${selectedChanges.size} changes`)}</button>
              </div>
            </div>
          ) : null}
        </div>

        <footer className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-3 text-xs text-slate-500 sm:px-7">
          <span>{tr("Audio wordt niet door WerkCV opgeslagen", "Audio is not stored by WerkCV")}</span>
          <button type="button" onClick={() => close(true)} className="font-bold underline hover:text-slate-900">{tr("Concept verwijderen", "Discard draft")}</button>
        </footer>
      </div>
    </div>
  );
}
