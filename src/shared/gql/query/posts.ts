import gql from 'graphql-tag';

export const GET_POSTS = gql`
    query getPosts($cursor: String) {
        posts(order_by: { created:DESC }, first: 5, after: $cursor) {
            edges {
                cursor
                node {
                    id
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
            nodes {
                id
                content
                created
                likes
                dislikes
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
    }
`;