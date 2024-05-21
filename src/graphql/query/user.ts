import { graphql } from "@/gql";

export const verifyGoogleTokenQuery = graphql(`
    query verifyGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`)

export const getCurrentUserQuery = graphql(`
    query GetCurrentUser {
        getCurrentUser {
            id
            firstName
            lastName
            email
            profileImage
        }
  }`)

export const getUserByIdQuery = graphql(`
    query GetUserById($id: ID!) {
        getUserById(id: $id) {
            email
            firstName
            lastName
            profileImage
            tweets {
                content
                imageURL
                id
                author {
                    id
                    firstName
                    lastName
                    profileImage
                }
            }
        }
  }
  `)