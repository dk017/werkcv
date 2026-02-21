"use client";

interface WelcomeOnboardingProps {
    onDismiss: () => void;
    onUploadCV: () => void;
}

const steps = [
    {
        title: "Vul je gegevens in",
        description: "Begin met je naam, contactgegevens en werkervaring. De editor slaat automatisch op.",
        color: "bg-yellow-400",
    },
    {
        title: "Kies een template",
        description: "Wissel van template en kleurthema in de werkbalk bovenaan. Bekijk direct het resultaat.",
        color: "bg-blue-400",
    },
    {
        title: "Download je CV",
        description: "Klaar? Download als professionele PDF. Eenmalig $5, geen abonnement.",
        color: "bg-pink-400",
    },
];

export default function WelcomeOnboarding({ onDismiss, onUploadCV }: WelcomeOnboardingProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#FFFEF0] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full">
                {/* Header */}
                <div className="bg-yellow-400 border-b-4 border-black px-6 py-5">
                    <h2 className="text-2xl font-black text-black">
                        Welkom bij WerkCV.nl!
                    </h2>
                    <p className="font-medium text-black/80 text-sm mt-1">
                        Maak een professioneel CV in 3 eenvoudige stappen
                    </p>
                </div>

                {/* Steps */}
                <div className="p-6 space-y-4">
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div
                                className={`w-10 h-10 ${step.color} border-3 border-black flex items-center justify-center flex-shrink-0 font-black text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                                style={{ borderWidth: "3px" }}
                            >
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="font-black text-black text-sm">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-600 font-medium mt-0.5">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t-3 border-black mx-6" style={{ borderTopWidth: "3px" }} />

                {/* Actions */}
                <div className="px-6 py-5 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onDismiss}
                        className="flex-1 bg-yellow-400 text-black py-3 font-black text-sm border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                        style={{ borderWidth: "3px" }}
                    >
                        Begin met typen
                    </button>
                    <button
                        onClick={onUploadCV}
                        className="flex-1 bg-[#4ECDC4] text-black py-3 font-black text-sm border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                        style={{ borderWidth: "3px" }}
                    >
                        Upload bestaand CV
                    </button>
                </div>
            </div>
        </div>
    );
}
