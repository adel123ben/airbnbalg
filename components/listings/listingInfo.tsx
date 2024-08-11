"use client";

import useCountrie from "@/app/hooks/useCountrie";
import { SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import AvatarComponets from "../avatar";
import ListigCategory from "./listingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../map'), {
    ssr: false
})

interface LinstingInfoProps {
    user: SafeUser;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    description: string
    roomCount: number
    guestCount: number
    bathroomCount: number
    locationValue: string
}

const LinstingInfo: React.FC<LinstingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue
}) => {
    const {getByValue} = useCountrie();

    const cordinates = getByValue(locationValue)?.latlng;
    return ( 
        <div className="col-span-4 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>
                    Post By {user?.name}
                </div>
                <AvatarComponets src={user?.image}   />
            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <div>
                {guestCount} guests
            </div>
            <div>
                {roomCount} rooms
            </div>
            <div>
                {bathroomCount} bathroom
            </div>
            </div>
          </div>
          <hr />
          {category && (
            <ListigCategory icon={category.icon} label={category.label} description={category.description} />
          )}

          <hr />
          <div className="text-lg font-light text-neutral-500">
            {description}
          </div>
          <hr />
          <Map center={cordinates} />
        </div>
     );
}
 
export default LinstingInfo;