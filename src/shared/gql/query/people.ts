import gql from 'graphql-tag';

export const getPeople = gql`
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
                }
            }
        }
    }
`;

export const getMe = gql`
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
                links {
                    id
                    link
                    service
                }
            }
        }
    }
`;