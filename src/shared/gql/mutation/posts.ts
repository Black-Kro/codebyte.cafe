import gql from 'graphql-tag';

export const createPost = gql`
    mutation createPost($content: String, $media: [String]) {
        createPost(input: {
            content: $content,
            media: $media
        }) {
            postId
            content
            created
            postMedia {
                mediaId
                path
            }
            author {
                userId
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

export const deletePost = gql`
    mutation deletePost($postId: Uuid!) {
        deletePost(input: { postId: $postId })
    }
`;