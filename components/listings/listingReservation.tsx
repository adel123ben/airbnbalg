"use client";

import React from "react";

import {Range} from "react-date-range"
import Calender from "../input/calender";
import Button from "../Button";

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disable?: boolean ;
    disableDate: Date[];
}

const ListingsReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disable,
    disableDate
}) => {

    
    return ( 
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    $ {price}
                </div>
                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>
            <hr />
            <Calender
            value={dateRange}
            disableDate={disableDate}
            onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button disabled={disable} label="Reserve" onClick={onSubmit} />
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>
                    Total
                </div>
                <div>
                    $ {totalPrice}
                </div>
            </div>
        </div>
     );
}
 
export default ListingsReservation;