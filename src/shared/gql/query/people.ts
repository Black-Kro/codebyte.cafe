import gql from 'graphql-tag';

export const getPeople = gql`
    query getPeople {
        users {
            nodes {
                userId
                username
                created
                verified
                profile {
                    id
                    avatar
                    bio
                    displayName
                    headerImage
                }
            }
        }
    }
`;

export const getMe = gql`
    query getMe {
        me {
            userId
            username
            created
            roles
            banDate
            banReason
            banned
            verified
            profile {
                avatar
                bio
                displayName
                headerImage
                id
                links {
                    id
                    link
                    service
                }
            }
        }
    }
`;