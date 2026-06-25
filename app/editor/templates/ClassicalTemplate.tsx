import { CVData } from "@/lib/cv";
import { ColorTheme } from "@/lib/templates";
import { LinkText } from "./link-utils";
import { formatGender, formatLanguageLevel, formatMaritalStatus, formatResumeDateRange, formatResumeInlineValue, resumeText } from "@/lib/resume-language";

interface TemplateProps {
    data: CVData;
    theme: ColorTheme;
}

// Skill level indicator (horizontal bars)
function SkillLevel({ level, color }: { level: number; color: string }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((bar) => (
                <div
                    key={bar}
                    className="h-1.5 w-3.5 rounded-sm"
                    style={{
                        backgroundColor: bar <= level ? color : '#e5e7eb',
                    }}
                />
            ))}
        </div>
    );
}

export default function ClassicalTemplate({ data, theme }: TemplateProps) {
    const contactItems = [
        data.personal.email,
        data.personal.phone,
        data.personal.address,
        data.personal.postalCode,
        data.personal.location ? formatResumeInlineValue(data.personal.location, data) : "",
    ].filter((value): value is string => Boolean(value && value.trim()));

    return (
        <div
            className="bg-white min-h-[297mm] w-[210mm] mx-auto p-10"
            style={{ color: theme.text }}
        >
            {/* Header - Centered */}
            <div className="mb-7 pb-5 text-center" style={{ borderBottom: `2px solid ${theme.primary}` }}>
                {data.personal.photo && (
                    <div className="mx-auto mb-4 h-24 w-24 rounded-full p-1" style={{ border: `1px solid ${theme.primary}` }}>
                        <img
                            src={data.personal.photo}
                            alt={data.personal.name || resumeText(data, "profilePhotoAlt")}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                )}
                <h1 className="mb-1 text-[34px] font-bold leading-tight tracking-tight">
                    {data.personal.name || resumeText(data, "nameFallback")}
                </h1>
                {data.personal.title && (
                    <p className="text-[15px] font-medium" style={{ color: theme.textMuted }}>
                        {data.personal.title}
                    </p>
                )}
                {/* Contact Info Row */}
                {contactItems.length > 0 && (
                    <p className="mt-3 text-center text-[11px] font-medium leading-relaxed" style={{ color: theme.textMuted }}>
                        {contactItems.join(" • ")}
                    </p>
                )}
            </div>

            {/* Two column layout for personal details */}
            <div className="mb-6 grid grid-cols-3 gap-5 text-[11px] leading-relaxed" style={{ color: theme.textMuted }}>
                {data.personal.birthDate && (
                    <div>
                        <span className="font-semibold" style={{ color: theme.text }}>{resumeText(data, "birthDate")}:</span> {data.personal.birthDate}
                        {data.personal.birthPlace && `, ${data.personal.birthPlace}`}
                    </div>
                )}
                {data.personal.nationality && (
                    <div>
                        <span className="font-semibold" style={{ color: theme.text }}>{resumeText(data, "nationality")}:</span> {data.personal.nationality}
                    </div>
                )}
                {data.personal.driversLicense && (
                    <div>
                        <span className="font-semibold" style={{ color: theme.text }}>{resumeText(data, "driversLicense")}:</span> {data.personal.driversLicense}
                    </div>
                )}
                {formatGender(data.personal.gender, data) && (
                    <div>
                        <span className="font-semibold" style={{ color: theme.text }}>{resumeText(data, "gender")}:</span> {formatGender(data.personal.gender, data)}
                    </div>
                )}
                {formatMaritalStatus(data.personal.maritalStatus, data) && (
                    <div>
                        <span className="font-semibold" style={{ color: theme.text }}>{resumeText(data, "maritalStatus")}:</span> {formatMaritalStatus(data.personal.maritalStatus, data)}
                    </div>
                )}
                {data.personal.linkedIn && (
                    <div>
                        <span className="font-semibold" style={{ color: theme.text }}>LinkedIn:</span> <LinkText value={data.personal.linkedIn} />
                    </div>
                )}
            </div>

            {/* Profile Summary */}
            {data.personal.summary && (
                <div className="mb-5">
                    <h2
                        className="mb-3 border-b pb-2 text-xs font-bold uppercase tracking-[0.16em]"
                        style={{ color: theme.primary }}
                    >{resumeText(data, "profile")}</h2>
                    <p className="whitespace-pre-wrap text-[13px] leading-6">
                        {data.personal.summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <div className="mb-5">
                    <h2
                        className="mb-4 border-b pb-2 text-xs font-bold uppercase tracking-[0.16em]"
                        style={{ color: theme.primary, borderBottom: `1px solid ${theme.border}` }}
                    >{resumeText(data, "experience")}</h2>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="mb-1 flex items-start justify-between gap-4">
                                    <h3 className="text-[13px] font-bold leading-snug">{exp.role}</h3>
                                    <span className="w-[96px] shrink-0 text-left text-[11px]" style={{ color: theme.textMuted }}>
                                        {formatResumeDateRange(exp.start, exp.end, data)}
                                    </span>
                                </div>
                                <p className="mb-1 text-[12px] font-semibold" style={{ color: theme.secondary }}>
                                    {exp.company}{exp.location && ` | ${exp.location}`}
                                </p>
                                {exp.description && (
                                    <p className="text-[11px] leading-relaxed" style={{ color: theme.textMuted }}>
                                        {exp.description}
                                    </p>
                                )}
                                {exp.highlights && exp.highlights.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {exp.highlights.map((highlight, hi) => (
                                            <li key={hi} className="flex gap-2 text-[11px] leading-relaxed">
                                                <span style={{ color: theme.primary }}>•</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Internships */}
            {data.internships && data.internships.length > 0 && (
                <div className="mb-5">
                    <h2
                        className="mb-4 border-b pb-2 text-xs font-bold uppercase tracking-[0.16em]"
                        style={{ color: theme.primary, borderBottom: `1px solid ${theme.border}` }}
                    >{resumeText(data, "internships")}</h2>
                    <div className="space-y-3">
                        {data.internships.map((intern, i) => (
                            <div key={i}>
                                <div className="mb-1 flex items-start justify-between gap-4">
                                    <h3 className="text-[13px] font-bold leading-snug">{intern.role}</h3>
                                    <span className="w-[96px] shrink-0 text-left text-[11px]" style={{ color: theme.textMuted }}>
                                        {formatResumeDateRange(intern.start, intern.end, data)}
                                    </span>
                                </div>
                                <p className="text-[12px] font-semibold" style={{ color: theme.secondary }}>
                                    {intern.company}{intern.location && ` | ${intern.location}`}
                                </p>
                                {intern.description && (
                                    <p className="mt-1 text-[11px] leading-relaxed" style={{ color: theme.textMuted }}>
                                        {intern.description}
                                    </p>
                                )}
                                {intern.highlights && intern.highlights.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {intern.highlights.map((highlight, hi) => (
                                            <li key={hi} className="flex gap-2 text-[11px] leading-relaxed">
                                                <span style={{ color: theme.primary }}>•</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <div className="mb-5">
                    <h2
                        className="mb-4 border-b pb-2 text-xs font-bold uppercase tracking-[0.16em]"
                        style={{ color: theme.primary, borderBottom: `1px solid ${theme.border}` }}
                    >{resumeText(data, "education")}</h2>
                    <div className="space-y-3">
                        {data.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                                    <p className="text-xs" style={{ color: theme.textMuted }}>
                                        {edu.school}{edu.location && `, ${formatResumeInlineValue(edu.location, data)}`}
                                    </p>
                                    {edu.description && (
                                        <p className="text-xs mt-1" style={{ color: theme.textMuted }}>
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                                <span className="text-xs shrink-0 text-left w-[96px]" style={{ color: theme.textMuted }}>
                                    {formatResumeDateRange(edu.start, edu.end, data)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Courses */}
            {data.courses && data.courses.length > 0 && (
                <div className="mb-5">
                    <h2
                        className="text-sm font-bold uppercase tracking-wide mb-3 pb-1"
                        style={{ color: theme.primary, borderBottom: `1px solid ${theme.border}` }}
                    >{resumeText(data, "courses")}</h2>
                    <div className="space-y-1">
                        {data.courses.map((course, i) => (
                            <div key={i} className="flex justify-between text-xs">
                                <span className="font-medium">{course.name}</span>
                                <span style={{ color: theme.textMuted }}>
                                    {course.institution} • {course.year}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Awards */}
            {data.awards && data.awards.length > 0 && (
                <div className="mb-5">
                    <h2
                        className="text-sm font-bold uppercase tracking-wide mb-3 pb-1"
                        style={{ color: theme.primary, borderBottom: `1px solid ${theme.border}` }}
                    >{resumeText(data, "awards")}</h2>
                    <ul className="space-y-1">
                        {data.awards.map((award, i) => (
                            <li key={i} className="text-xs flex items-start gap-2">
                                <span style={{ color: theme.primary }}>•</span>
                                <span>{award}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Skills & Languages & Interests Row */}
            <div className="grid grid-cols-3 gap-6">
                {/* Skills */}
                {data.skills.length > 0 && (
                    <div>
                        <h2
                            className="text-sm font-bold uppercase tracking-wide mb-3 pb-1"
                            style={{ color: theme.primary, borderBottom: `1px solid ${theme.border}` }}
                        >{resumeText(data, "skills")}</h2>
                        <div className="space-y-2">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-xs">
                                        {typeof skill === 'object' ? skill.name : skill}
                                    </span>
                                    <SkillLevel
                                        level={typeof skill === 'object' ? skill.level : 3}
                                        color={theme.primary}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {data.languages.length > 0 && (
                    <div>
                        <h2
                            className="text-sm font-bold uppercase tracking-wide mb-3 pb-1"
                            style={{ color: theme.primary, borderBottom: `1px solid ${theme.border}` }}
                        >{resumeText(data, "languages")}</h2>
                        <div className="space-y-1">
                            {data.languages.map((lang, i) => (
                                <div key={i}>
                                    <div className="text-xs font-medium">
                                        {typeof lang === 'object' ? lang.name : lang}
                                    </div>
                                    {typeof lang === 'object' && lang.level && (
                                        <div className="text-xs" style={{ color: theme.textMuted }}>{formatLanguageLevel(lang.level, data)}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests */}
                {data.interests && data.interests.length > 0 && (
                    <div>
                        <h2
                            className="text-sm font-bold uppercase tracking-wide mb-3 pb-1"
                            style={{ color: theme.primary, borderBottom: `1px solid ${theme.border}` }}
                        >{resumeText(data, "interests")}</h2>
                        <div className="flex flex-wrap gap-1">
                            {data.interests.map((interest, i) => (
                                <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded-full"
                                    style={{
                                        backgroundColor: `${theme.primary}10`,
                                        color: theme.primary
                                    }}
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



