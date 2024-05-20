"use client"

import TwitterLayout from "@/components/TwitterLayout"
import Profile from "./_components/Profile"


function ProfileWrapper({ params }: { params: { userId: string } }) {

    return (
        <TwitterLayout>
            <Profile params={params} />
        </TwitterLayout>
    )
}

export default ProfileWrapper