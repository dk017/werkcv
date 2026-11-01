// Injected by the popup's "Check this page" button (activeTab), on the page the user is looking at. Reads the job's
// JobPosting structured data: employer, title, description and salary. The value of the last expression is returned
// to the popup; nothing is sent anywhere else.

(() => {
  const plain = (html) => new DOMParser().parseFromString(String(html || ""), "text/html").body.textContent.replace(/\s+/g, " ").trim();
  const salaryText = (salary) => {
    const value = salary?.value ?? salary;
    if (!value) return "";
    const min = value.minValue ?? value.value;
    const max = value.maxValue ?? value.value;
    if (!min) return "";
    const unit = String(value.unitText || salary.unitText || "").toUpperCase();
    const per = { MONTH: "per month", YEAR: "per year", HOUR: "per hour", WEEK: "per week" }[unit] || "";
    return `€${min}${max && max !== min ? ` - €${max}` : ""} ${per}`.trim();
  };

  const postings = [];
  for (const script of document.querySelectorAll("script[type='application/ld+json']")) {
    try {
      const data = JSON.parse(script.textContent || "");
      for (const item of [data, ...(Array.isArray(data?.["@graph"]) ? data["@graph"] : [])].flat()) {
        const type = item?.["@type"];
        if (type === "JobPosting" || (Array.isArray(type) && type.includes("JobPosting"))) postings.push(item);
      }
    } catch {
      // Not readable JSON; skip.
    }
  }

  const posting = postings[0];
  if (!posting) return { found: false };
  const organisation = Array.isArray(posting.hiringOrganization) ? posting.hiringOrganization[0] : posting.hiringOrganization;
  return {
    found: true,
    employer: String((typeof organisation === "string" ? organisation : organisation?.name) || "").trim().slice(0, 120),
    title: String(posting.title || "").trim().slice(0, 160),
    salary: salaryText(posting.baseSalary),
    description: plain(posting.description).slice(0, 12000),
  };
})();
