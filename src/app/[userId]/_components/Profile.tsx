import { IoMdArrowBack } from "react-icons/io"
import Image from "next/image"
import FeedCard from "@/components/FeedCard"
import { Tweet, User } from "@/gql/graphql"
import { graphqlClient } from "@/clients/api"
import { getUserByIdQuery } from "@/graphql/query/user"

const getUserDetails = async (userId: string) => {
    const response = await graphqlClient.request(getUserByIdQuery, { id: userId })

    const userInfo = response.getUserById

    return userInfo
}

async function Profile({ params }: { params: { userId: string } }) {
    const user = await getUserDetails(params.userId)

    return (
        <div>
            <nav className="flex items-center gap-4 px-2 py-1">
                <IoMdArrowBack className="text-4xl hover:bg-gray-800 p-2 rounded-full cursor-pointer transition-all" />
                <div>
                    <h1 className="text-lg font-semibold">{user?.firstName} {user?.lastName}</h1>
                    <p className="text-sm text-gray-600 font-medium">{user?.tweets?.length} tweets</p>
                </div>
            </nav>
            <div className="p-4 border-b border-gray-800">
                <Image className="rounded-full" src={user?.profileImage || ""} width={100} height={100} alt="user-image" />
                <h1 className="text-xl font-semibold mt-5">{user?.firstName} {user?.lastName}</h1>
                <p className="text-sm text-gray-600 mb-3 font-medium mt-1">@{user?.email.split("@")[0]}</p>
            </div>
            <div>
                {user?.tweets?.map((tweet) => (
                    <FeedCard key={tweet?.id} data={tweet as Tweet} />
                ))}
            </div>
        </div>
    )
}

export default Profile