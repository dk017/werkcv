"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";

type GeneratedImage = {
  id: string;
  url?: string;
  kind?: "generated" | "refined";
};

type ProfilePhotoProject = {
  id: string;
  status: "pending" | "paid" | string;
  generationCount: number;
  refinementCount: number;
  refinementsRemaining: number;
  maxRefinements: number;
  images?: GeneratedImage[];
};

type StyleOption = {
  id: string;
  label: string;
  description: string;
};

const styleOptions: StyleOption[] = [
  {
    id: "executive",
    label: "Corporate executive",
    description: "LinkedIn, executive bio, formele businesspresentatie.",
  },
  {
    id: "creatief",
    label: "Creative professional",
    description: "Portfolio, design, marketing, agency en creatieve profielen.",
  },
  {
    id: "tech",
    label: "Tech entrepreneur",
    description: "Startups, product, software, founders en moderne businessrollen.",
  },
  {
    id: "zorg",
    label: "Healthcare",
    description: "Zorg, welzijn, medische praktijken en hulpverlenende rollen.",
  },
  {
    id: "consultant",
    label: "Academic / consultant",
    description: "Consulting, onderwijs, universiteit en thought leadership.",
  },
  {
    id: "client",
    label: "Sales / client-facing",
    description: "Sales, klantenservice, HR, accountmanagement en servicefuncties.",
  },
  {
    id: "linkedin",
    label: "Clean LinkedIn",
    description: "Algemeen professioneel, veilig voor cv en LinkedIn.",
  },
];

const maxFileSize = 8 * 1024 * 1024;
const maxFiles = 4;
const maxTotalSize = 24 * 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const refinementSuggestions = [
  "lichtere glimlach",
  "minder formeel",
  "meer casual kleding",
  "lichtere achtergrond",
  "donkere achtergrond",
  "meer LinkedIn-stijl",
  "meer cv-stijl",
];

function formatFileSize(size: number): string {
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function buildImageUrl(projectId: string, imageId: string): string {
  return `/api/profile-photo/images/${encodeURIComponent(imageId)}?projectId=${encodeURIComponent(projectId)}`;
}

function normalizeGeneratedImages(images: GeneratedImage[], projectId?: string): GeneratedImage[] {
  return images.map((image) => {
    if (
      image.url &&
      (image.url.startsWith("/") ||
        image.url.startsWith("http://") ||
        image.url.startsWith("https://") ||
        image.url.startsWith("data:") ||
        image.url.startsWith("blob:"))
    ) {
      return image;
    }

    return {
      ...image,
      url: projectId ? buildImageUrl(projectId, image.id) : image.url,
    };
  });
}

export default function ProfilePhotoGenerator() {
  const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "anonymous">("loading");
  const [project, setProject] = useState<ProfilePhotoProject | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [style, setStyle] = useState("executive");
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [refinement, setRefinement] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isCheckoutRedirecting, setIsCheckoutRedirecting] = useState(false);

  const selectedStyle = useMemo(
    () => styleOptions.find((option) => option.id === style) ?? styleOptions[0],
    [style]
  );
  const selectedImage = useMemo(
    () => images.find((image) => image.id === selectedImageId) ?? images[0] ?? null,
    [images, selectedImageId]
  );
  const selectedImageIndex = selectedImage ? images.findIndex((image) => image.id === selectedImage.id) : -1;

  useEffect(() => {
    track("profile_photo_tool_view", { page_path: "/profielfoto-cv-maken" });
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadProject() {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get("project");
      const statusUrl = projectId ? `/api/profile-photo?projectId=${encodeURIComponent(projectId)}` : "/api/profile-photo";

      try {
        const response = await fetch(statusUrl);
        if (response.status === 401) {
          if (!isMounted) return;
          setAuthStatus("anonymous");
          return;
        }

        const payload = (await response.json()) as {
          authenticated?: boolean;
          project?: ProfilePhotoProject | null;
        };

        if (!isMounted) return;
        setAuthStatus(payload.authenticated ? "authenticated" : "anonymous");
        setProject(payload.project ?? null);
        const savedImages = normalizeGeneratedImages(payload.project?.images ?? [], payload.project?.id);
        setImages(savedImages);
        setSelectedImageId(savedImages[0]?.id ?? null);
      } catch {
        if (!isMounted) return;
        setAuthStatus("anonymous");
      }
    }

    loadProject();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (files.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    setImages([]);
    setSelectedImageId(null);
    setRefinement("");
    setError(null);

    if (selectedFiles.length === 0) {
      setFiles([]);
      return;
    }

    if (selectedFiles.length > maxFiles) {
      setFiles([]);
      setError(`Upload maximaal ${maxFiles} foto's.`);
      return;
    }

    const invalidFile = selectedFiles.find((nextFile) => !allowedTypes.includes(nextFile.type));

    if (invalidFile) {
      setFiles([]);
      setError("Gebruik alleen JPG, PNG of WebP-afbeeldingen.");
      return;
    }

    const oversizedFile = selectedFiles.find((nextFile) => nextFile.size > maxFileSize);

    if (oversizedFile) {
      setFiles([]);
      setError("Eén van je foto's is te groot. Upload maximaal 8 MB per foto.");
      return;
    }

    const totalSize = selectedFiles.reduce((sum, nextFile) => sum + nextFile.size, 0);

    if (totalSize > maxTotalSize) {
      setFiles([]);
      setError("Je foto's zijn samen te groot. Upload maximaal 24 MB totaal.");
      return;
    }

    setFiles(selectedFiles);
  }

  async function generatePhoto() {
    if ((project?.generationCount ?? 0) >= 1) {
      setError("Je eerste set profielfoto's is al gemaakt. Gebruik verfijnen voor kleine aanpassingen.");
      return;
    }

    if (files.length === 0) {
      setError("Upload eerst minimaal één foto van jezelf.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setImages([]);
    track("profile_photo_submit", {
      page_path: "/profielfoto-cv-maken",
      style,
    });

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("photos", file);
      });
      if (project?.id) {
        formData.append("projectId", project.id);
      }
      formData.append("style", style);

      const response = await fetch("/api/profile-photo", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        images?: GeneratedImage[];
        project?: ProfilePhotoProject;
        error?: string;
      };

      if (!response.ok || !payload.images?.length) {
        throw new Error(payload.error ?? "De profielfoto kon niet worden gemaakt.");
      }

      const responseProjectId = payload.project?.id ?? project?.id;
      const normalizedImages = normalizeGeneratedImages(payload.images, responseProjectId);
      setImages(normalizedImages);
      setSelectedImageId(normalizedImages[0]?.id ?? null);
      if (payload.project) {
        setProject((currentProject) => currentProject ? { ...currentProject, ...payload.project, images: normalizedImages } : payload.project ?? null);
      }
      track("profile_photo_generated", {
        page_path: "/profielfoto-cv-maken",
        style,
        images_generated: normalizedImages.length,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Er ging iets mis.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function refinePhoto() {
    if (!project) {
      setError("Maak eerst je eerste set profielfoto's.");
      return;
    }

    if (project.refinementsRemaining <= 0) {
      setError("Je hebt de 2 inbegrepen verfijningen gebruikt.");
      return;
    }

    if (!selectedImage?.url) {
      setError("Kies eerst één gegenereerde foto om aan te passen.");
      return;
    }

    if (refinement.trim().length < 3) {
      setError("Beschrijf kort wat je wilt aanpassen.");
      return;
    }

    setIsRefining(true);
    setError(null);
    track("profile_photo_refine_submit", {
      page_path: "/profielfoto-cv-maken",
      style,
      refinement_length: refinement.trim().length,
    });

    try {
      const response = await fetch(selectedImage.url);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("mode", "refine");
      formData.append("projectId", project.id);
      formData.append("style", style);
      formData.append("refinement", refinement.trim());
      formData.append("photos", new File([blob], "selected-profile-photo.jpg", { type: "image/jpeg" }));

      const apiResponse = await fetch("/api/profile-photo", {
        method: "POST",
        body: formData,
      });

      const payload = (await apiResponse.json()) as {
        images?: GeneratedImage[];
        project?: ProfilePhotoProject;
        error?: string;
      };

      if (!apiResponse.ok || !payload.images?.length) {
        throw new Error(payload.error ?? "De aangepaste profielfoto kon niet worden gemaakt.");
      }

      const normalizedImages = normalizeGeneratedImages(payload.images, payload.project?.id ?? project.id);
      setImages((currentImages) => [...normalizedImages, ...currentImages]);
      setSelectedImageId(normalizedImages[0]?.id ?? selectedImage.id);
      if (payload.project) {
        setProject((currentProject) => currentProject ? { ...currentProject, ...payload.project, images: [...normalizedImages, ...(currentProject.images ?? [])] } : payload.project ?? null);
      }
      track("profile_photo_refined", {
        page_path: "/profielfoto-cv-maken",
        style,
        images_generated: normalizedImages.length,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Er ging iets mis.");
    } finally {
      setIsRefining(false);
    }
  }

  function trackDownload(imageId: string) {
    track("profile_photo_download", {
      page_path: "/profielfoto-cv-maken",
      image_id: imageId,
      style,
    });
  }

  function trackEditorClick(location: string) {
    track("profile_photo_cta_editor_click", {
      page_path: "/profielfoto-cv-maken",
      cta_location: location,
      cta_text: "Gebruik in mijn cv",
    });
  }

  function getDownloadUrl(image: GeneratedImage): string {
    if (!image.url) return "#";
    return image.url.includes("?") ? `${image.url}&download=1` : `${image.url}?download=1`;
  }

  function selectImage(image: GeneratedImage, index: number) {
    setSelectedImageId(image.id);
    track("profile_photo_variant_selected", {
      page_path: "/profielfoto-cv-maken",
      image_id: image.id,
      variant_position: index + 1,
      style,
    });
  }

  async function startCheckout() {
    if (!project?.id || images.length === 0) {
      setError("Maak eerst je profielfoto-varianten. Je betaalt pas bij downloaden.");
      return;
    }

    setIsCheckoutRedirecting(true);
    setError(null);
    track("profile_photo_checkout_click", {
      page_path: "/profielfoto-cv-maken",
      amount_cents: 999,
      currency: "EUR",
    });

    try {
      const response = await fetch("/api/profile-photo/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });
      const payload = (await response.json()) as { url?: string; error?: string };

      if (response.status === 401) {
        window.location.href = `/login?next=${encodeURIComponent("/profielfoto-cv-maken#profielfoto-tool")}`;
        return;
      }

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Checkout kon niet worden gestart.");
      }

      window.location.href = payload.url;
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Checkout kon niet worden gestart.");
      setIsCheckoutRedirecting(false);
    }
  }

  return (
    <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:p-6">
      {authStatus === "loading" && (
        <div className="rounded-3xl border-2 border-slate-200 bg-[#FFFEF9] p-6 text-sm font-black text-slate-700">
          Accountstatus laden...
        </div>
      )}

      {authStatus === "anonymous" && (
        <div className="rounded-3xl border-2 border-black bg-[#FFFEF9] p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Account nodig</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Log in om je profielfoto te maken</h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            Net als je cv bewaren we je betaalde output in je WerkCV-account, zodat je je profielfoto later opnieuw
            kunt downloaden. Uploads worden alleen gebruikt voor de generatie.
          </p>
          <Link
            href={`/login?next=${encodeURIComponent("/profielfoto-cv-maken#profielfoto-tool")}`}
            className="mt-5 inline-flex border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Log in en start
          </Link>
        </div>
      )}

      {authStatus === "authenticated" && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-black bg-[#E9FFFC] p-4">
            <p className="text-sm font-black text-slate-950">
              {project?.status === "paid" ? "Je AI-profielfoto add-on is actief" : "Maak eerst gratis je voorbeeldvarianten"}
            </p>
            <p className="mt-1 text-xs font-bold leading-relaxed text-slate-700">
              Log in, maak 4 voorbeeldvarianten en verfijn maximaal 2 keer. Je betaalt pas €9,99 als je wilt downloaden.
              {project && ` Nog ${project.refinementsRemaining} van ${project.maxRefinements} verfijningen over.`}
            </p>
          </div>

          {(project?.generationCount ?? 0) === 0 && (
            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-[#FFFEF9] p-5">
                <label className="block">
                  <span className="text-sm font-black text-slate-900">Upload je bestaande foto</span>
                  <span className="mt-1 block text-sm font-medium leading-relaxed text-slate-600">
                    Upload 1 tot 4 duidelijke foto&apos;s. De eerste foto is de hoofdreferentie; extra foto&apos;s helpen
                    met herkenbaarheid. Alleen JPG, PNG of WebP.
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleFileChange}
                    className="mt-4 block w-full text-sm font-bold text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
                  />
                </label>

                {files.length > 0 && (
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                      Gekozen foto&apos;s ({files.length}/{maxFiles})
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {files.map((file, index) => (
                        <div key={`${file.name}-${file.lastModified}`} className="flex items-center gap-3">
                          {previewUrls[index] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={previewUrls[index]}
                              alt={`Preview van geüploade profielfoto ${index + 1}`}
                              className="h-20 w-20 rounded-2xl object-cover"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-slate-900">
                              {index === 0 ? "Hoofdfoto: " : `Referentie ${index + 1}: `}
                              {file.name}
                            </p>
                            <p className="text-xs font-medium text-slate-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs font-medium leading-relaxed text-slate-500">
                  Privacy: upload alleen foto&apos;s die je wilt gebruiken voor je sollicitatie. WerkCV vraagt niet om
                  LinkedIn-login en bewaart alleen de gegenereerde output in je account.
                </p>
              </div>

              <div>
                <p className="text-sm font-black text-slate-900">Kies uitstraling</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {styleOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setStyle(option.id)}
                      className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                        style === option.id
                          ? "border-black bg-[#4ECDC4] text-black"
                          : "border-slate-200 bg-white text-slate-700 hover:border-black"
                      }`}
                    >
                      <span className="block text-sm font-black">{option.label}</span>
                      <span className="mt-1 block text-xs font-medium leading-relaxed">{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          {(project?.generationCount ?? 0) === 0 ? (
            <div>
              <button
                type="button"
                onClick={generatePhoto}
                disabled={isGenerating}
                className="w-full border-4 border-black bg-[#FFD166] px-5 py-4 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isGenerating ? "Profielfoto's worden gemaakt..." : "Maak 4 professionele varianten"}
              </button>
              <p className="mt-3 text-xs font-medium leading-relaxed text-slate-500">
                Voorbeelden maken kan na login. Downloaden kost éénmalig €9,99. Geen abonnement.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
              <p className="text-sm font-black text-slate-900">Je eerste set is klaar</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">
                Kies hieronder je favoriete variant. Daarna kun je die foto verfijnen, gebruiken in je cv of
                downloaden na de eenmalige betaling.
              </p>
            </div>
          )}

          <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Output</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">Professionele varianten</h2>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Kies één favoriet. Daarna kun je die ene foto verfijnen, downloaden of gebruiken bij je cv.
                </p>
              </div>
              <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-600">
                {selectedStyle.label}
              </span>
            </div>

            {images.length === 0 ? (
              <div className="mt-6 flex min-h-[260px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
                <div>
                  <p className="text-lg font-black text-slate-900">Nog geen varianten</p>
                  <p className="mt-2 max-w-sm text-sm font-medium leading-relaxed text-slate-600">
                    Upload een duidelijke foto, kies een uitstraling en maak vier varianten die je kunt testen voor cv
                    en LinkedIn.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {images.map((image, index) => {
                    const isSelected = selectedImage?.id === image.id;

                    return (
                      <button
                        key={`${image.id}-${index}`}
                        type="button"
                        onClick={() => selectImage(image, index)}
                        className={`group rounded-3xl border-2 bg-white p-3 text-left transition-transform hover:-translate-y-0.5 ${
                          isSelected ? "border-[#4ECDC4] ring-4 ring-[#4ECDC4]/30" : "border-slate-200 hover:border-black"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.url ?? ""}
                          alt={`Gegenereerde profielfoto variant ${index + 1}`}
                          className="aspect-square w-full rounded-2xl object-cover"
                        />
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-slate-900">Variant {index + 1}</span>
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-black ${
                              isSelected ? "bg-[#4ECDC4] text-black" : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {isSelected ? "Gekozen" : "Kies"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedImage && (
                  <div className="mt-6 grid gap-5 rounded-3xl border-2 border-black bg-white p-5 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        Geselecteerde foto
                      </p>
                      <h3 className="mt-2 text-xl font-black text-slate-900">
                        Variant {selectedImageIndex + 1} gebruiken
                      </h3>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                        Deze keuze gebruik je voor downloaden en verfijnen. Je kunt altijd eerst een andere variant
                        selecteren voordat je betaalt.
                      </p>
                      <div className="mt-4 flex flex-col gap-3">
                        {project?.status === "paid" ? (
                          <a
                            href={getDownloadUrl(selectedImage)}
                            download={`werkcv-profielfoto-${selectedImageIndex + 1}.jpg`}
                            onClick={() => trackDownload(selectedImage.id)}
                            className="inline-flex justify-center rounded-full bg-black px-5 py-3 text-sm font-black text-white"
                          >
                            Download geselecteerde foto
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={startCheckout}
                            disabled={isCheckoutRedirecting}
                            className="inline-flex justify-center rounded-full bg-black px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isCheckoutRedirecting ? "Checkout openen..." : "Betaal €9,99 en download"}
                          </button>
                        )}
                        <Link
                          href="/editor"
                          onClick={() => trackEditorClick("selected_photo_action")}
                          className="inline-flex justify-center rounded-full border-2 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black"
                        >
                          Open cv-editor
                        </Link>
                      </div>
                    </div>

                    <div className="rounded-3xl border-2 border-slate-200 bg-[#FFFEF9] p-5">
                      <h3 className="text-lg font-black text-slate-900">Wil je deze foto aanpassen?</h3>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                        Beschrijf alleen wat anders moet. Je hebt nog {project?.refinementsRemaining ?? 2} verfijningen over.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {refinementSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => setRefinement(suggestion)}
                            className="rounded-full border-2 border-black bg-white px-3 py-2 text-xs font-black text-black hover:bg-[#E9FFFC]"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                      <label className="mt-4 block">
                        <span className="text-sm font-black text-slate-900">Aanpassing</span>
                        <textarea
                          value={refinement}
                          onChange={(event) => setRefinement(event.target.value.slice(0, 300))}
                          rows={3}
                          placeholder="Bijvoorbeeld: casual kleding, lichtere achtergrond, iets vriendelijker, meer LinkedIn-stijl..."
                          className="mt-2 w-full rounded-2xl border-2 border-slate-300 bg-white p-3 text-sm font-medium text-slate-900 outline-none focus:border-black"
                        />
                      </label>
                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs font-medium text-slate-500">{refinement.length}/300 tekens</p>
                        <button
                          type="button"
                          onClick={refinePhoto}
                          disabled={isRefining || !selectedImage || (project?.refinementsRemaining ?? 0) <= 0}
                          className="inline-flex items-center justify-center border-2 border-black bg-[#FFD166] px-4 py-3 text-sm font-black text-black disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isRefining ? "Aangepaste variant maken..." : "Maak aangepaste variant"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 rounded-3xl border-2 border-black bg-[#FFFEF9] p-5">
                  <h3 className="text-lg font-black text-slate-900">Maak er direct een complete cv van</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                    Gebruik je beste profielfoto samen met een nette Nederlandse cv-template. Gratis bouwen,
                    éénmalig €4,99 bij PDF-download, geen abonnement.
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/editor"
                      onClick={() => trackEditorClick("output_final_cta")}
                      className="inline-flex flex-1 items-center justify-center border-2 border-black bg-[#4ECDC4] px-4 py-3 text-sm font-black text-black"
                    >
                      Maak mijn cv
                    </Link>
                    <Link
                      href="/templates"
                      className="inline-flex flex-1 items-center justify-center border-2 border-black bg-white px-4 py-3 text-sm font-black text-black"
                    >
                      Bekijk templates
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
