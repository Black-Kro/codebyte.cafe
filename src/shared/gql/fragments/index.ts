import gql from 'graphql-tag';

export const MediaFragment = gql`
    fragment MediaFragment on Media {
        id
        url
        metadata {
            base64
            width
            height
        }
    }
`;

export const ProfileFragment = gql`
    fragment ProfileFragment on User {
        profile {
            nickname
            bio
            avatar {
                ...MediaFragment
            }
            header {
                ...MediaFragment
            }
        }
    }
    ${MediaFragment}
`;

export const UserFragment = gql`
    fragment UserFragment on User {
        id
        username
        isVerified
        roles
        ...ProfileFragment
    }
    ${ProfileFragment}
`;

export const PostFragment = gql`
    fragment PostFragment on Post {
        id
        text
        media {
            ...MediaFragment
        }
        author {
            ...UserFragment
        }
    }
    ${UserFragment}
    ${MediaFragment}
`;
