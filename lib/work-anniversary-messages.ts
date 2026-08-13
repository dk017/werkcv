export type AnniversaryRelation = "collega" | "medewerker" | "leidinggevende" | "team";
export type AnniversaryTone = "warm" | "professioneel" | "kort" | "luchtig";
export type AnniversaryChannel = "kaart" | "teambericht" | "email" | "linkedin";

export type AnniversaryMessageInput = {
    name: string;
    years: number;
    relation: AnniversaryRelation;
    tone: AnniversaryTone;
    channel: AnniversaryChannel;
    company: string;
    contribution: string;
};

export type AnniversaryMessage = {
    label: string;
    bestFor: string;
    subject?: string;
    text: string;
};

function clean(value: string) {
    return value.replace(/\s+/g, " ").trim();
}

function withoutFinalPunctuation(value: string) {
    return clean(value).replace(/[.!?]+$/, "");
}

function formatYears(years: number) {
    const safeYears = Math.min(60, Math.max(1, Math.round(years * 2) / 2));
    return new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 1 }).format(safeYears);
}

function capitalize(value: string) {
    return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;
}

function contributionSentence(contribution: string, perspective: "ik" | "we") {
    const detail = withoutFinalPunctuation(contribution);
    if (!detail) return "";
    return `${perspective === "ik" ? "Wat ik vooral waardeer" : "Wat we vooral waarderen"}: ${detail}.`;
}

function relationContext(relation: AnniversaryRelation) {
    switch (relation) {
        case "medewerker":
            return "in ons team";
        case "leidinggevende":
            return "als leidinggevende";
        case "team":
            return "als team";
        default:
            return "als collega";
    }
}

function channelBestFor(channel: AnniversaryChannel) {
    switch (channel) {
        case "teambericht":
            return "Teams, Slack of intranet";
        case "email":
            return "Persoonlijke e-mail";
        case "linkedin":
            return "Openbare LinkedIn-post";
        default:
            return "Kaart of handgeschreven bericht";
    }
}

export function generateAnniversaryMessages(input: AnniversaryMessageInput): AnniversaryMessage[] {
    const name = clean(input.name) || "jij";
    const directName = name === "jij" ? "" : `${name}, `;
    const years = formatYears(input.years);
    const company = clean(input.company);
    const atCompany = company ? ` bij ${company}` : "";
    const context = relationContext(input.relation);
    const personalI = contributionSentence(input.contribution, "ik");
    const personalWe = contributionSentence(input.contribution, "we");
    const contribution = withoutFinalPunctuation(input.contribution);
    const milestone = `${years} jaar${atCompany}`;
    const isTeam = input.relation === "team";

    const toneOpeners: Record<AnniversaryTone, string> = isTeam
        ? {
            warm: `${directName}van harte gefeliciteerd met jullie ${years}-jarig teamjubileum${atCompany}.`,
            professioneel: `${directName}gefeliciteerd met ${years} jaar samenwerking${atCompany}.`,
            kort: `${directName}gefeliciteerd met jullie ${years}-jarig teamjubileum!`,
            luchtig: `${directName}${years} jaar samen — dat verdient een mooi moment!`,
        }
        : {
            warm: `${directName}van harte gefeliciteerd met je ${milestone}.`,
            professioneel: `${directName}gefeliciteerd met je werkjubileum van ${milestone}.`,
            kort: `${directName}gefeliciteerd met ${milestone}!`,
            luchtig: `${directName}${years} jaar${atCompany} — dat verdient een mooi moment!`,
        };

    const tailoredMiddle = contribution
        ? input.relation === "medewerker" || input.relation === "team"
            ? personalWe
            : personalI
        : input.relation === "leidinggevende"
            ? "Dank voor je vertrouwen, heldere koers en aandacht voor het team."
            : input.relation === "medewerker"
                ? "Je betrokkenheid en betrouwbare bijdrage aan het team worden oprecht gewaardeerd."
                : input.relation === "team"
                    ? "Jullie samenwerking, vakmanschap en inzet hebben zichtbaar bijgedragen aan waar we nu staan."
                    : "Dank voor je betrokkenheid, collegialiteit en alles wat je in die jaren hebt bijgedragen.";

    const warmClose = input.relation === "team"
        ? "Op naar een volgende mooie periode samen."
        : input.relation === "medewerker"
            ? "We hopen dat je met trots terugkijkt en wensen je nog veel mooie momenten toe."
            : "Ik hoop dat je met trots terugkijkt en wens je nog veel mooie momenten toe.";

    const primary = `${capitalize(toneOpeners[input.tone])} ${tailoredMiddle} ${warmClose}`;
    const compact = isTeam
        ? contribution
            ? `${capitalize(toneOpeners.kort)} Dank voor ${contribution} en voor alles wat jullie samen bijdragen.`
            : `${capitalize(toneOpeners.kort)} Dank voor jullie samenwerking en betrokkenheid.`
        : contribution
            ? `${capitalize(toneOpeners.kort)} Dank voor ${contribution} en voor alles wat je ${context} bijdraagt.`
            : `${capitalize(toneOpeners.kort)} Dank voor je inzet en betrokkenheid ${context}.`;
    const formal = capitalize(isTeam
        ? `${capitalize(directName)}namens ${company ? company : "de organisatie"} feliciteren we jullie met het ${years}-jarig teamjubileum. ${personalWe || "We waarderen jullie samenwerking, vakmanschap en betrokkenheid."} Dank voor jullie waardevolle bijdrage.`
        : `${capitalize(directName)}namens ${company ? company : "het team"} feliciteren we je van harte met je ${years}-jarig werkjubileum. ${personalWe || "We waarderen je jarenlange inzet, vakmanschap en betrokkenheid."} Dank voor je waardevolle bijdrage.`);

    const directAddress = capitalize(directName);
    const removeDirectAddress = (message: string) => {
        if (!directAddress || !message.startsWith(directAddress)) return message;
        return capitalize(message.slice(directAddress.length));
    };

    if (input.channel === "email") {
        const salutation = isTeam ? (name === "jij" ? "team" : name) : (name === "jij" ? "collega" : name);
        return [
            {
                label: "Persoonlijk",
                bestFor: channelBestFor(input.channel),
                subject: isTeam ? `Gefeliciteerd met jullie ${years}-jarig teamjubileum` : `Gefeliciteerd met je ${years}-jarig werkjubileum`,
                text: `Beste ${salutation},\n\n${removeDirectAddress(primary)}\n\nHartelijke groet,\n[Jouw naam]`,
            },
            {
                label: "Kort",
                bestFor: "Korte e-mail of begeleidend bericht",
                subject: `${years} jaar${atCompany} — gefeliciteerd!`,
                text: `Beste ${salutation},\n\n${removeDirectAddress(compact)}\n\nGroet,\n[Jouw naam]`,
            },
            {
                label: "Namens de organisatie",
                bestFor: "HR of leidinggevende",
                subject: `Jouw ${years}-jarig jubileum${atCompany}`,
                text: `Beste ${salutation},\n\n${removeDirectAddress(formal)}\n\nMet vriendelijke groet,\n[Naam / team]`,
            },
        ];
    }

    if (input.channel === "linkedin") {
        const publicDetail = contribution
            ? `Een bijdrage die daarbij in het bijzonder opvalt: ${contribution}.`
            : "Een mooi moment om stil te staan bij de kennis, inzet en samenwerking die in al die jaren zijn opgebouwd.";
        const publicOpening = isTeam
            ? `${capitalize(directName)}vandaag vieren we jullie ${years}-jarig teamjubileum${atCompany}.`
            : `${capitalize(directName)}vandaag vieren we je ${years}-jarig werkjubileum${atCompany}.`;
        return [
            {
                label: "Openbaar en persoonlijk",
                bestFor: channelBestFor(input.channel),
                text: `${publicOpening} ${publicDetail} Gefeliciteerd met deze bijzondere mijlpaal!`,
            },
            {
                label: "Compacte post",
                bestFor: "LinkedIn-post met foto",
                text: isTeam
                    ? `${capitalize(directName)}gefeliciteerd met ${years} jaar samenwerking${atCompany}! Dank voor jullie betrokkenheid, vakmanschap en gezamenlijke bijdrage.`
                    : `${capitalize(directName)}gefeliciteerd met ${years} jaar${atCompany}! Dank voor je betrokkenheid, vakmanschap en waardevolle bijdrage ${context}.`,
            },
            {
                label: "Namens het team",
                bestFor: "Bedrijfspagina of teambericht",
                text: `${capitalize(formal)} We zijn blij deze mijlpaal samen te vieren.`,
            },
        ];
    }

    return [
        { label: "Persoonlijk", bestFor: channelBestFor(input.channel), text: primary },
        { label: "Kort", bestFor: input.channel === "teambericht" ? "Snel teambericht" : "Kleine kaart", text: compact },
        { label: "Namens het team", bestFor: "Formele kaart of organisatiebericht", text: formal },
    ];
}
