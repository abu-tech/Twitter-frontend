import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
    query GetAllTweets {
        getAllTweets {
            id
            content
            imageURL
            author {
                id
                firstName
                lastName
                profileImage
            }
            createdAt
        }
    }
`)

export const getSignedUrlQuery = graphql(`
    query getPresignedURL($imageType: String!) {
        getPresignedURL(imageType: $imageType)
    }
`)
