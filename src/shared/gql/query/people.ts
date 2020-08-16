import gql from 'graphql-tag';

export const GET_PEOPLE = gql`
    query getPeople {
        users {
            nodes {
                id
                username
                created
                verified
                profile {
                    id
                    avatar
                    bio
                    displayName
                    headerImage
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
`;

export const GET_ME = gql`
    query getMe {
        me {
            id
            username
            created
            roles
            banDate
            banReason
            banned
            verified
            profile {
                id
                avatar
                bio
                displayName
                headerImage
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
                links {
                    id
                    link
                    service
                }
            }
        }
    }
`;

export const GET_USER_FROM_NAME = gql`
    query userFromName($username: String) {
        userFromName(input: { username: $username }) {
            id
            username
            created
            verified
            profile {
                id
                avatar
                bio
                displayName
                headerImage
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
`;