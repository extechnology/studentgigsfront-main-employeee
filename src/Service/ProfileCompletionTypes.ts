export type ProfileCompletionSectionKey =
    | "basic_info"
    | "skills"
    | "education"
    | "experience"
    | "work_preferences"
    | "additional_info";

export interface ProfileCompletionSection {
    filled: number;
    total: number;
    percentage: number;
    missing_fields: string[];
}

export type ProfileCompletionSections = Record<
    ProfileCompletionSectionKey,
    ProfileCompletionSection
>;

export interface ProfileCompletionResponse {
    overall_percentage: number;
    is_complete: boolean;
    sections: ProfileCompletionSections;
}
