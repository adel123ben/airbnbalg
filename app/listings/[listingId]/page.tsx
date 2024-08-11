import getListigsById from "@/app/actions/getListigsById";
import EmptyState from "@/components/emptyState";
import getCurrentUser from "@/app/actions/getCurentUser";
import ListingsClient from "./listingsClient";
import { SafeUser } from "@/app/types";
import getReservation from "@/app/actions/getReservation";



interface IParams {
    listingId?: string
}

const ListigsPage  = async ({params}: {params: IParams}) => {
    const listing   = await getListigsById(params);
    const reservation = await getReservation(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return(
            <EmptyState title="No listing found" subtitle="Looks like you got lost" />
        )
    }


    return ( 
       <div className="mt-16">
         
      <ListingsClient reservation={reservation} listing={listing} currentUser={currentUser}  />
    
       </div>
     );
}
 
export default ListigsPage;