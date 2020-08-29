import gql from 'graphql-tag';
import { PostFragment } from '/~/gql/fragments';

export const GET_POST = gql`
    query Post($id: String!) {
        post(id: $id) {
            ...PostFragment
        }
    }
    ${PostFragment}
`;

export const GET_POSTS = gql`
    query Posts($after: String, $id: String, $username: String, $parent: String) {
        posts(after: $after, take: 10, id: $id, username: $username, parent: $parent) {
            next
            hasNextPage
            nodes {
                ...PostFragment
            }
        }
    },
    ${PostFragment}
`;

export const GET_POSTS_WITH_REPLIES = gql`
    query PostsWithReplies($after: String, $id: String, $username: String, $parent: String) {
        posts(after: $after, take: 10, id: $id, username: $username, parent: $parent) {
            next
            hasNextPage
            nodes {
                ...PostFragment
                children {
                    ...PostFragment
                }
            }
        }
    },
    ${PostFragment}
`;