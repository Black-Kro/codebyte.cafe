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
                liked
                disliked
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
                        headerImageObject {
                            id
                            base64
                            path
                            width
                            height
                        }
                        avatarObject {
                            id
                            base64
                            path
                            width
                            height
                        }
                    }
                }
            }
        }
    }
`;

export const GET_POSTS_BY_USER = gql`
    query getPostsByUser($username: String, $cursor: String) {
        postByUser(order_by: { created:DESC }, first: 5, after: $cursor, input: { username: $username }) {
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
                liked
                disliked
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
                        headerImageObject {
                            id
                            base64
                            path
                            width
                            height
                        }
                        avatarObject {
                            id
                            base64
                            path
                            width
                            height
                        }
                    }
                }
            }
        }
    }
`;