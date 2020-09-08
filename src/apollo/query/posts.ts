import gql from 'graphql-tag';
import { PostFragment, ReactionFragment } from '/~/apollo/fragments';

export const GET_POST = gql`
    query Post($id: String!) {
        post(id: $id) {
            ...PostFragment
        }
    }
    ${PostFragment}
`;

export const GET_POSTS = gql`
    query Posts(
        $after: String, 
        # $take: Int = 10,
        $id: String, 
        $username: String, 
        $parent: String, 
        $replies: Boolean! = false) {
        
        posts(
            after: $after, 
            take: 10, 
            id: $id, 
            username: $username, 
            parent: $parent) {

            next
            hasNextPage
            nodes {
                ...PostFragment
                children @include(if: $replies) {
                    ...PostFragment
                    children {
                        ...PostFragment
                    }
                }
            }
        }
    },
    ${PostFragment}
`;

export const GET_NEW_POSTS = gql`
    subscription Posts {
        newPosts {
            ...PostFragment,
        }
    }
    ${PostFragment}
`;

export const GET_REACTIONS = gql`
    query Reactions($id: String) {
        reactions(id: $id) {
            ...ReactionFragment
        }
    }
    ${ReactionFragment}
`;