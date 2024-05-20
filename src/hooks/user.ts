import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"


export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: () => graphqlClient.request(getCurrentUserQuery)
    })

    return { ...query, user: query.data?.getCurrentUser }
}

export const useGetUserById = (userId: string) => {
    const query = useQuery({
        queryKey: ["user-info"],
        queryFn: () => graphqlClient.request(getUserByIdQuery, { id: userId })
    })

    return { ...query, userInfo: query.data?.getUserById }
}