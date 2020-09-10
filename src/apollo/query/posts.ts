import gql from 'graphql-tag';
import { PostFragment, ReactionFragment } from '/~/apollo/fragments';

export const GET_POST = gql`
    query Post($id: String!) {
        post(id: $id) {
            ...PostFragment
            parent {
                id
                author {
                    username
                }
            }
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
                parent {
                    ...PostFragment
                }
                children @include(if: $replies) {
                    ...PostFragment
                    parent {
                        ...PostFragment
                    }
                    children {
                        ...PostFragment
                        parent {
                            ...PostFragment
                        }
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
            count
            next
            hasNextPage
            nodes {
               ...ReactionFragment    
            }
        }
    }
    ${ReactionFragment}
`;
