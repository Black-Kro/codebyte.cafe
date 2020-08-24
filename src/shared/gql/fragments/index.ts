import gql from 'graphql-tag';

export const MediaFragment = gql`
    fragment MediaFragment on MediaType {
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
    fragment ProfileFragment on UserType {
        profile {
            displayName
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
    fragment UserFragment on UserType {
        id
        username
        verified
        roles
        ...ProfileFragment
    }
    ${ProfileFragment}
`;

export const PostFragment = gql`
    fragment PostFragment on PostType {
        id
        content
        postMedia {
            ...MediaFragment
        }
        author {
            ...UserFragment
        }
    }
    ${UserFragment}
    ${MediaFragment}
`;
