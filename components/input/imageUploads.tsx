"use client"

import {CldUploadWidget} from "next-cloudinary"
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])
    return ( 
        <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="edrb8mpo"
        options={{
            maxFiles: 1
        }}>
            {({open}) => {
                return (
                    <div onClick={() => open?.()} className="relative flex  cursor-pointer hover:opacity-70 border-dashed border-2 p-20 border-neutral-300 flex-col justify-center items-center gap-4 text-neutral-600 transition">
                        <TbPhotoPlus size={50}/>
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <img src={value} alt="House" className="w-full h-full object-cover"/>
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
     );
}
 
export default ImageUpload;