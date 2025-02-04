"use client";

import React, { useCallback, useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import Container from "@/components/container";
import Heading from "@/components/modals/heading";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/components/listings/listingsCard";


interface TripsClientProps {
    currentUser?: SafeUser | null;
    reservations: SafeReservation[];
}

const TripsClient: React.FC<TripsClientProps> = ({
    currentUser,
    reservations
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservation/${id}`)
        .then(() => {
            toast.success("Reservation Cancelled");
            router.refresh();
        })
        .catch((error) => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setDeletingId("");
        })
    }, [router]);
    return ( 
        <Container>
            <Heading title="Trips" subtitle="Where you've been and where you're going" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel Guest Reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
     );
}
 
export default TripsClient;