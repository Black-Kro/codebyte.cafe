import gql from 'graphql-tag';
import { PostFragment } from '/@app/gql/fragments';

export const CREATE_POST = gql`
    mutation CreatePost($content: String, $media: [String!]) {
        createPost(
            content: $content,
            media: $media
        ) {
            ...PostFragment
        }
    }
    ${PostFragment}
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: String!) {
        deletePost(id: $id) {
            ...PostFragment
        }
    }
    ${PostFragment}
`;

export const REACT_TO_POST = gql`
    mutation ReactToPost($id: String!, $reaction: String!) {
        react(id: $id, reaction: $reaction) {
            ...PostFragment
        }
    }
    ${PostFragment}
`;
