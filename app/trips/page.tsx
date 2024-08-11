import EmptyState from "@/components/emptyState";
import getCurrentUser from "../actions/getCurentUser";

import getReservation from "../actions/getReservation";
import TripsClient from "./tripClient";



const TripsPage = async () => {
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
        userId: currentUser.id
    });

    if(reservation.length === 0) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you havent reserved any trips"
            />
        )
    }
    return (
        <div className="mt-16">
            <TripsClient currentUser={currentUser} reservations={reservation} />
        </div>
     );

}
 
export default TripsPage;