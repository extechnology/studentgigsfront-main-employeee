import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
    src?: string | null;
    name?: string | null;
    alt?: string;
    className?: string;
    textClassName?: string;
}

const avatarColors = [
    "from-emerald-500 to-teal-600",
    "from-sky-500 to-blue-600",
    "from-fuchsia-500 to-rose-500",
    "from-amber-400 to-orange-500",
    "from-violet-500 to-indigo-600",
    "from-cyan-500 to-emerald-500",
];

const getFirstCharacter = (name?: string | null) => {
    const trimmedName = name?.trim();
    return trimmedName ? Array.from(trimmedName)[0].toUpperCase() : "U";
};

const getColorClassName = (name?: string | null) => {
    const value = name?.trim() || "User";
    const hash = Array.from(value).reduce(
        (total, character) => total + character.charCodeAt(0),
        0
    );

    return avatarColors[hash % avatarColors.length];
};

export default function ProfileAvatar({
    src,
    name,
    alt = "User profile",
    className,
    textClassName,
}: ProfileAvatarProps) {
    const imageSrc = src?.trim() || "";
    const [imageFailed, setImageFailed] = useState(false);
    const firstCharacter = getFirstCharacter(name);
    const colorClassName = useMemo(() => getColorClassName(name), [name]);

    useEffect(() => {
        setImageFailed(false);
    }, [imageSrc]);

    if (imageSrc && !imageFailed) {
        return (
            <img
                src={imageSrc}
                loading="lazy"
                alt={alt}
                onError={() => setImageFailed(true)}
                className={cn("rounded-full object-cover", className)}
            />
        );
    }

    return (
        <div
            aria-label={alt}
            className={cn(
                "flex select-none items-center justify-center rounded-full bg-gradient-to-br font-black uppercase text-white ring-1 ring-black/5",
                colorClassName,
                className
            )}
        >
            <span className={cn("leading-none", textClassName)}>
                {firstCharacter}
            </span>
        </div>
    );
}
