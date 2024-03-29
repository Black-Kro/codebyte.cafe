import gql from 'graphql-tag';
import { PostFragment } from '/~/apollo/fragments';

export const CREATE_POST = gql`
    mutation CreatePost(
        $content: String, 
        $media: [String!], 
        $giphy: [String!], 
        $parent: String) {
        createPost( input: {
            text: $content,
            media: $media,
            giphy: $giphy,
            parent: $parent
        }) {
            ...PostFragment
            parent {
                ...PostFragment
            }
            children {
                ...PostFragment
            }
        }
    }
    ${PostFragment}
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: String!) {
        deletePost(id: $id)
    }
`;

export const REACT_TO_POST = gql`
    mutation React($id: String!, $reaction: String!) {
        react(id: $id, reaction: $reaction) {
            ...PostFragment
        }
    }
    ${PostFragment}
`;
