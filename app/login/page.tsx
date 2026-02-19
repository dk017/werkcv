"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [next, setNext] = useState("/templates");

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState<"email" | "code">("email");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [devCode, setDevCode] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const raw = params.get("next");
        if (raw && raw.startsWith("/")) {
            setNext(raw);
        }
    }, []);

    const requestCode = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setDevCode(null);
        try {
            const response = await fetch("/api/auth/request-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok) {
                setError(data?.error || "Kon geen login code versturen.");
                return;
            }
            if (data?.devCode) {
                setDevCode(data.devCode);
            }
            setStep("code");
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/auth/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok) {
                setError(data?.error || "Code is ongeldig of verlopen.");
                return;
            }
            router.replace(next);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#eef3f1] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                <div className="mb-5">
                    <Link href="/" className="font-semibold text-lg text-slate-900">
                        Werk<span className="bg-emerald-200 px-1 rounded-sm">CV</span>.nl
                    </Link>
                    <h1 className="text-xl font-semibold text-slate-900 mt-3">Log in om je CV op te slaan</h1>
                    <p className="text-sm text-slate-600 mt-1">
                        We sturen een eenmalige code naar je e-mailadres.
                    </p>
                </div>

                {step === "email" ? (
                    <form onSubmit={requestCode} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                                E-mailadres
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                placeholder="jij@voorbeeld.nl"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-2.5 rounded-md font-semibold border border-emerald-700 hover:bg-emerald-700 transition-colors disabled:opacity-60"
                        >
                            {loading ? "Bezig..." : "Stuur login code"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={verifyCode} className="space-y-4">
                        <div className="text-sm text-slate-600">
                            Code gestuurd naar <strong>{email}</strong>.
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                                6-cijferige code
                            </label>
                            <input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                                pattern="\d{6}"
                                maxLength={6}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                placeholder="123456"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-2.5 rounded-md font-semibold border border-emerald-700 hover:bg-emerald-700 transition-colors disabled:opacity-60"
                        >
                            {loading ? "Bezig..." : "Verifieer en ga verder"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep("email")}
                            className="w-full bg-slate-100 text-slate-700 py-2 rounded-md font-semibold border border-slate-300 hover:bg-slate-200 transition-colors"
                        >
                            Ander e-mailadres gebruiken
                        </button>
                        {devCode && (
                            <div className="text-xs text-amber-900 bg-amber-100 border border-amber-300 rounded-md px-3 py-2">
                                Dev code: <strong>{devCode}</strong>
                            </div>
                        )}
                    </form>
                )}

                {error && (
                    <div className="mt-4 text-sm text-rose-800 bg-rose-100 border border-rose-300 rounded-md px-3 py-2">
                        {error}
                    </div>
                )}
            </div>
        </main>
    );
}
