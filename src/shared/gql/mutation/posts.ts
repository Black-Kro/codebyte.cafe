import gql from 'graphql-tag';

export const CREATE_POST = gql`
    mutation createPost($content: String, $media: [String]) {
        createPost(input: {
            content: $content,
            media: $media
        }) {
            id
            content
            created
            likes
            dislikes
            liked
            disliked
            reactions {
                id
                reactType
            }
            postMedia {
                id
                path
                width
                height
                base64
            }
            author {
                id
                username
                verified
                profile {
                    id
                    avatar
                    displayName
                    bio
                }
            }
        }
    }
`;

export const REACT_TO_POST = gql`
    mutation reactToPost($postId: Uuid!, $type: ReactTypeInput!) {
        reactToPost(input: {
            postId: $postId,
            type: $type
        }) {
            id
            likes
            dislikes
            liked
            disliked
            reactions {
                id
                reactType
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($postId: Uuid!) {
        deletePost(input: { postId: $postId })
    }
`;