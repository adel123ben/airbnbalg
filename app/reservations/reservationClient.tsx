"use client";

import React from "react";
import { SafeReservation, SafeUser } from "../types";
import {toast} from "react-hot-toast";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


import Heading from "@/components/modals/heading";
import Container from "@/components/container";
import ListingCard from "@/components/listings/listingsCard";

interface ReservationsClientProps {
    currentUser?: SafeUser | null;
    reservations: SafeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
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
        <Heading title="Reservations" subtitle="bookings on your properties" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation) => (
                <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Cancel guest Reservation"
                    currentUser={currentUser}
                />
            ))}
        </div>
       </Container>
     );
}
 
export default ReservationsClient;