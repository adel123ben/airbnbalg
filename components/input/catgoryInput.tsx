"use client";

import { IconType } from "react-icons";

interface CatgoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CatgoryInput: React.FC<CatgoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
    return ( 
        <div onClick={() => onClick(label)} className={`rounded-xl border-2 p-4 flex flex-col  gap-3 hover:border-black transition cursor-pointer ${selected ? "border-black" : "border-neutral-200"}`}>
            <Icon size={30} color={selected ? "black" : "gray"} />
            <div className={`font-semibold ${selected ? "text-black" : "text-neutral-400"}`}>
                {label}
            </div>
        </div>
     );
}
 
export default CatgoryInput;