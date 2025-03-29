import React, { useRef, useEffect } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { Save } from "lucide-react";
import { Button } from "../ui/button";

interface ImageCropperProps {
    src: string;
    onCrop: (croppedImage: string) => void;
    onCropComplete: (croppedImage: string) => void; // New prop to trigger form submission
    aspectRatio?: number;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ src, onCrop, onCropComplete, aspectRatio = 16 / 9 }) => {

    
    const imageRef = useRef<HTMLImageElement>(null);
    const cropperRef = useRef<Cropper>();

    useEffect(() => {
        if (imageRef.current) {
            cropperRef.current = new Cropper(imageRef.current, {
                aspectRatio,
                viewMode: 1,
                autoCropArea: 1,
            });
        }

        return () => {
            cropperRef.current?.destroy();
        };
    }, [src]);

    const handleCrop = () => {
        if (cropperRef.current) {
            const canvas = cropperRef.current.getCroppedCanvas();
            const croppedImage = canvas.toDataURL();
            onCrop(croppedImage);
            onCropComplete(croppedImage); // Trigger submitProfileData here
        }
    };

    return (
        <div>
            <div className="max-h-[60vh] overflow-hidden">
                <img ref={imageRef} src={src} alt="Cropper" className="max-w-full" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    onClick={handleCrop}
                    className=" text-white px-4 py-2 rounded-lg flex items-center"
                >
                    Save Changes <Save className="ml-2" size={24} />
                </Button>
            </div>
        </div>
    );
};

export default ImageCropper;
