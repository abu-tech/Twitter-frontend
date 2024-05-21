"use client"

import TwitterLayout from "@/components/TwitterLayout"
import { IoMdArrowBack } from "react-icons/io"
import Image from "next/image"
import FeedCard from "@/components/FeedCard"
import { Tweet } from "@/gql/graphql"
import { useGetUserById } from "@/hooks/user"


function ProfileWrapper({ params }: { params: { userId: string } }) {

    const { userInfo } = useGetUserById(params.userId)

    return (
        <TwitterLayout>
            <div>
                <nav className="flex items-center gap-4 px-2 py-1">
                    <IoMdArrowBack className="text-4xl hover:bg-gray-800 p-2 rounded-full cursor-pointer transition-all" />
                    <div>
                        <h1 className="text-lg font-semibold">{userInfo?.firstName} {userInfo?.lastName}</h1>
                        <p className="text-sm text-gray-600 font-medium">{userInfo?.tweets?.length} tweets</p>
                    </div>
                </nav>
                <div className="p-4 border-b border-gray-800">
                    <Image className="rounded-full" src={userInfo?.profileImage || ""} width={100} height={100} alt="user-image" />
                    <h1 className="text-xl font-semibold mt-5">{userInfo?.firstName} {userInfo?.lastName}</h1>
                    <p className="text-sm text-gray-600 mb-3 font-medium mt-1">@{userInfo?.email.split("@")[0]}</p>
                </div>
                <div>
                    {userInfo?.tweets?.map((tweet) => (
                        <FeedCard key={tweet?.id} data={tweet as Tweet} />
                    ))}
                </div>
            </div>
        </TwitterLayout>
    )
}

export default ProfileWrapper