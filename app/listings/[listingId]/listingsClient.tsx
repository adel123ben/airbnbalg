"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Container from "@/components/container";
import LinstigHead from "@/components/listings/listingHead";
import LinstingInfo from "@/components/listings/listingInfo";
import { categories } from "@/components/navbar/categories";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingsReservation from "@/components/listings/listingReservation";
import { Range } from "react-date-range";


const initialDateRage = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
}

interface ListingsClientProps {
    reservation?: SafeReservation[];
    listing:SafeListing | any & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingsClient: React.FC<ListingsClientProps> = ({
    listing,
    currentUser,
    reservation = []
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disableDate = useMemo(() => {
        let dates: Date[] = []

        reservation.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range]
        });


        return dates;
    }, [reservation]);

    const [isloading, setisLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRage);

    const onCreateReservation = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        setisLoading(true)

        axios.post('/api/reservation', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success('listing Reserved!');
            setDateRange(initialDateRage);

            router.push("/trips");
        })
        .catch(() => {
            toast.error("somthig went worng!");
        })
        .finally(() => {
            setisLoading(false);
        })
        
        
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if(dayCount && listing.price){
               setTotalPrice(dayCount * listing.price) 
            }else{
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price]);


    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);
    return ( 
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <LinstigHead id={listing.id} currentUser={currentUser} locationValue={listing.locationValue} title={listing.title} imgeSrc={listing.imageSrc} />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <LinstingInfo 
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingsReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(values) => setDateRange(values)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disable={isloading}
                            disableDate={disableDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
     );
}
 
export default ListingsClient;