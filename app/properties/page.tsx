import EmptyState from "@/components/emptyState";
import getCurrentUser from "../actions/getCurentUser";


import TripsClient from "./propertiesClient";
import PropertiesClient from "./propertiesClient";
import getListings from "../actions/getListings";



const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if(listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you havent not added any properties!"
            />
        )
    }
    return (
        <div className="mt-16">
            <PropertiesClient currentUser={currentUser} listings={listings} />
        </div>
     );

}
 
export default PropertiesPage;