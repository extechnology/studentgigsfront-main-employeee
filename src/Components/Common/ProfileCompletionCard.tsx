import {
    AlertCircle,
    ArrowRight,
    BriefcaseBusiness,
    CheckCircle2,
    CircleDashed,
    FileCheck2,
    GraduationCap,
    Loader2,
    RefreshCw,
    Settings2,
    Sparkles,
    UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type {
    ProfileCompletionResponse,
    ProfileCompletionSection,
    ProfileCompletionSectionKey,
} from "@/Service/ProfileCompletionTypes";

interface ProfileCompletionCardProps {
    data?: ProfileCompletionResponse | null;
    isLoading?: boolean;
    isError?: boolean;
    isFetching?: boolean;
    onRetry?: () => void;
    className?: string;
    actionHref?: string;
    actionLabel?: string;
}

interface SectionMeta {
    label: string;
    icon: LucideIcon;
    accentClassName: string;
}

const SECTION_ORDER: ProfileCompletionSectionKey[] = [
    "basic_info",
    "skills",
    "education",
    "experience",
    "work_preferences",
    "additional_info",
];

const SECTION_META: Record<ProfileCompletionSectionKey, SectionMeta> = {
    basic_info: {
        label: "Basic info",
        icon: UserRound,
        accentClassName: "bg-blue-50 text-blue-600",
    },
    skills: {
        label: "Skills",
        icon: Sparkles,
        accentClassName: "bg-emerald-50 text-emerald-600",
    },
    education: {
        label: "Education",
        icon: GraduationCap,
        accentClassName: "bg-violet-50 text-violet-600",
    },
    experience: {
        label: "Experience",
        icon: BriefcaseBusiness,
        accentClassName: "bg-amber-50 text-amber-600",
    },
    work_preferences: {
        label: "Work preferences",
        icon: Settings2,
        accentClassName: "bg-cyan-50 text-cyan-600",
    },
    additional_info: {
        label: "Additional info",
        icon: FileCheck2,
        accentClassName: "bg-rose-50 text-rose-600",
    },
};

const clampPercentage = (value: number) => Math.min(100, Math.max(0, value || 0));

const formatFieldName = (field: string) =>
    field
        .split("_")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const getSectionSummary = (section: ProfileCompletionSection) => {
    if (section.percentage >= 100 || section.missing_fields.length === 0) {
        return "Completed";
    }

    if (section.missing_fields.length === 1) {
        return `${formatFieldName(section.missing_fields[0])} missing`;
    }

    return `${section.missing_fields.length} fields missing`;
};

export default function ProfileCompletionCard({
    data,
    isLoading = false,
    isError = false,
    isFetching = false,
    onRetry,
    className,
    actionHref = "/settings",
    actionLabel = "Complete profile",
}: ProfileCompletionCardProps) {
    if (isLoading) {
        return <ProfileCompletionSkeleton className={className} />;
    }

    if (isError || !data) {
        return (
            <section className={cn("rounded-xl border border-red-100 bg-white p-4 shadow-sm", className)}>
                <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <AlertCircle size={22} />
                    </span>
                    <div className="min-w-0">
                        <h2 className="text-base font-semibold text-gray-900">
                            Profile completion unavailable
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            We could not load your completion progress right now.
                        </p>

                        {onRetry && (
                            <button
                                type="button"
                                onClick={onRetry}
                                className="mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-100 px-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                            >
                                <RefreshCw size={15} />
                                Try again
                            </button>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    const overallPercentage = clampPercentage(data.overall_percentage);
    const completedSections = SECTION_ORDER.filter(
        (sectionKey) => data.sections[sectionKey].percentage >= 100
    ).length;
    const sections = SECTION_ORDER.map((sectionKey) => ({
        key: sectionKey,
        meta: SECTION_META[sectionKey],
        value: data.sections[sectionKey],
    }));
    const missingFields = sections.flatMap(({ meta, value }) =>
        value.missing_fields.map((field) => ({
            section: meta.label,
            field,
        }))
    );
    const nextMissingFields = missingFields.slice(0, 4);
    const circumference = 2 * Math.PI * 38;
    const strokeOffset = circumference - (overallPercentage / 100) * circumference;
    const isComplete = data.is_complete || overallPercentage >= 100;

    return (
        <section className={cn("overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm", className)}>
            <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/70 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                            Profile strength
                        </p>
                        <h2 className="mt-1 text-lg font-bold leading-snug text-gray-950">
                            {isComplete ? "Ready to apply" : "Complete your profile"}
                        </h2>
                    </div>

                    {isFetching && (
                        <Loader2 className="mt-1 h-5 w-5 shrink-0 animate-spin text-emerald-600" />
                    )}
                </div>

                <div className="mt-5 flex items-center gap-4">
                    <div className="relative h-28 w-28 shrink-0">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 110 110">
                            <circle
                                cx="55"
                                cy="55"
                                r="38"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="10"
                            />
                            <circle
                                cx="55"
                                cy="55"
                                r="38"
                                fill="none"
                                stroke={isComplete ? "#059669" : "#2563eb"}
                                strokeLinecap="round"
                                strokeWidth="10"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeOffset}
                                className="transition-all duration-700"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-gray-950">
                                {overallPercentage}%
                            </span>
                            <span className="text-[11px] font-semibold text-gray-500">
                                complete
                            </span>
                        </div>
                    </div>

                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-700 shadow-sm ring-1 ring-gray-100">
                            {isComplete ? (
                                <CheckCircle2 size={15} className="text-emerald-600" />
                            ) : (
                                <CircleDashed size={15} className="text-blue-600" />
                            )}
                            {completedSections}/{SECTION_ORDER.length} done
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            {isComplete
                                ? "Your profile has the key details recruiters expect."
                                : "Add the missing details to improve employer visibility."}
                        </p>
                    </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-700"
                        style={{ width: `${overallPercentage}%` }}
                    />
                </div>

                <Link
                    to={actionHref}
                    className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
                >
                    {actionLabel}
                    <ArrowRight size={16} />
                </Link>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h3 className="text-sm font-bold text-gray-950">
                            Completion checklist
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                            {missingFields.length} fields left
                        </p>
                    </div>
                    <span
                        className={cn(
                            "rounded-full px-3 py-1 text-xs font-bold",
                            isComplete
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                        )}
                    >
                        {isComplete ? "Complete" : "Pending"}
                    </span>
                </div>

                <div className="mt-4 space-y-3">
                    {sections.map(({ key, meta, value }) => (
                        <SectionProgress
                            key={key}
                            label={meta.label}
                            icon={meta.icon}
                            accentClassName={meta.accentClassName}
                            section={value}
                        />
                    ))}
                </div>

                {nextMissingFields.length > 0 && (
                    <div className="mt-4 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-3">
                        <div className="text-xs font-bold text-gray-900">
                            Next details to add
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {nextMissingFields.map((item) => (
                                <span
                                    key={`${item.section}-${item.field}`}
                                    className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-600"
                                >
                                    {formatFieldName(item.field)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function SectionProgress({
    label,
    icon: Icon,
    accentClassName,
    section,
}: {
    label: string;
    icon: LucideIcon;
    accentClassName: string;
    section: ProfileCompletionSection;
}) {
    const percentage = clampPercentage(section.percentage);
    const isComplete = percentage >= 100;

    return (
        <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                    <span
                        className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                            accentClassName
                        )}
                    >
                        <Icon size={16} />
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-900">{label}</p>
                        <p className="text-xs font-medium text-gray-500">
                            {section.filled}/{section.total} completed
                        </p>
                    </div>
                </div>

                {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                    <span className="shrink-0 text-xs font-bold text-gray-600">
                        {percentage}%
                    </span>
                )}
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isComplete ? "bg-emerald-500" : "bg-blue-600"
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="mt-2 truncate text-xs font-medium text-gray-500">
                {getSectionSummary(section)}
            </p>
        </div>
    );
}

function ProfileCompletionSkeleton({ className }: { className?: string }) {
    return (
        <section className={cn("animate-pulse overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm", className)}>
            <div className="bg-gray-50 p-5">
                <div className="h-3 w-28 rounded-full bg-gray-200" />
                <div className="mt-3 h-6 w-48 rounded-md bg-gray-200" />
                <div className="mt-5 flex items-center gap-4">
                    <div className="h-28 w-28 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-3">
                        <div className="h-7 w-24 rounded-full bg-gray-200" />
                        <div className="h-4 w-full rounded-full bg-gray-200" />
                        <div className="h-4 w-3/4 rounded-full bg-gray-200" />
                    </div>
                </div>
                <div className="mt-5 h-2 rounded-full bg-gray-200" />
                <div className="mt-5 h-10 rounded-md bg-gray-200" />
            </div>

            <div className="p-4">
                <div className="h-5 w-40 rounded-md bg-gray-200" />
                <div className="mt-4 space-y-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-[92px] rounded-lg border border-gray-100 bg-gray-50"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
