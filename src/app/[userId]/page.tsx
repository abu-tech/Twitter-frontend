"use client"

import TwitterLayout from "@/components/TwitterLayout"
import { IoMdArrowBack } from "react-icons/io"
import Image from "next/image"
import FeedCard from "@/components/FeedCard"
import { Tweet } from "@/gql/graphql"
import { useCurrentUser, useGetUserById } from "@/hooks/user"
import { useCallback, useMemo } from "react"
import { graphqlClient } from "@/clients/api"
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user"
import { useQueryClient } from "@tanstack/react-query"


function ProfileWrapper({ params }: { params: { userId: string } }) {

    const { userInfo } = useGetUserById(params.userId)
    const { user } = useCurrentUser()
    const queryClient = useQueryClient()

    const amIFollowing = useMemo(() => {
        return (user?.following?.findIndex(el => el?.id === userInfo?.id) ?? -1) >= 0
    }, [user, user?.following, userInfo])


    const handelFollow = useCallback(async () => {
        if (!userInfo?.id) return

        await graphqlClient.request(followUserMutation, { to: userInfo?.id })
        await queryClient.invalidateQueries({ queryKey: ["current-user"] })
        await queryClient.invalidateQueries({ queryKey: ["user-info", userInfo.id] })


    }, [userInfo?.id, queryClient])

    const handelUnfollow = useCallback(async () => {
        if (!userInfo?.id) return

        await graphqlClient.request(unfollowUserMutation, { to: userInfo?.id })
        await queryClient.invalidateQueries({ queryKey: ["current-user"] })
        await queryClient.invalidateQueries({ queryKey: ["user-info", userInfo.id] })

    }, [userInfo?.id, queryClient])

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
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <span className="text-sm text-gray-600 font-medium mt-1">{userInfo?.followers?.length} Followers</span>
                            <span className="text-sm text-gray-600 font-medium mt-1">{userInfo?.following?.length} Following</span>
                        </div>
                        {
                            (user?.id !== userInfo?.id) && (
                                <>
                                    {
                                        amIFollowing ?
                                            <button onClick={handelUnfollow} className="bg-transparent border-[1px] border-gray-800 rounded-full py-1 px-5 font-semibold text-base group hover:bg-[#260f0f85] hover:border-red-600 transition-all">
                                                <span className="group-hover:hidden">Following</span>
                                                <span className="hidden group-hover:block text-red-600">Unfollow</span>
                                            </button> :
                                            <button onClick={handelFollow} className="bg-[#cce6ec] rounded-full py-1 px-5 text-[#0f1419] font-semibold text-base hover:bg-[#cce6ecf0] transition-all">Follow</button>
                                    }
                                </>
                            )
                        }
                    </div>
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