import { CVData } from "@/lib/cv";
import { ColorTheme } from "@/lib/templates";
import { LinkText } from "./link-utils";
import { formatGender, formatLanguageLevel, formatMaritalStatus, resumeText } from "@/lib/resume-language";

interface TemplateProps {
    data: CVData;
    theme: ColorTheme;
}

// Elegant skill bars component
function SkillBars({ level, color }: { level: number; color: string }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((bar) => (
                <div
                    key={bar}
                    className="h-1 w-3 rounded-sm"
                    style={{
                        backgroundColor: bar <= level ? color : '#e5e7eb',
                    }}
                />
            ))}
        </div>
    );
}

export default function ElegantTemplate({ data, theme }: TemplateProps) {
    return (
        <div
            className="bg-white min-h-[297mm] w-[210mm] mx-auto flex"
            style={{ color: theme.text }}
        >
            {/* Main Content - Left */}
            <div className="w-[64%] p-9 space-y-6">
                {/* Header with decorative line */}
                <div className="mb-7 text-left">
                    <h1 className="font-serif text-[34px] font-bold leading-tight tracking-tight">
                        {data.personal.name || resumeText(data, "nameFallback")}
                    </h1>
                    {data.personal.title && (
                        <p
                            className="mt-2 font-serif text-[15px] italic"
                            style={{ color: theme.primary }}
                        >
                            {data.personal.title}
                        </p>
                    )}
                    <div
                        className="mt-4 h-0.5 w-20"
                        style={{ backgroundColor: theme.primary }}
                    />
                </div>

                {/* Profile Summary */}
                {data.personal.summary && (
                    <div>
                        <h2
                            className="mb-3 border-b pb-2 font-serif text-xs font-bold uppercase tracking-[0.18em]"
                            style={{ color: theme.primary }}
                        >{resumeText(data, "profile")}</h2>
                        <p className="whitespace-pre-wrap text-[13px] font-light leading-6">
                            {data.personal.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <div>
                        <h2
                            className="mb-4 border-b pb-2 font-serif text-xs font-bold uppercase tracking-[0.18em]"
                            style={{ color: theme.primary }}
                        >{resumeText(data, "experience")}</h2>
                        <div className="space-y-5">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative border-b pb-4 last:border-b-0 last:pb-0" style={{ borderColor: `${theme.primary}20` }}>
                                    <div className="flex items-baseline justify-between gap-4">
                                        <h3 className="font-serif text-[13px] font-bold leading-snug">{exp.role}</h3>
                                        <span
                                            className="whitespace-nowrap text-[11px] italic"
                                            style={{ color: theme.textMuted }}
                                        >
                                            {exp.start} - {exp.end}
                                        </span>
                                    </div>
                                    <p
                                        className="mt-0.5 font-serif text-[12px] italic"
                                        style={{ color: theme.secondary }}
                                    >
                                        {exp.company}{exp.location && `, ${exp.location}`}
                                    </p>
                                    {exp.description && (
                                        <p className="mt-2 text-[11px] font-light leading-relaxed" style={{ color: theme.textMuted }}>
                                            {exp.description}
                                        </p>
                                    )}
                                    {exp.highlights && exp.highlights.length > 0 && (
                                        <ul className="mt-2 space-y-1">
                                            {exp.highlights.map((highlight, hi) => (
                                                <li key={hi} className="flex gap-2 text-[11px] font-light leading-relaxed">
                                                    <span style={{ color: theme.primary }}>—</span>
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
                    <div>
                        <h2
                            className="mb-4 border-b pb-2 font-serif text-xs font-bold uppercase tracking-[0.18em]"
                            style={{ color: theme.primary }}
                        >{resumeText(data, "internships")}</h2>
                        <div className="space-y-3">
                            {data.internships.map((intern, i) => (
                                <div key={i} className="relative border-b pb-4 last:border-b-0 last:pb-0" style={{ borderColor: `${theme.primary}20` }}>
                                    <div className="flex items-baseline justify-between gap-4">
                                        <h3 className="font-serif text-[13px] font-bold leading-snug">{intern.role}</h3>
                                        <span
                                            className="whitespace-nowrap text-[11px] italic"
                                            style={{ color: theme.textMuted }}
                                        >
                                            {intern.start} - {intern.end}
                                        </span>
                                    </div>
                                    <p
                                        className="mt-0.5 font-serif text-[12px] italic"
                                        style={{ color: theme.secondary }}
                                    >
                                        {intern.company}{intern.location && `, ${intern.location}`}
                                    </p>
                                    {intern.description && (
                                        <p className="mt-2 text-[11px] font-light leading-relaxed" style={{ color: theme.textMuted }}>
                                            {intern.description}
                                        </p>
                                    )}
                                    {intern.highlights && intern.highlights.length > 0 && (
                                        <ul className="mt-2 space-y-1">
                                            {intern.highlights.map((highlight, hi) => (
                                                <li key={hi} className="flex gap-2 text-[11px] font-light leading-relaxed">
                                                    <span style={{ color: theme.primary }}>—</span>
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
                    <div>
                        <h2
                            className="mb-4 border-b pb-2 font-serif text-xs font-bold uppercase tracking-[0.18em]"
                            style={{ color: theme.primary }}
                        >{resumeText(data, "education")}</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <div className="flex items-baseline justify-between gap-4">
                                        <h3 className="font-serif text-[13px] font-bold leading-snug">{edu.degree}</h3>
                                        <span
                                            className="whitespace-nowrap text-[11px] italic"
                                            style={{ color: theme.textMuted }}
                                        >
                                            {edu.start} - {edu.end}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-light" style={{ color: theme.textMuted }}>
                                        {edu.school}{edu.location && `, ${edu.location}`}
                                    </p>
                                    {edu.description && (
                                        <p className="mt-1 text-[11px] font-light leading-relaxed" style={{ color: theme.textMuted }}>
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Courses */}
                {data.courses && data.courses.length > 0 && (
                    <div>
                        <h2
                            className="mb-3 border-b pb-2 font-serif text-xs font-bold uppercase tracking-[0.18em]"
                            style={{ color: theme.primary }}
                        >{resumeText(data, "courses")}</h2>
                        <div className="space-y-1">
                            {data.courses.map((course, i) => (
                                <div key={i} className="flex justify-between gap-4 text-[12px] font-light">
                                    <span className="font-medium">{course.name}</span>
                                    <span className="italic" style={{ color: theme.textMuted }}>
                                        {course.institution} • {course.year}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Awards */}
                {data.awards && data.awards.length > 0 && (
                    <div>
                        <h2
                            className="mb-3 border-b pb-2 font-serif text-xs font-bold uppercase tracking-[0.18em]"
                            style={{ color: theme.primary }}
                        >{resumeText(data, "awards")}</h2>
                        <ul className="space-y-1">
                            {data.awards.map((award, i) => (
                                <li key={i} className="flex items-start gap-2 text-[12px] font-light leading-relaxed">
                                    <span style={{ color: theme.primary }}>&mdash;</span>
                                    <span>{award}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div
                className="w-[36%] p-7 space-y-6"
                style={{
                    backgroundColor: `${theme.primary}06`,
                    borderLeft: `1px solid ${theme.border}`
                }}
            >
                {/* Photo or initials */}
                <div className="flex justify-center mb-6">
                    {data.personal.photo ? (
                        <img
                            src={data.personal.photo}
                            alt={data.personal.name || resumeText(data, "profilePhotoAlt")}
                            className="h-24 w-24 rounded-full object-cover"
                            style={{ border: `2px solid ${theme.primary}` }}
                        />
                    ) : (
                        <div
                            className="flex h-24 w-24 items-center justify-center rounded-full font-serif text-2xl"
                            style={{
                                border: `2px solid ${theme.primary}`,
                                color: theme.primary
                            }}
                        >
                            {data.personal.name ? data.personal.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'CV'}
                        </div>
                    )}
                </div>

                {/* Personalia */}
                <div>
                    <h2
                        className="mb-3 border-b pb-2 font-serif text-[11px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: theme.primary }}
                    >{resumeText(data, "personalDetails")}</h2>
                    <div className="space-y-2.5 text-[11px] leading-relaxed" style={{ color: theme.textMuted }}>
                        {data.personal.address && (
                            <div>
                                <div className="font-medium" style={{ color: theme.text }}>{data.personal.address}</div>
                                {data.personal.postalCode && <div>{data.personal.postalCode}</div>}
                            </div>
                        )}
                        {data.personal.email && (
                            <div className="break-words">{data.personal.email}</div>
                        )}
                        {data.personal.phone && <div>{data.personal.phone}</div>}
                        {(data.personal.birthDate || data.personal.birthPlace) && (
                            <div className="pt-2">
                                <div className="font-medium" style={{ color: theme.text }}>{resumeText(data, "birthDate")}</div>
                                <div>{data.personal.birthDate}</div>
                                {data.personal.birthPlace && <div>{data.personal.birthPlace}</div>}
                            </div>
                        )}
                        {data.personal.nationality && (
                            <div className="pt-1">
                                <div className="font-medium" style={{ color: theme.text }}>{resumeText(data, "nationality")}</div>
                                <div>{data.personal.nationality}</div>
                            </div>
                        )}
                        {data.personal.driversLicense && (
                            <div className="pt-1">
                                <div className="font-medium" style={{ color: theme.text }}>{resumeText(data, "driversLicense")}</div>
                                <div>{data.personal.driversLicense}</div>
                            </div>
                        )}
                        {formatGender(data.personal.gender, data) && (
                            <div className="pt-1">
                                <div className="font-medium" style={{ color: theme.text }}>{resumeText(data, "gender")}</div>
                                <div>{formatGender(data.personal.gender, data)}</div>
                            </div>
                        )}
                        {formatMaritalStatus(data.personal.maritalStatus, data) && (
                            <div className="pt-1">
                                <div className="font-medium" style={{ color: theme.text }}>{resumeText(data, "maritalStatus")}</div>
                                <div>{formatMaritalStatus(data.personal.maritalStatus, data)}</div>
                            </div>
                        )}
                        {data.personal.linkedIn && (
                            <div className="pt-1">
                                <div className="font-medium" style={{ color: theme.text }}>LinkedIn</div>
                                <div className="break-words"><LinkText value={data.personal.linkedIn} /></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills with bars */}
                {data.skills.length > 0 && (
                    <div>
                        <h2
                            className="mb-3 border-b pb-2 font-serif text-[11px] font-bold uppercase tracking-[0.18em]"
                            style={{ color: theme.primary }}
                        >{resumeText(data, "skills")}</h2>
                        <div className="space-y-2.5">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="flex items-center justify-between gap-3">
                                    <span className="text-[11px] leading-snug" style={{ color: theme.text }}>
                                        {typeof skill === 'object' ? skill.name : skill}
                                    </span>
                                    <SkillBars
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
                            className="mb-3 border-b pb-2 font-serif text-[11px] font-bold uppercase tracking-[0.18em]"
                            style={{ color: theme.primary }}
                        >{resumeText(data, "languages")}</h2>
                        <div className="space-y-2.5">
                            {data.languages.map((lang, i) => (
                                <div key={i}>
                                    <div className="text-[11px] font-medium" style={{ color: theme.text }}>
                                        {typeof lang === 'object' ? lang.name : lang}
                                    </div>
                                    {typeof lang === 'object' && lang.level && (
                                        <div className="text-[11px] italic" style={{ color: theme.textMuted }}>{formatLanguageLevel(lang.level, data)}</div>
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
                            className="mb-3 border-b pb-2 font-serif text-[11px] font-bold uppercase tracking-[0.18em]"
                            style={{ color: theme.primary }}
                        >{resumeText(data, "interests")}</h2>
                        <div className="flex flex-wrap gap-1">
                            {data.interests.map((interest, i) => (
                                <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded font-light"
                                    style={{
                                        border: `1px solid ${theme.border}`,
                                        color: theme.text
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



