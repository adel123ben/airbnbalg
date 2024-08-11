"use client";

import useCountrie from "@/app/hooks/useCountrie";
import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../modals/heading";
import HeartButton from "../heartButton";

interface ListigHeadProps {
    title: string;
    locationValue: string;
    imgeSrc: string;
    id: string
    currentUser?: SafeUser | null;
}


const LinstigHead: React.FC<ListigHeadProps> = ({
    title,
    locationValue,
    imgeSrc,
    id,
    currentUser
}) => {
    const {getByValue}  = useCountrie();

    const location = getByValue(locationValue)
    return ( 
        <>
        <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <img className="object-cover w-full" src={imgeSrc} alt="" />

            <div className="absolute top-5 right-5">
                <HeartButton listingId={id} currentUser={currentUser} />
            </div>
        </div>
        </>
     );
}
 
export default LinstigHead;