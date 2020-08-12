import gql from 'graphql-tag';

export const getPosts = gql`
    query getPosts {
        posts(order_by: { created:DESC }) {
            nodes {
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
    }
`;