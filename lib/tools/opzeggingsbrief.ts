export interface OpzeggingsbriefInput {
    naam: string;
    adres: string;
    werkgever: string;
    functie: string;
    datumBrief: string;  // e.g. "27 februari 2026"
    datumEinde: string;  // e.g. "31 maart 2026"
}

export function generateOpzeggingsbrief(input: OpzeggingsbriefInput): string {
    const { naam, adres, werkgever, functie, datumBrief, datumEinde } = input;
    const cleanInline = (value: string) => value.replace(/\s+/g, " ").trim();
    const employeeName = cleanInline(naam);
    const employeeAddress = cleanInline(adres);
    const employerName = cleanInline(werkgever);
    const employerAtSentenceEnd = /[.!?]$/.test(employerName) ? employerName : `${employerName}.`;
    const jobTitle = cleanInline(functie);
    const letterDate = cleanInline(datumBrief);
    const intendedEndDate = cleanInline(datumEinde);

    return `${employeeName}
${employeeAddress ? employeeAddress + '\n' : ''}
${letterDate}

Betreft: Opzegging arbeidsovereenkomst

Geachte heer/mevrouw,

Hierbij zeg ik mijn arbeidsovereenkomst als ${jobTitle} bij ${employerName} schriftelijk op.

Op basis van mijn controle van de geldende opzegtermijn ga ik ervan uit dat ${intendedEndDate} mijn laatste werkdag is. Ik verzoek u de einddatum samen met de ontvangst van deze brief schriftelijk te bevestigen.

Gedurende mijn opzegtermijn zal ik mijn werkzaamheden naar behoren uitvoeren en zorgen voor een zorgvuldige overdracht van mijn taken en verantwoordelijkheden. Ik sta uiteraard open voor overleg over de wijze waarop de overdracht het beste kan worden georganiseerd.

Ik wil u en mijn collega's oprecht bedanken voor de prettige samenwerking en de mogelijkheden die mij zijn geboden tijdens mijn dienstverband bij ${employerAtSentenceEnd}

Met vriendelijke groet,

${employeeName}`.trim();
}
