"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { profilePhotoPrice } from "@/lib/site-content";

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

type ProfilePhotoStatusResponse = {
  authenticated?: boolean;
  bundleIncluded?: boolean;
  project?: ProfilePhotoProject | null;
};

type StyleOption = {
  id: string;
  label: string;
  descriptionNl: string;
  descriptionEn: string;
};

const styleOptions: StyleOption[] = [
  {
    id: "executive",
    label: "Corporate executive",
    descriptionNl: "LinkedIn, executive bio, formele businesspresentatie.",
    descriptionEn: "LinkedIn, executive bio and formal business presentation.",
  },
  {
    id: "creatief",
    label: "Creative professional",
    descriptionNl: "Portfolio, design, marketing, agency en creatieve profielen.",
    descriptionEn: "Portfolio, design, marketing, agency and creative profiles.",
  },
  {
    id: "tech",
    label: "Tech entrepreneur",
    descriptionNl: "Startups, product, software, founders en moderne businessrollen.",
    descriptionEn: "Startups, product, software, founders and modern business roles.",
  },
  {
    id: "zorg",
    label: "Healthcare",
    descriptionNl: "Zorg, welzijn, medische praktijken en hulpverlenende rollen.",
    descriptionEn: "Healthcare, wellbeing, medical practices and helping roles.",
  },
  {
    id: "consultant",
    label: "Academic / consultant",
    descriptionNl: "Consulting, onderwijs, universiteit en thought leadership.",
    descriptionEn: "Consulting, education, university and thought leadership.",
  },
  {
    id: "client",
    label: "Sales / client-facing",
    descriptionNl: "Sales, klantenservice, HR, accountmanagement en servicefuncties.",
    descriptionEn: "Sales, customer support, HR, account management and service roles.",
  },
  {
    id: "linkedin",
    label: "Clean LinkedIn",
    descriptionNl: "Algemeen professioneel, veilig voor cv en LinkedIn.",
    descriptionEn: "Broadly professional, safe for CV and LinkedIn.",
  },
];

const maxFileSize = 8 * 1024 * 1024;
const maxFiles = 4;
const maxTotalSize = 24 * 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const refinementSuggestions = [
  { nl: "lichtere glimlach", en: "softer smile" },
  { nl: "minder formeel", en: "less formal" },
  { nl: "meer casual kleding", en: "more casual clothing" },
  { nl: "lichtere achtergrond", en: "lighter background" },
  { nl: "donkere achtergrond", en: "darker background" },
  { nl: "meer LinkedIn-stijl", en: "more LinkedIn style" },
  { nl: "meer cv-stijl", en: "more CV style" },
];

const demoSamples = [
  {
    src: "/profile-photo-samples/dutch-consultant-man.jpg",
    alt: "Voorbeeld van een AI-profielfoto voor een consultant",
    label: "Consultant",
  },
  {
    src: "/profile-photo-samples/dutch-hr-manager-woman.jpg",
    alt: "Voorbeeld van een AI-profielfoto voor een HR manager",
    label: "HR",
  },
  {
    src: "/profile-photo-samples/dutch-starter-woman.jpg",
    alt: "Voorbeeld van een AI-profielfoto voor een starter",
    label: "Starter",
  },
  {
    src: "/profile-photo-samples/dutch-healthcare-professional-woman.jpg",
    alt: "Voorbeeld van een AI-profielfoto voor een zorgprofessional",
    label: "Zorg",
  },
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

function getStatusCopy(
  isPaid: boolean,
  hasBundle: boolean,
  uiLanguage: "nl" | "en"
): { title: string; description: string } {
  const tr = (dutch: string, english: string) => (uiLanguage === "en" ? english : dutch);

  if (hasBundle) {
    return {
      title: isPaid
        ? tr("Je profielfoto zit in je bundle", "Your profile photo is included in your bundle")
        : tr("Je CV + profielfoto-bundle is actief", "Your CV + profile photo bundle is active"),
      description: tr(
        "Upload je foto en maak 4 varianten. Downloaden is al inbegrepen in je bundle, dus je betaalt niet opnieuw.",
        "Upload your photo and create 4 variants. Download is already included in your bundle, so you do not pay again."
      ),
    };
  }

  if (isPaid) {
    return {
      title: tr("Je AI-profielfoto add-on is actief", "Your AI profile photo add-on is active"),
      description: tr(
        "Je kunt je gekozen profielfoto opnieuw downloaden zonder opnieuw te betalen.",
        "You can download your chosen profile photo again without paying again."
      ),
    };
  }

  return {
    title: tr("Maak eerst gratis je voorbeeldvarianten", "Create your preview variants first"),
    description: tr(
      `Log in, maak 4 voorbeeldvarianten en verfijn maximaal 2 keer. Je betaalt pas ${profilePhotoPrice.display} als je wilt downloaden.`,
      `Log in, create 4 preview variants and refine up to 2 times. You only pay ${profilePhotoPrice.display} when you want to download.`
    ),
  };
}

export default function ProfilePhotoGenerator({ uiLanguage = "nl" }: { uiLanguage?: "nl" | "en" }) {
  const tr = (dutch: string, english: string) => (uiLanguage === "en" ? english : dutch);
  const pagePath = uiLanguage === "en" ? "/en/profile-photo" : "/profielfoto-cv-maken";
  const pageAnchorPath = `${pagePath}#profielfoto-tool`;
  const editorPath = uiLanguage === "en" ? "/en/editor" : "/editor";
  const templatesPath = uiLanguage === "en" ? "/en/templates" : "/templates";
  const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "anonymous">("loading");
  const [project, setProject] = useState<ProfilePhotoProject | null>(null);
  const [bundleIncluded, setBundleIncluded] = useState(false);
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
  const isProfilePhotoPaid = project?.status === "paid";
  const statusCopy = getStatusCopy(isProfilePhotoPaid, bundleIncluded, uiLanguage);

  useEffect(() => {
    track("profile_photo_tool_view", { page_path: pagePath });
  }, [pagePath]);

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

        const payload = (await response.json()) as ProfilePhotoStatusResponse;

        if (!isMounted) return;
        setAuthStatus(payload.authenticated ? "authenticated" : "anonymous");
        setBundleIncluded(Boolean(payload.bundleIncluded));
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
      setError(tr(`Upload maximaal ${maxFiles} foto's.`, `Upload up to ${maxFiles} photos.`));
      return;
    }

    const invalidFile = selectedFiles.find((nextFile) => !allowedTypes.includes(nextFile.type));

    if (invalidFile) {
      setFiles([]);
      setError(tr("Gebruik alleen JPG, PNG of WebP-afbeeldingen.", "Use JPG, PNG or WebP images only."));
      return;
    }

    const oversizedFile = selectedFiles.find((nextFile) => nextFile.size > maxFileSize);

    if (oversizedFile) {
      setFiles([]);
      setError(tr("Eén van je foto's is te groot. Upload maximaal 8 MB per foto.", "One of your photos is too large. Upload a maximum of 8 MB per photo."));
      return;
    }

    const totalSize = selectedFiles.reduce((sum, nextFile) => sum + nextFile.size, 0);

    if (totalSize > maxTotalSize) {
      setFiles([]);
      setError(tr("Je foto's zijn samen te groot. Upload maximaal 24 MB totaal.", "Your photos are too large together. Upload a maximum of 24 MB total."));
      return;
    }

    setFiles(selectedFiles);
  }

  async function generatePhoto() {
    if ((project?.generationCount ?? 0) >= 1) {
      setError(tr("Je eerste set profielfoto's is al gemaakt. Gebruik verfijnen voor kleine aanpassingen.", "Your first set of profile photos has already been created. Use refinement for small changes."));
      return;
    }

    if (files.length === 0) {
      setError(tr("Upload eerst minimaal één foto van jezelf.", "Upload at least one photo of yourself first."));
      return;
    }

    setIsGenerating(true);
    setError(null);
    setImages([]);
    track("profile_photo_submit", {
      page_path: pagePath,
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
        throw new Error(payload.error ?? tr("De profielfoto kon niet worden gemaakt.", "The profile photo could not be created."));
      }

      const responseProjectId = payload.project?.id ?? project?.id;
      const normalizedImages = normalizeGeneratedImages(payload.images, responseProjectId);
      setImages(normalizedImages);
      setSelectedImageId(normalizedImages[0]?.id ?? null);
      if (payload.project) {
        setProject((currentProject) => currentProject ? { ...currentProject, ...payload.project, images: normalizedImages } : payload.project ?? null);
      }
      track("profile_photo_generated", {
        page_path: pagePath,
        style,
        images_generated: normalizedImages.length,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : tr("Er ging iets mis.", "Something went wrong."));
    } finally {
      setIsGenerating(false);
    }
  }

  async function refinePhoto() {
    if (!project) {
      setError(tr("Maak eerst je eerste set profielfoto's.", "Create your first set of profile photos first."));
      return;
    }

    if (project.refinementsRemaining <= 0) {
      setError(tr("Je hebt de 2 inbegrepen verfijningen gebruikt.", "You have used the 2 included refinements."));
      return;
    }

    if (!selectedImage?.url) {
      setError(tr("Kies eerst één gegenereerde foto om aan te passen.", "Choose one generated photo to adjust first."));
      return;
    }

    if (refinement.trim().length < 3) {
      setError(tr("Beschrijf kort wat je wilt aanpassen.", "Briefly describe what you want to adjust."));
      return;
    }

    setIsRefining(true);
    setError(null);
    track("profile_photo_refine_submit", {
      page_path: pagePath,
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
        throw new Error(payload.error ?? tr("De aangepaste profielfoto kon niet worden gemaakt.", "The adjusted profile photo could not be created."));
      }

      const normalizedImages = normalizeGeneratedImages(payload.images, payload.project?.id ?? project.id);
      setImages((currentImages) => [...normalizedImages, ...currentImages]);
      setSelectedImageId(normalizedImages[0]?.id ?? selectedImage.id);
      if (payload.project) {
        setProject((currentProject) => currentProject ? { ...currentProject, ...payload.project, images: [...normalizedImages, ...(currentProject.images ?? [])] } : payload.project ?? null);
      }
      track("profile_photo_refined", {
        page_path: pagePath,
        style,
        images_generated: normalizedImages.length,
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : tr("Er ging iets mis.", "Something went wrong."));
    } finally {
      setIsRefining(false);
    }
  }

  function trackDownload(imageId: string) {
    track("profile_photo_download", {
      page_path: pagePath,
      image_id: imageId,
      style,
    });
  }

  function trackEditorClick(location: string) {
    track("profile_photo_cta_editor_click", {
      page_path: pagePath,
      cta_location: location,
      cta_text: tr("Gebruik in mijn cv", "Use in my CV"),
    });
  }

  function getDownloadUrl(image: GeneratedImage): string {
    if (!image.url) return "#";
    return image.url.includes("?") ? `${image.url}&download=1` : `${image.url}?download=1`;
  }

  function selectImage(image: GeneratedImage, index: number) {
    setSelectedImageId(image.id);
    track("profile_photo_variant_selected", {
      page_path: pagePath,
      image_id: image.id,
      variant_position: index + 1,
      style,
    });
  }

  async function startCheckout() {
    if (bundleIncluded) {
      setError(tr(
        "Je download zit in je bundle. Vernieuw de pagina als de downloadknop nog niet zichtbaar is.",
        "Your download is included in your bundle. Refresh the page if the download button is not visible yet."
      ));
      return;
    }

    if (!project?.id || images.length === 0) {
      setError(tr("Maak eerst je profielfoto-varianten. Je betaalt pas bij downloaden.", "Create your profile photo variants first. You only pay when downloading."));
      return;
    }

    setIsCheckoutRedirecting(true);
    setError(null);
    track("profile_photo_checkout_click", {
      page_path: pagePath,
      amount_cents: profilePhotoPrice.amountCents,
      currency: profilePhotoPrice.currency,
    });

    try {
      const response = await fetch("/api/profile-photo/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });
      const payload = (await response.json()) as { url?: string; error?: string };

      if (response.status === 401) {
        window.location.href = `/login?next=${encodeURIComponent(pageAnchorPath)}`;
        return;
      }

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? tr("Checkout kon niet worden gestart.", "Checkout could not be started."));
      }

      window.location.href = payload.url;
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : tr("Checkout kon niet worden gestart.", "Checkout could not be started."));
      setIsCheckoutRedirecting(false);
    }
  }

  return (
    <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:p-6">
      {authStatus === "loading" && (
        <div className="rounded-3xl border-2 border-slate-200 bg-[#FFFEF9] p-6 text-sm font-black text-slate-700">
          {tr("Accountstatus laden...", "Loading account status...")}
        </div>
      )}

      {authStatus === "anonymous" && (
        <div className="rounded-3xl border-2 border-black bg-[#FFFEF9] p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            {tr("Account nodig", "Account required")}
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {tr("Log in om je profielfoto te maken", "Log in to create your profile photo")}
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            {tr(
              "Net als je cv bewaren we je betaalde output in je WerkCV-account, zodat je je profielfoto later opnieuw kunt downloaden. Uploads worden alleen gebruikt voor de generatie.",
              "Just like your CV, we keep your paid output in your WerkCV account so you can download your profile photo again later. Uploads are only used for generation."
            )}
          </p>
          <Link
            href={`/login?next=${encodeURIComponent(pageAnchorPath)}`}
            className="mt-5 inline-flex border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            {tr("Log in en start", "Log in and start")}
          </Link>
        </div>
      )}

      {authStatus === "authenticated" && (
        <div className="space-y-6">
          <div className="rounded-3xl border-2 border-black bg-[#E9FFFC] p-4">
            <p className="text-sm font-black text-slate-950">
              {statusCopy.title}
            </p>
            <p className="mt-1 text-xs font-bold leading-relaxed text-slate-700">
              {statusCopy.description}
              {project &&
                tr(
                  ` Nog ${project.refinementsRemaining} van ${project.maxRefinements} verfijningen over.`,
                  ` ${project.refinementsRemaining} of ${project.maxRefinements} refinements remaining.`
                )}
            </p>
          </div>

          {(project?.generationCount ?? 0) === 0 && (
            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-[#FFFEF9] p-5">
                <label className="block">
                  <span className="text-sm font-black text-slate-900">
                    {tr("Upload je bestaande foto", "Upload your existing photo")}
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-relaxed text-slate-600">
                    {tr(
                      "Upload 1 tot 4 duidelijke foto's. De eerste foto is de hoofdreferentie; extra foto's helpen met herkenbaarheid. Alleen JPG, PNG of WebP.",
                      "Upload 1 to 4 clear photos. The first photo is the main reference; extra photos help with recognizability. JPG, PNG or WebP only."
                    )}
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
                      {tr("Gekozen foto's", "Selected photos")} ({files.length}/{maxFiles})
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {files.map((file, index) => (
                        <div key={`${file.name}-${file.lastModified}`} className="flex items-center gap-3">
                          {previewUrls[index] && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={previewUrls[index]}
                              alt={tr(
                                `Preview van geüploade profielfoto ${index + 1}`,
                                `Preview of uploaded profile photo ${index + 1}`
                              )}
                              className="h-20 w-20 rounded-2xl object-cover"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-slate-900">
                              {index === 0 ? tr("Hoofdfoto: ", "Main photo: ") : tr(`Referentie ${index + 1}: `, `Reference ${index + 1}: `)}
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
                  {tr(
                    "Privacy: upload alleen foto's die je wilt gebruiken voor je sollicitatie. WerkCV vraagt niet om LinkedIn-login en bewaart alleen de gegenereerde output in je account.",
                    "Privacy: only upload photos you want to use for your application. WerkCV does not ask for your LinkedIn login and only stores the generated output in your account."
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm font-black text-slate-900">
                  {tr("Kies uitstraling", "Choose a style")}
                </p>
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
                      <span className="mt-1 block text-xs font-medium leading-relaxed">
                        {uiLanguage === "en" ? option.descriptionEn : option.descriptionNl}
                      </span>
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
                {isGenerating
                  ? tr("Profielfoto's worden gemaakt...", "Creating profile photos...")
                  : tr("Maak 4 professionele varianten", "Create 4 professional variants")}
              </button>
              <p className="mt-3 text-xs font-medium leading-relaxed text-slate-500">
                {bundleIncluded
                  ? tr("Downloaden zit al in je bundle. Maak je varianten en kies je favoriet.", "Downloading is already included in your bundle. Create your variants and choose your favorite.")
                  : tr(
                    `Voorbeelden maken kan na login. Downloaden kost éénmalig ${profilePhotoPrice.display}. Geen abonnement.`,
                    `You can create previews after login. Downloading is a one-time ${profilePhotoPrice.display}. No subscription.`
                  )}
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
              <p className="text-sm font-black text-slate-900">
                {tr("Je eerste set is klaar", "Your first set is ready")}
              </p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">
                {tr(
                  "Kies hieronder je favoriete variant. Daarna kun je die foto verfijnen, gebruiken in je cv of downloaden na de eenmalige betaling.",
                  "Choose your favorite variant below. Then you can refine that photo, use it in your CV or download it after the one-time payment."
                )}
              </p>
            </div>
          )}

          <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {tr("Output", "Output")}
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  {tr("Professionele varianten", "Professional variants")}
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  {tr(
                    "Kies één favoriet. Daarna kun je die ene foto verfijnen, downloaden of gebruiken bij je cv.",
                    "Choose one favorite. Then you can refine, download or use that photo with your CV."
                  )}
                </p>
              </div>
              <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-600">
                {selectedStyle.label}
              </span>
            </div>

            {images.length === 0 ? (
              <div className="mt-6 rounded-3xl border-2 border-dashed border-slate-300 bg-white p-5">
                <div className="mx-auto max-w-xl text-center">
                  <p className="text-lg font-black text-slate-900">
                    {tr("Nog geen varianten", "No variants yet")}
                  </p>
                  <p className="mt-2 max-w-sm text-sm font-medium leading-relaxed text-slate-600">
                    {tr(
                      "Upload een duidelijke foto, kies een uitstraling en maak vier varianten die je kunt testen voor cv en LinkedIn.",
                      "Upload a clear photo, choose a style and create four variants you can test for your CV and LinkedIn."
                    )}
                  </p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {demoSamples.map((sample) => (
                    <figure key={sample.src} className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-[#FFFEF9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sample.src}
                        alt={sample.alt}
                        className="aspect-square w-full object-cover"
                      />
                      <figcaption className="border-t border-slate-200 bg-white px-2 py-2 text-center text-[11px] font-black text-slate-700">
                        {sample.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs font-bold leading-relaxed text-slate-500">
                  {tr(
                    "Voorbeelden zijn AI-demo's. Jouw output wordt gemaakt op basis van je eigen upload.",
                    "Samples are AI demos. Your output is created from your own upload."
                  )}
                </p>
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
                          alt={tr(`Gegenereerde profielfoto variant ${index + 1}`, `Generated profile photo variant ${index + 1}`)}
                          className="aspect-square w-full rounded-2xl object-cover"
                        />
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-slate-900">
                            {tr("Variant", "Variant")} {index + 1}
                          </span>
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-black ${
                              isSelected ? "bg-[#4ECDC4] text-black" : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {isSelected ? tr("Gekozen", "Selected") : tr("Kies", "Choose")}
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
                        {tr("Geselecteerde foto", "Selected photo")}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-slate-900">
                        {tr(
                          `Variant ${selectedImageIndex + 1} gebruiken`,
                          `Use variant ${selectedImageIndex + 1}`
                        )}
                      </h3>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                        {tr(
                          "Deze keuze gebruik je voor downloaden en verfijnen. Je kunt altijd eerst een andere variant selecteren voordat je betaalt.",
                          "This choice is used for downloading and refinement. You can always select another variant before you pay."
                        )}
                      </p>
                      <div className="mt-4 flex flex-col gap-3">
                        {project?.status === "paid" ? (
                          <a
                            href={getDownloadUrl(selectedImage)}
                            download={`werkcv-profielfoto-${selectedImageIndex + 1}.jpg`}
                            onClick={() => trackDownload(selectedImage.id)}
                            className="inline-flex justify-center rounded-full bg-black px-5 py-3 text-sm font-black text-white"
                          >
                            {tr("Download geselecteerde foto", "Download selected photo")}
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={startCheckout}
                            disabled={isCheckoutRedirecting}
                            className="inline-flex justify-center rounded-full bg-black px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isCheckoutRedirecting
                              ? tr("Checkout openen...", "Opening checkout...")
                              : bundleIncluded
                                ? tr("Download zit in je bundle", "Download included in your bundle")
                                : tr(`Betaal ${profilePhotoPrice.display} en download`, `Pay ${profilePhotoPrice.display} and download`)}
                          </button>
                        )}
                        <Link
                          href={editorPath}
                          onClick={() => trackEditorClick("selected_photo_action")}
                          className="inline-flex justify-center rounded-full border-2 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black"
                        >
                          {tr("Maak cv met deze foto", "Create CV with this photo")}
                        </Link>
                      </div>
                    </div>

                    <div className="rounded-3xl border-2 border-slate-200 bg-[#FFFEF9] p-5">
                      <h3 className="text-lg font-black text-slate-900">
                        {tr("Wil je deze foto aanpassen?", "Want to adjust this photo?")}
                      </h3>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                        {tr(
                          `Beschrijf alleen wat anders moet. Je hebt nog ${project?.refinementsRemaining ?? 2} verfijningen over.`,
                          `Only describe what should change. You have ${project?.refinementsRemaining ?? 2} refinements remaining.`
                        )}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {refinementSuggestions.map((suggestion) => (
                          <button
                            key={suggestion.nl}
                            type="button"
                            onClick={() => setRefinement(uiLanguage === "en" ? suggestion.en : suggestion.nl)}
                            className="rounded-full border-2 border-black bg-white px-3 py-2 text-xs font-black text-black hover:bg-[#E9FFFC]"
                          >
                            {uiLanguage === "en" ? suggestion.en : suggestion.nl}
                          </button>
                        ))}
                      </div>
                      <label className="mt-4 block">
                        <span className="text-sm font-black text-slate-900">
                          {tr("Aanpassing", "Adjustment")}
                        </span>
                        <textarea
                          value={refinement}
                          onChange={(event) => setRefinement(event.target.value.slice(0, 300))}
                          rows={3}
                          placeholder={tr(
                            "Bijvoorbeeld: casual kleding, lichtere achtergrond, iets vriendelijker, meer LinkedIn-stijl...",
                            "For example: casual clothing, lighter background, a bit friendlier, more LinkedIn style..."
                          )}
                          className="mt-2 w-full rounded-2xl border-2 border-slate-300 bg-white p-3 text-sm font-medium text-slate-900 outline-none focus:border-black"
                        />
                      </label>
                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          {refinement.length}/300 {tr("tekens", "characters")}
                        </p>
                        <button
                          type="button"
                          onClick={refinePhoto}
                          disabled={isRefining || !selectedImage || (project?.refinementsRemaining ?? 0) <= 0}
                          className="inline-flex items-center justify-center border-2 border-black bg-[#FFD166] px-4 py-3 text-sm font-black text-black disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isRefining
                            ? tr("Aangepaste variant maken...", "Creating adjusted variant...")
                            : tr("Maak aangepaste variant", "Create adjusted variant")}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 rounded-3xl border-2 border-black bg-[#FFFEF9] p-5">
                  <h3 className="text-lg font-black text-slate-900">
                    {tr("Gebruik deze foto direct op een sterk CV", "Use this photo directly on a strong CV")}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                    {tr(
                      "Je profielfoto is maar één deel van je eerste indruk. Zet hem naast een nette Nederlandse cv-template en download pas wanneer je CV klaar is.",
                      "Your profile photo is only one part of your first impression. Put it next to a clean CV template and only download when your CV is ready."
                    )}
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={editorPath}
                      onClick={() => trackEditorClick("output_final_cta")}
                      className="inline-flex flex-1 items-center justify-center border-2 border-black bg-[#4ECDC4] px-4 py-3 text-sm font-black text-black"
                    >
                      {tr("Maak mijn CV met deze foto", "Create my CV with this photo")}
                    </Link>
                    <Link
                      href={templatesPath}
                      className="inline-flex flex-1 items-center justify-center border-2 border-black bg-white px-4 py-3 text-sm font-black text-black"
                    >
                      {tr("Bekijk templates", "View templates")}
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
