import gql from 'graphql-tag';

export const createPost = gql`
    mutation createPost($content: String!) {
        createPost(input: {
            content: $content
        }) {
            postId
            content
            created
            author {
                userId
                username
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

// export const deletePost = gql`1