import gql from 'graphql-tag';

export const createPost = gql`
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
            postMedia {
                id
                path
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

export const reactToPost = gql`
    mutation reactToPost($postId: Uuid!, $type: ReactTypeInput!) {
        reactToPost(input: {
            postId: $postId,
            type: $type
        }) {
            id
            likes
            dislikes
            reactions {
                id
                reactType
            }
            
        }
    }
`;

export const deletePost = gql`
    mutation deletePost($postId: Uuid!) {
        deletePost(input: { postId: $postId })
    }
`;