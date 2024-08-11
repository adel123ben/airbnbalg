
import EmptyState from "@/components/emptyState";

import getCurrentUser from "../actions/getCurentUser";
import getReservation from "../actions/getReservation";
import ReservationsClient from "./reservationClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const reservation = await getReservation({
        authorId: currentUser.id
    });

    if(reservation.length === 0) {
        return (
            <EmptyState
                title="No Reservations found"
                subtitle="You have no reservations on your properties!"
            />
        )
    }
    return ( 
        <div className="mt-16">
            <ReservationsClient currentUser={currentUser} reservations={reservation}  />
        </div>
     );
}
 
export default ReservationsPage;