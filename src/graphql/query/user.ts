import { graphql } from "../../../gql";

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