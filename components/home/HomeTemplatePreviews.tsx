"use client";

import { useEffect, useRef, useState } from "react";
import { getTemplateComponent, getTheme } from "@/app/editor/templates";
import { LinkTextProvider } from "@/app/editor/templates/link-utils";
import { CVData, sampleCV } from "@/lib/cv";

const HERO_SCALE = 220 / 794;
const heroSlides = [
  { templateId: "professional", themeId: "charcoal", label: "Professioneel" },
  { templateId: "modern", themeId: "ocean-blue", label: "Modern" },
  { templateId: "elegant", themeId: "elegant-navy", label: "Elegant" },
  { templateId: "dynamic", themeId: "purple-royal", label: "Dynamisch" },
  { templateId: "remarkable", themeId: "rose-gold", label: "Opmerkelijk" },
  { templateId: "formal", themeId: "elegant-navy", label: "Formeel" },
  { templateId: "sepia", themeId: "warm-earth", label: "Sepia" },
  { templateId: "jobboss", themeId: "modern-teal", label: "Sollicitatiebaas" },
] as const;

const previewData: CVData = {
  ...sampleCV,
  personal: {
    ...sampleCV.personal,
    name: "Anouk de Vries",
    title: "Marketing & Communicatie Specialist",
    email: "anouk.devries@gmail.com",
    phone: "+31 6 12345678",
    location: "Amsterdam",
    linkedIn: "linkedin.com/in/anouk-devries",
    website: "anoukdevries.nl",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    summary:
      "Resultaatgerichte marketing professional met 6+ jaar ervaring in contentstrategie, campagne-optimalisatie en merkpositionering. Sterk in data-gedreven keuzes, stakeholdermanagement en het vertalen van doelstellingen naar meetbare groei.",
  },
  experience: [
    {
      role: "Senior Marketing Specialist",
      company: "BrightWave Digital",
      location: "Amsterdam",
      start: "jan 2022",
      end: "heden",
      description: "",
      highlights: [
        "Verhoogde organisch verkeer met 48% via SEO contentclusters.",
        "Leidde omnichannel campagnes met gemiddeld +32% leadgroei.",
      ],
    },
    {
      role: "Content Marketeer",
      company: "ScaleUp Partners",
      location: "Utrecht",
      start: "mrt 2019",
      end: "dec 2021",
      description: "",
      highlights: [
        "Ontwikkelde employer-branding strategie voor internationale hiring.",
        "Verbeterde nieuwsbrief-CTR van 3.8% naar 7.1% binnen 5 maanden.",
      ],
    },
  ],
  education: [
    {
      degree: "BSc Communicatiewetenschap",
      school: "Universiteit van Amsterdam",
      location: "Amsterdam",
      start: "2014",
      end: "2018",
      description: "",
    },
  ],
  skills: [
    { name: "SEO & Contentstrategie", level: 5 },
    { name: "Campagne Management", level: 5 },
    { name: "GA4 & Looker Studio", level: 4 },
    { name: "Copywriting", level: 4 },
    { name: "Stakeholdermanagement", level: 4 },
  ],
  languages: [
    { name: "Nederlands", level: "Moedertaal" },
    { name: "Engels", level: "Vloeiend" },
    { name: "Duits", level: "Goed" },
  ],
  interests: ["Hardlopen", "Design", "Reizen", "Podcasting"],
  awards: ["Best Campaign Award (2023)"],
};

export function HomeTemplatePreview({
  templateId,
  colorThemeId,
}: {
  templateId: string;
  colorThemeId: string;
}) {
  const TemplateComponent = getTemplateComponent(templateId);
  const theme = getTheme(templateId, colorThemeId);

  return (
    <div className="relative h-full overflow-hidden border-2 border-black bg-white">
      <div
        className="pointer-events-none origin-top-left"
        style={{ transform: "scale(0.24)", width: `${100 / 0.24}%` }}
      >
        <LinkTextProvider disableAnchors>
          <TemplateComponent data={previewData} theme={theme} />
        </LinkTextProvider>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/95 to-transparent" />
    </div>
  );
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((slide) => (slide + 1) % heroSlides.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden flex-shrink-0 flex-col items-center gap-5 md:flex">
      <div className="relative h-[312px] w-[220px]">
        <div
          className="absolute inset-0 border-4 border-black bg-blue-300"
          style={{ transform: "rotate(6deg) translate(10px, 4px)", zIndex: 0 }}
        />
        <div
          className="absolute inset-0 border-4 border-black bg-yellow-300"
          style={{ transform: "rotate(-4deg) translate(-8px, -2px)", zIndex: 1 }}
        />
        <div
          className="absolute inset-0 cursor-pointer overflow-hidden border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          style={{ zIndex: 2 }}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          {heroSlides.map((slide, index) => {
            const TemplateComponent = getTemplateComponent(slide.templateId);
            const theme = getTheme(slide.templateId, slide.themeId);
            return (
              <div
                key={slide.templateId}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{
                  opacity: index === current ? 1 : 0,
                  zIndex: index === current ? 1 : 0,
                }}
              >
                <div
                  className="pointer-events-none origin-top-left"
                  style={{ transform: `scale(${HERO_SCALE})`, width: `${100 / HERO_SCALE}%` }}
                >
                  <LinkTextProvider disableAnchors>
                    <TemplateComponent data={previewData} theme={theme} />
                  </LinkTextProvider>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-2 border-black bg-white px-3 py-1 text-[11px] font-black uppercase tracking-widest text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        {heroSlides[current].label}
      </div>
      <div className="flex items-center gap-1.5">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.templateId}
            type="button"
            aria-label={`Toon template ${slide.label}`}
            onClick={() => setCurrent(index)}
            className={`h-2 border-2 border-black transition-all duration-300 ${
              index === current ? "w-5 bg-black" : "w-2 bg-gray-300 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
