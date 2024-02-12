"use client"

import { useOrganization } from "@clerk/nextjs"



export const Info = () => {
    const {organization, isLoaded} = useOrganization()

    if (!isLoaded) {
        return( <p>Loading...</p>)
    }
    return(
        <div className="flex items-center gap-x-4">
            
        </div>
    )
}