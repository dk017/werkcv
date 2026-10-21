import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import NavUserMenu from "@/components/NavUserMenu";
import ProfilePhotoLanding, { type ProfilePhotoFaq } from "@/components/profile-photo/ProfilePhotoLanding";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { profilePhotoPrice } from "@/lib/site-content";
import ProfilePhotoGenerator from "./ProfilePhotoGenerator";
import ProfilePhotoSamples, { type ProfilePhotoSample } from "./ProfilePhotoSamples";

const faqItems: ProfilePhotoFaq[] = [
  {
    question: "Wat kost een AI-profielfoto bij WerkCV?",
    answer: `Je ziet eerst gratis 4 voorbeelden. Wil je ze gebruiken, dan betaal je eenmalig ${profilePhotoPrice.display}. Daarin zitten ook 2 verfijningen. Er is geen abonnement.`,
  },
  {
    question: "Hoe lang duurt het?",
    answer: "Meestal heb je je 4 voorbeelden binnen een minuut. Een verfijning duurt ongeveer even lang.",
  },
  {
    question: "Welke foto kan ik het beste uploaden?",
    answer: "Een recente selfie of portret waarop je gezicht duidelijk en recht te zien is, zonder zonnebril of pet, met redelijk licht. Een groepsfoto of erg donkere foto werkt slechter. Je mag 1 tot 4 foto's uploaden.",
  },
  {
    question: "Lijkt de foto echt op mij?",
    answer: "De tool houdt je gezicht, huidskleur, haar, bril en kenmerken bewust hetzelfde en verandert vooral licht, achtergrond en kleding. Herken je jezelf niet goed? Gebruik dan een verfijning, of gebruik de foto niet: je betaalt alleen als je er een wilt downloaden.",
  },
  {
    question: "Waarom 4 foto's en niet 40?",
    answer: "Je hebt één goede foto nodig. Je ziet je 4 voorbeelden voordat je betaalt en kunt met 2 verfijningen nog iets aanpassen. Zo betaal je alleen voor een foto die je echt gebruikt.",
  },
  {
    question: "Kan ik de foto direct in mijn cv zetten?",
    answer: "Ja. Na betaling zet je je favoriete foto met één klik in je WerkCV-cv, of je downloadt hem voor LinkedIn en andere profielen.",
  },
  {
    question: "Kan ik deze foto als pasfoto gebruiken?",
    answer: "Nee. Een pasfoto voor paspoort, ID-kaart of rijbewijs moet onbewerkt zijn. De AI-profielfoto is bedoeld voor je cv, LinkedIn en andere professionele profielen.",
  },
  {
    question: "Wat gebeurt er met mijn foto?",
    answer: "WerkCV gebruikt je upload alleen om de foto's te maken en bewaart je oorspronkelijke foto daarna niet. De gemaakte foto's bewaren we in je account zodat je er later bij kunt. Je kunt WerkCV altijd vragen ze te verwijderen.",
  },
  {
    question: "Wordt mijn foto gebruikt om AI te trainen?",
    answer: "Nee. De foto's worden gemaakt via de OpenAI API, en die gebruikt gegevens die via de API binnenkomen standaard niet om modellen te trainen. WerkCV gebruikt je foto ook niet voor andere doeleinden.",
  },
  {
    question: "Is een foto verplicht op mijn cv in Nederland?",
    answer: "Nee. Een foto op je cv is niet verplicht. In Nederland wordt een professionele foto wel vaak gebruikt, maar volg altijd de instructies in de vacature. Vraagt de werkgever om een cv zonder foto, laat hem dan weg.",
  },
  {
    question: "Kan ik dezelfde foto gebruiken voor cv en LinkedIn?",
    answer: "Ja, dat is juist handig. Met dezelfde foto op je cv en LinkedIn ben je herkenbaar voor recruiters die beide bekijken.",
  },
  {
    question: "Mag ik de foto professioneel gebruiken?",
    answer: "Ja. Je mag je gekochte foto gebruiken voor je cv, LinkedIn, een professionele bio, bedrijfsprofiel en vergelijkbare persoonlijke professionele toepassingen. Gebruik alleen een foto die je eerlijk weergeeft.",
  },
  {
    question: "Kan WerkCV mijn LinkedIn-foto automatisch ophalen?",
    answer: "Nee. WerkCV scrapt LinkedIn niet en vraagt niet om je LinkedIn-login. Je uploadt zelf de foto die je wilt gebruiken.",
  },
  {
    question: "Vervangt dit een professionele fotograaf?",
    answer: "Niet altijd. Een fotograaf blijft de beste keuze als je volledige controle wilt over locatie, licht en kleding. Deze tool is de snelle, betaalbare route als je vandaag een nette foto nodig hebt.",
  },
];

const qualityChecks = [
  "Je gezicht is duidelijk herkenbaar en niet overdreven aangepast.",
  "De achtergrond is rustig en leidt niet af van je gezicht.",
  "De foto voelt professioneel, maar niet stijf of onnatuurlijk.",
  "De uitsnede werkt als kleine profielfoto op LinkedIn en als compacte cv-foto.",
  "De kleding en uitstraling passen bij de sector waarin je solliciteert.",
];

const profilePhotoSamples: ProfilePhotoSample[] = [
  {
    src: "/profile-photo-samples/dutch-consultant-man.jpg",
    alt: "AI-gegenereerde voorbeeldprofielfoto van een Nederlandse consultant",
    role: "Consultant",
    style: "Corporate executive",
    note: "Een veilige zakelijke uitstraling voor consultants, finance, sales en kantoorfuncties waar vertrouwen belangrijk is.",
  },
  {
    src: "/profile-photo-samples/dutch-tech-professional-man.jpg",
    alt: "AI-gegenereerde voorbeeldprofielfoto van een Nederlandse tech professional",
    role: "Tech professional",
    style: "Clean LinkedIn",
    note: "Professioneel zonder pak. Geschikt voor software, product, startups en moderne bedrijfsomgevingen.",
  },
  {
    src: "/profile-photo-samples/dutch-hr-manager-woman.jpg",
    alt: "AI-gegenereerde voorbeeldprofielfoto van een Nederlandse HR manager",
    role: "HR manager",
    style: "Zakelijk warm",
    note: "Warm en betrouwbaar, zonder te informeel te worden. Past goed bij HR, coaching en klantgerichte rollen.",
  },
  {
    src: "/profile-photo-samples/dutch-operations-manager-man.jpg",
    alt: "AI-gegenereerde voorbeeldprofielfoto van een Nederlandse operations manager",
    role: "Operations manager",
    style: "Senior profiel",
    note: "Rustige senior uitstraling voor management, operations, logistiek, projectleiding en zakelijke profielen.",
  },
  {
    src: "/profile-photo-samples/dutch-starter-woman.jpg",
    alt: "AI-gegenereerde voorbeeldprofielfoto van een Nederlandse starter",
    role: "Starter",
    style: "Smart casual",
    note: "Toegankelijk en netjes voor starters, stages en eerste banen waar een te formele foto juist zwaar voelt.",
  },
  {
    src: "/profile-photo-samples/dutch-healthcare-professional-woman.jpg",
    alt: "AI-gegenereerde voorbeeldprofielfoto van een Nederlandse zorgprofessional",
    role: "Zorgprofessional",
    style: "Vertrouwd",
    note: "Een zachte, professionele stijl voor zorg, welzijn, onderwijs en functies met veel persoonlijk contact.",
  },
  {
    src: "/profile-photo-samples/dutch-university-student-man.jpg",
    alt: "AI-gegenereerde voorbeeldprofielfoto van een Nederlandse universiteitsstudent",
    role: "Universiteitsstudent",
    style: "Stageproof",
    note: "Jong en serieus genoeg voor LinkedIn, stages, bijbanen en traineeprogramma's zonder corporate overkill.",
  },
  {
    src: "/profile-photo-samples/dutch-mbo-student-woman.jpg",
    alt: "AI-gegenereerde voorbeeldprofielfoto van een Nederlandse mbo-student",
    role: "MBO-student",
    style: "Eerste baan",
    note: "Vriendelijk en verzorgd voor leerwerkplekken, starterfuncties en praktische opleidingen.",
  },
  {
    src: "/profile-photo-samples/international-student-netherlands-woman.jpg",
    alt: "AI-gegenereerde voorbeeldprofielfoto van een internationale student in Nederland",
    role: "International student",
    style: "Netherlands-ready",
    note: "Geschikt voor Engelstalige sollicitaties in Nederland, stages en expat-profielen op LinkedIn.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: `AI profielfoto voor cv en LinkedIn – eerst gratis zien | ${profilePhotoPrice.display}`,
  description: `Maak van een gewone foto of selfie een professionele profielfoto voor je cv en LinkedIn. Bekijk eerst gratis 4 voorbeelden; pas betalen als je er een gebruikt (${profilePhotoPrice.display}, geen abonnement).`,
  path: "/profielfoto-cv-maken",
  keywords: [
    "ai profielfoto",
    "ai profielfoto cv",
    "linkedin profielfoto maken",
    "linkedin foto maken",
    "zakelijke profielfoto ai",
    "profielfoto cv maken",
    "cv foto maken",
    "professionele profielfoto maken",
    "ai headshot generator nederland",
  ],
  type: "article",
});

export default function ProfielfotoCvMakenPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 sm:flex">
            <Link href="/ai-headshot-foto-tips" className="hover:text-slate-900">Fototips</Link>
            <Link href="/cv-tips/foto-op-je-cv" className="hover:text-slate-900">Foto op je cv</Link>
            <Link href="/" className="hover:text-slate-900">CV maken</Link>
            <Link href="/tools" className="hover:text-slate-900">Tools</Link>
            <NavUserMenu />
          </nav>
        </div>
      </header>

      <ProfilePhotoLanding
        locale="nl"
        tool={<ProfilePhotoGenerator />}
        styleGallery={<ProfilePhotoSamples samples={profilePhotoSamples.slice(0, 6)} mode="gallery" />}
        faq={faqItems}
        seoContent={
          <section className="mx-auto max-w-6xl px-6 pt-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-black text-slate-950">Wanneer zet je een foto op je cv?</h2>
                <div className="mt-4 space-y-4 text-sm font-medium leading-relaxed text-slate-700">
                  <p>
                    In Nederland is een foto op je cv niet verplicht. Veel sollicitanten kiezen wel voor een professionele
                    foto, vooral bij functies met persoonlijk contact: sales, zorg, onderwijs, hospitality, HR, klantenservice
                    en veel kantoorfuncties.
                  </p>
                  <p>
                    Laat een foto weg als de vacature vraagt om anoniem solliciteren of om een cv zonder foto. Solliciteer je
                    in de VS, het VK of Canada, dan wordt een foto meestal afgeraden.
                  </p>
                  <p>
                    Twijfel je? Lees de gids over{" "}
                    <Link href="/cv-tips/foto-op-je-cv" className="font-black underline decoration-2 underline-offset-4">
                      een foto op je cv in Nederland
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-black text-slate-950">Wat maakt een goede cv-profielfoto?</h2>
                <ul className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
                  {qualityChecks.map((check) => (
                    <li key={check} className="flex gap-3">
                      <span className="mt-1 h-5 w-5 flex-none rounded-full bg-[#4ECDC4] text-center text-xs font-black text-black">✓</span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  Meer tips over je bronfoto in de{" "}
                  <Link href="/ai-headshot-foto-tips" className="font-black underline decoration-2 underline-offset-4">fotochecklist</Link>.
                  Benieuwd hoe je huidige foto scoort? Doe de{" "}
                  <Link href="/linkedin-foto-check" className="font-black underline decoration-2 underline-offset-4">gratis LinkedIn-foto check</Link>
                  , of lees{" "}
                  <Link href="/linkedin-foto-maken" className="font-black underline decoration-2 underline-offset-4">hoe je een goede LinkedIn-foto maakt</Link>.
                </p>
              </div>
            </div>
          </section>
        }
      />

      <Footer />
    </div>
  );
}
