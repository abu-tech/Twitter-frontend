import { graphql } from "@/gql";

export const createTweetMutation = graphql(`
    mutation CreateTweet($payload: createTweetData!) {
        createTweet(payload: $payload) {
            id
        }
    }
`)

export const deleteImageMutation = graphql(`
    mutation DeleteImageFromS3($imageKey: String!) {
        deleteImageFromS3(imageKey: $imageKey)
    }
`)