// import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurentUser";

export default async function getFavoritesListing() {
    try{
        const currentUser = await getCurrentUser();
    if (!currentUser) {
        return [];
    }

    const favorites = await prisma.listing.findMany({
        where: {
            id: {
                in: [...(currentUser.favoritesIds || [])],
            },
        },
    });

    const safeFavorites = favorites.map((favorite) => ({
        ...favorite,
        createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
    }catch(error: any) {
        throw new Error(error);
    }
}