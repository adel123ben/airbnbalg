
import EmptyState from "@/components/emptyState";

import getCurrentUser from "../actions/getCurentUser";
import getFavoritesListing from "../actions/getFavoritesListing";
import FavoritesClient from "./favoritesClient";

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        );
    }

    const listings = await getFavoritesListing();
    if (listings.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings"
            />
        );
    }
    return ( 
        <div className="mt-16">
           <FavoritesClient currentUser={currentUser} listings={listings} />
        </div>
     );
}
 
export default FavoritesPage;