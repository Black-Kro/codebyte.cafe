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
        created
        ...ProfileFragment
    }
    ${ProfileFragment}
`;

export const PostFragment = gql`
    fragment PostFragment on Post {
        id
        text
        created
        level
        childCount
        isMyPost
        likes
        dislikes
        liked
        disliked
        parent
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

export const InviteCodeFragment = gql`
    fragment InviteCodeFragment on UserInviteCode {
        id
        code
        initialRoles
        used
        usedAt
        createdBy {
            ...UserFragment
        }
        createdAt
    }
    ${UserFragment}
`;