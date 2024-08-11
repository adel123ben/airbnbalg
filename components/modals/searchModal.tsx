"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./modale";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Calendar, Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrieSelect, { CountrySelectValue } from "../input/countriesSelect";
import qs from "query-string";
import {formatISO} from "date-fns";
import Heading from "./heading";
import Calender from "../input/calender";
import Counter from "../input/counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    });

    const Map = useMemo(() => dynamic(() => import('../map'), {
        ssr: false
    }), [location]);


    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            bathroomCount,
            roomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: updatedQuery,
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [ 
        step, 
        searchModal, 
        location, 
        router, 
        guestCount, 
        bathroomCount, 
        roomCount, 
        dateRange, 
        onNext, 
        params]);

        const actionLabel = useMemo(() => {
            if (step === STEPS.INFO) {
                return "Search";
            }
            return "Next";
        }, [step]);

        const secondaryActionLabel = useMemo(() => {
            if (step === STEPS.LOCATION) {
                return undefined;
            }
            return "Back";
        }, [step]);

        let bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where do you wanna go?"
                    subtitle="Find the perfect location"
                />
                <CountrieSelect
                    value={location}
                    onChange={(value) => setLocation(value as CountrySelectValue)}
                />
                <hr />
                <Map center={location?.latlng} />
            </div>
        );

        if (step === STEPS.DATE) {
            bodyContent = (
                <div className="flex flex-col gap-8">
                    <Heading
                        title="When do you plan to go?"
                        subtitle="Make sure everyone is free!"
                    />
                    <Calender
                        value={dateRange}
                        onChange={(value) => setDateRange(value.selection)}
                    />
                </div>
            );
        }

        if (step === STEPS.INFO) {
            bodyContent = (
                <div className="flex flex-col gap-8">
                    <Heading
                        title="More information"
                        subtitle="What about the details?"
                    />
                    <Counter
                        onChange={(value) => setGuestCount(value)}
                        value={guestCount}
                        title="Guests"
                        subtitle="How many guests are coming?"
                    />
                    <hr />
                    <Counter
                        onChange={(value) => setRoomCount(value)}
                        value={roomCount}
                        title="Rooms"
                        subtitle="How many rooms do you need?"
                    />
                    <hr />
                    <Counter
                        onChange={(value) => setBathroomCount(value)}
                        value={bathroomCount}
                        title="Bathrooms"
                        subtitle="How many bathrooms do you need?"
                    />
                </div>
            );
        }
    return ( 
       <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        body={bodyContent}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
       
       />
     );
}
 
export default SearchModal;