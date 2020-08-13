import gql from 'graphql-tag';

export const getPosts = gql`
    query getPosts($cursor: String) {
        posts(order_by: { created:DESC }, first: 5, after: $cursor) {
            edges {
                cursor
                node {
                    postId
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
            nodes {
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
    }
`;