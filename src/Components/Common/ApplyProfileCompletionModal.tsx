import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import toast from "react-hot-toast";
import {
    Camera,
    CheckCircle2,
    Clock3,
    Loader2,
    MapPin,
    UploadCloud,
    UserRound,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import ImageCropper from "@/Components/Settings/ImageCropper";
import ProfileAvatar from "@/Components/Common/ProfileAvatar";
import {
    EditPersonalInfo,
    EditProfilePicture,
    GetPersonalInfo,
    GetProfilePicture,
} from "@/Hooks/UserProfile";
import { AllLocations, JObTittles } from "@/Hooks/Utils";
import { cn } from "@/lib/utils";

type Inputs = {
    name: string;
    email: string;
    phone: string;
    preferred_work_location: string;
    available_work_hours: string | number;
    job_title: string;
    about: string;
    date_of_birth: string;
    age: string | number;
    gender: string;
};

interface Option {
    value: string;
    label: string;
}

interface ApplyProfileCompletionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCompleted?: () => void;
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const inputClassName =
    "h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:bg-gray-50";

const toDateInputValue = (value?: string | null) => {
    if (!value) return "";
    return String(value).slice(0, 10);
};

const getDefaults = (user: any): Inputs => ({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    preferred_work_location: user?.preferred_work_location ?? "",
    available_work_hours: user?.available_work_hours ?? "",
    job_title: user?.job_title ?? "",
    about: user?.about ?? "",
    date_of_birth: toDateInputValue(user?.date_of_birth),
    age: user?.age ?? "",
    gender: user?.gender ?? "",
});

const base64ToFile = (base64String: string, fileName: string) => {
    const matches = base64String.match(/^data:(.+?);base64,(.+)$/);

    if (!matches) {
        throw new Error("Invalid image data.");
    }

    const mime = matches[1];
    const base64Data = matches[2];
    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index++) {
        bytes[index] = binary.charCodeAt(index);
    }

    return new File([bytes], fileName, { type: mime });
};

const isSuccessfulResponse = (response: any) => {
    const status = response?.status;
    return typeof status === "number" && status >= 200 && status < 300;
};

export default function ApplyProfileCompletionModal({
    open,
    onOpenChange,
    onCompleted,
}: ApplyProfileCompletionModalProps) {
    const [search, setSearch] = useState("");
    const [personalInfoId, setPersonalInfoId] = useState("");
    const [profilePhotoId, setProfilePhotoId] = useState("");
    const [currentProfilePic, setCurrentProfilePic] = useState("");
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState("");
    const [tempProfileSrc, setTempProfileSrc] = useState("");
    const [showProfileCropper, setShowProfileCropper] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        watch,
        setValue,
    } = useForm<Inputs>({ defaultValues: getDefaults(null) });

    const {
        data,
        isLoading,
        isError,
        isPending,
        isFetching,
    } = GetPersonalInfo();
    const {
        data: profilePictureData,
        isLoading: profilePictureLoading,
        isPending: profilePicturePending,
        isFetching: profilePictureFetching,
    } = GetProfilePicture();
    const { data: locations, isLoading: locationLoading } = AllLocations(search);
    const {
        data: jobTitles,
        isLoading: jobTitleLoading,
        isPending: jobTitlePending,
    } = JObTittles();
    const {
        mutateAsync: editPersonalInfo,
        isPending: isSavingPersonalInfo,
    } = EditPersonalInfo();
    const {
        mutateAsync: editProfilePicture,
        isPending: isSavingProfilePicture,
    } = EditProfilePicture();

    const selectedUser = Array.isArray(data) ? data[0] : null;
    const selectedProfilePicture = Array.isArray(profilePictureData) ? profilePictureData[0] : null;
    const dateOfBirth = watch("date_of_birth");
    const isSaving = isSavingPersonalInfo || isSavingProfilePicture;
    const isFormLoading =
        !selectedUser &&
        (isLoading ||
            isPending ||
            isFetching ||
            profilePictureLoading ||
            profilePicturePending ||
            profilePictureFetching);
    const profileAvatarName =
        watch("name") || selectedUser?.name || selectedUser?.employee_name || selectedUser?.username;

    useEffect(() => {
        if (!selectedUser) return;

        reset(getDefaults(selectedUser));
        setPersonalInfoId(String(selectedUser.id ?? ""));
        setCurrentProfilePic(
            selectedUser?.profile?.profile_pic || selectedUser?.profile_photo || ""
        );
    }, [selectedUser, reset]);

    useEffect(() => {
        if (!selectedProfilePicture) return;

        setProfilePhotoId(String(selectedProfilePicture.id ?? ""));
        setCurrentProfilePic((current) => selectedProfilePicture.profile_pic || current);
    }, [selectedProfilePicture]);

    useEffect(() => {
        if (!dateOfBirth) {
            setValue("age", "");
            return;
        }

        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < dob.getDate())
        ) {
            age--;
        }

        setValue("age", age, { shouldValidate: true });
    }, [dateOfBirth, setValue]);

    const validateProfileFile = (file: File) => {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            toast.error("Please upload a JPEG, PNG, or WEBP image.");
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {
            toast.error("Profile photo must be less than 5MB.");
            return false;
        }

        return true;
    };

    const handleProfileFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file || !validateProfileFile(file)) {
            event.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setTempProfileSrc(reader.result as string);
            setShowProfileCropper(true);
        };
        reader.readAsDataURL(file);
        event.target.value = "";
    };

    const handleProfileCropComplete = (croppedImage: string) => {
        const croppedFile = base64ToFile(croppedImage, "profile_pic.png");

        setProfilePreview(croppedImage);
        setProfileFile(croppedFile);
        setTempProfileSrc("");
        setShowProfileCropper(false);
    };

    const appendIfNotEmpty = (formData: FormData, key: string, value: any) => {
        if (value !== null && value !== undefined && value !== "") {
            formData.append(key, value);
        }
    };

    const submitInfo = async (info: Inputs) => {
        if (!selectedUser || !personalInfoId) {
            toast.error("User data is not available. Please try again.");
            return;
        }

        if (profileFile && !profilePhotoId) {
            toast.error("Profile picture data is not available. Please try again.");
            return;
        }

        const formData = new FormData();

        appendIfNotEmpty(formData, "name", info.name);
        appendIfNotEmpty(formData, "email", info.email);
        appendIfNotEmpty(formData, "phone", info.phone);
        appendIfNotEmpty(formData, "preferred_work_location", info.preferred_work_location);
        appendIfNotEmpty(formData, "available_work_hours", info.available_work_hours);
        appendIfNotEmpty(formData, "about", info.about);
        appendIfNotEmpty(formData, "job_title", info.job_title);
        appendIfNotEmpty(formData, "date_of_birth", info.date_of_birth);
        appendIfNotEmpty(formData, "age", info.age);
        appendIfNotEmpty(formData, "gender", info.gender);

        try {
            if (profileFile) {
                const profileFormData = new FormData();
                profileFormData.append("profile_pic", profileFile);
                profileFormData.append("cover_photo", "");

                const profileResponse = await editProfilePicture({
                    formData: profileFormData,
                    id: profilePhotoId,
                });

                if (!isSuccessfulResponse(profileResponse)) {
                    toast.error("Something went wrong while updating your profile picture.");
                    return;
                }
            }

            const response = await editPersonalInfo({ formData, id: personalInfoId });

            if (isSuccessfulResponse(response)) {
                toast.success("Personal information updated successfully.");
                setProfileFile(null);
                onCompleted?.();
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error: any) {
            toast.error(`An error occurred: ${error?.message ?? "Please try again."}`);
        }
    };

    const selectTheme = (theme: any) => ({
        ...theme,
        borderRadius: 12,
        colors: {
            ...theme.colors,
            primary: "#059669",
            primary25: "#d1fae5",
            primary50: "#a7f3d0",
        },
    });

    const selectStyles = {
        control: (base: any, state: any) => ({
            ...base,
            minHeight: "44px",
            borderRadius: "0.75rem",
            borderColor: state.isFocused ? "#10b981" : "#e5e7eb",
            boxShadow: state.isFocused ? "0 0 0 4px rgb(16 185 129 / 0.12)" : "none",
            "&:hover": {
                borderColor: state.isFocused ? "#10b981" : "#d1d5db",
            },
        }),
        menu: (base: any) => ({ ...base, zIndex: 80 }),
        menuList: (base: any) => ({ ...base, maxHeight: "220px" }),
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!isSaving) onOpenChange(nextOpen);
            }}
        >
            <DialogContent className="w-[calc(100vw-1rem)] max-w-5xl overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-2xl sm:w-[calc(100vw-2rem)] sm:rounded-3xl">
                <div className="max-h-[94vh] overflow-y-auto">
                    <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-slate-900 p-5 text-white sm:p-7">
                        <DialogHeader className="space-y-3 text-left">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                                <UserRound size={26} />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black tracking-normal sm:text-3xl">
                                    Complete your personal info
                                </DialogTitle>
                                <DialogDescription className="mt-2 max-w-2xl text-sm font-medium leading-6 text-emerald-50">
                                    Fill the missing details here and continue your job application without leaving this page.
                                </DialogDescription>
                            </div>
                        </DialogHeader>
                    </div>

                    {isFormLoading || isError ? (
                        <ProfileCompletionModalSkeleton />
                    ) : (
                        <form onSubmit={handleSubmit(submitInfo)} className="p-4 sm:p-6">
                            <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
                                <aside className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                                    <div className="text-sm font-bold text-gray-950">
                                        Profile picture
                                    </div>
                                    <p className="mt-1 text-xs font-medium leading-5 text-gray-500">
                                        Add a clear photo so employers can recognize your profile.
                                    </p>

                                    <div className="mt-5 flex flex-col items-center">
                                        <div className="relative">
                                            <ProfileAvatar
                                                src={profilePreview || currentProfilePic}
                                                name={profileAvatarName}
                                                alt="Profile"
                                                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                                                textClassName="text-4xl"
                                            />
                                            <label
                                                htmlFor="apply-profile-photo"
                                                className="absolute -bottom-1 -right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
                                            >
                                                <Camera size={18} />
                                                <span className="sr-only">Upload profile picture</span>
                                            </label>
                                        <input
                                            id="apply-profile-photo"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="hidden"
                                            onChange={handleProfileFileUpload}
                                        />
                                        </div>

                                        <label
                                            htmlFor="apply-profile-photo-secondary"
                                            className="mt-5 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 text-sm font-bold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
                                        >
                                            <UploadCloud size={16} />
                                            Upload photo
                                        </label>
                                        <input
                                            id="apply-profile-photo-secondary"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="hidden"
                                            onChange={handleProfileFileUpload}
                                        />
                                    </div>

                                    {showProfileCropper && tempProfileSrc && (
                                        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                                            <div className="mb-3 text-sm font-bold text-gray-900">
                                                Crop your photo
                                            </div>
                                            <ImageCropper
                                                src={tempProfileSrc}
                                                aspectRatio={1}
                                                onCrop={(croppedImage) => setProfilePreview(croppedImage)}
                                                onCropComplete={handleProfileCropComplete}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowProfileCropper(false);
                                                    setTempProfileSrc("");
                                                }}
                                                className="mt-3 h-9 w-full rounded-xl border border-gray-200 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                                            >
                                                Cancel crop
                                            </button>
                                        </div>
                                    )}
                                </aside>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField label="Name" error={errors.name?.message} required>
                                        <input
                                            id="apply-profile-name"
                                            type="text"
                                            autoComplete="given-name"
                                            required
                                            {...register("name", { required: "Name is required" })}
                                            className={cn(inputClassName, errors.name && "border-red-300 focus:border-red-500 focus:ring-red-100")}
                                        />
                                    </FormField>

                                    <FormField label="Email address" error={errors.email?.message} required>
                                        <input
                                            id="apply-profile-email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                    message: "Please enter a valid email address",
                                                },
                                            })}
                                            className={cn(inputClassName, errors.email && "border-red-300 focus:border-red-500 focus:ring-red-100")}
                                        />
                                    </FormField>

                                    <FormField label="Phone number" error={errors.phone?.message} required>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            rules={{
                                                required: "Phone number is required",
                                                maxLength: {
                                                    value: 13,
                                                    message: "Phone number cannot exceed 10 digits",
                                                },
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <PhoneInput
                                                    international
                                                    defaultCountry="IN"
                                                    value={value}
                                                    onChange={onChange}
                                                    className={cn(
                                                        inputClassName,
                                                        "items-center",
                                                        errors.phone && "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
                                                    )}
                                                />
                                            )}
                                        />
                                    </FormField>

                                    <FormField label="Available work hours" error={errors.available_work_hours?.message} required>
                                        <div className="relative">
                                            <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <input
                                                id="apply-profile-work-hours"
                                                min={1}
                                                max={24}
                                                type="number"
                                                autoComplete="off"
                                                required
                                                {...register("available_work_hours", {
                                                    required: "Available work hours is required",
                                                    min: { value: 1, message: "Hours must be between 1 and 24" },
                                                    max: { value: 24, message: "Hours must be between 1 and 24" },
                                                })}
                                                className={cn(inputClassName, "pl-9", errors.available_work_hours && "border-red-300 focus:border-red-500 focus:ring-red-100")}
                                            />
                                        </div>
                                    </FormField>

                                    <FormField label="Date of birth" error={errors.date_of_birth?.message} required>
                                        <input
                                            id="apply-profile-date-of-birth"
                                            type="date"
                                            autoComplete="off"
                                            required
                                            {...register("date_of_birth", { required: "Date of birth is required" })}
                                            className={cn(inputClassName, errors.date_of_birth && "border-red-300 focus:border-red-500 focus:ring-red-100")}
                                        />
                                    </FormField>

                                    <FormField label="Age" error={errors.age?.message} required>
                                        <input
                                            id="apply-profile-age"
                                            min={14}
                                            readOnly
                                            type="number"
                                            autoComplete="off"
                                            required
                                            {...register("age", {
                                                required: "Age is required",
                                                min: { value: 14, message: "Must be 14 or older" },
                                            })}
                                            className={cn(inputClassName, "bg-slate-50 text-gray-500", errors.age && "border-red-300")}
                                        />
                                    </FormField>

                                    <FormField label="Gender" error={errors.gender?.message} required>
                                        <select
                                            required
                                            {...register("gender", { required: "Gender is required" })}
                                            className={cn(inputClassName, errors.gender && "border-red-300 focus:border-red-500 focus:ring-red-100")}
                                        >
                                            <option value="" disabled>
                                                Select your gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </FormField>

                                    <FormField label="Job title" error={errors.job_title?.message} required>
                                        <Controller
                                            name="job_title"
                                            rules={{ required: "Job title is required" }}
                                            control={control}
                                            render={({ field: { onChange, value, ref } }) => (
                                                <Select
                                                    ref={ref}
                                                    options={jobTitles}
                                                    value={value ? jobTitles?.find((option: Option) => option.label === value) : null}
                                                    onChange={(selectedOption) => onChange(selectedOption?.label)}
                                                    placeholder="Search your job title"
                                                    isSearchable
                                                    isClearable
                                                    isLoading={jobTitleLoading || jobTitlePending}
                                                    classNamePrefix="select"
                                                    theme={selectTheme}
                                                    styles={selectStyles}
                                                    menuPlacement="auto"
                                                    menuShouldScrollIntoView={false}
                                                />
                                            )}
                                        />
                                    </FormField>

                                    <div className="sm:col-span-2">
                                        <FormField label="Preferred work location" error={errors.preferred_work_location?.message} required>
                                            <div className="relative">
                                                <MapPin className="pointer-events-none absolute left-3 top-[14px] z-10 h-4 w-4 text-gray-400" />
                                                <Controller
                                                    name="preferred_work_location"
                                                    control={control}
                                                    rules={{ required: "Work location is required" }}
                                                    render={({ field: { onChange, value, ref } }) => {
                                                        const selectedOption =
                                                            locations?.find((option: Option) => option?.label === value) ||
                                                            (value ? { label: value, value } : null);

                                                        return (
                                                            <Select
                                                                ref={ref}
                                                                options={locations}
                                                                value={selectedOption}
                                                                onChange={(option: any) => onChange(option?.label || null)}
                                                                onInputChange={(searchValue) => setSearch(searchValue)}
                                                                placeholder="Search for a location"
                                                                isSearchable
                                                                loadingMessage={() => "Loading..."}
                                                                isLoading={locationLoading}
                                                                noOptionsMessage={() => "No locations found"}
                                                                classNamePrefix="select"
                                                                theme={selectTheme}
                                                                styles={{
                                                                    ...selectStyles,
                                                                    control: (base: any, state: any) => ({
                                                                        ...selectStyles.control(base, state),
                                                                        paddingLeft: "1.75rem",
                                                                    }),
                                                                }}
                                                                menuPlacement="auto"
                                                                menuShouldScrollIntoView={false}
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </FormField>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <FormField label="About you" error={errors.about?.message} required>
                                            <textarea
                                                id="apply-profile-about"
                                                rows={4}
                                                required
                                                {...register("about", { required: "This field is required" })}
                                                className={cn(
                                                    "w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100",
                                                    errors.about && "border-red-300 focus:border-red-500 focus:ring-red-100"
                                                )}
                                                placeholder="Describe yourself"
                                            />
                                        </FormField>
                                    </div>
                                </div>
                            </div>

                            <div className="sticky bottom-0 -mx-4 mt-6 flex flex-col gap-3 border-t border-gray-100 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:flex-row sm:items-center sm:justify-end sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => reset(getDefaults(selectedUser))}
                                    disabled={isSaving}
                                    className="h-11 rounded-xl border border-gray-200 px-5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                                >
                                    Reset fields
                                </button>
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="h-11 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white hover:bg-emerald-700 sm:min-w-48"
                                >
                                    {isSaving ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <CheckCircle2 />
                                    )}
                                    Save and continue
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function FormField({
    label,
    error,
    required = false,
    children,
}: {
    label: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
}) {
    return (
        <div>
            <div className="mb-1.5 flex min-h-5 items-center justify-between gap-2">
                <label className="text-sm font-bold text-gray-900">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
                {error && (
                    <span className="text-right text-xs font-bold text-red-600">
                        {error}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}

function ProfileCompletionModalSkeleton() {
    return (
        <div className="grid animate-pulse gap-5 p-4 sm:p-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="h-4 w-28 rounded-full bg-gray-200" />
                <div className="mx-auto mt-8 h-28 w-28 rounded-full bg-gray-200" />
                <div className="mx-auto mt-5 h-10 w-36 rounded-xl bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index}>
                        <div className="mb-2 h-4 w-28 rounded-full bg-gray-200" />
                        <div className="h-11 rounded-xl bg-gray-200" />
                    </div>
                ))}
                <div className="sm:col-span-2">
                    <div className="mb-2 h-4 w-28 rounded-full bg-gray-200" />
                    <div className="h-24 rounded-xl bg-gray-200" />
                </div>
            </div>
        </div>
    );
}
