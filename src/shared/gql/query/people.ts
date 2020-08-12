import gql from 'graphql-tag';

export const getPeople = gql`
    query getPeople {
        users {
            userId
            username
            created
            profile {
                id
                avatar
                bio
                displayName
                headerImage
            }
        }
    }
`;

export const getMe = gql`
    query getMe {
        me {
            userId
            username
            email
            created
            roles
            banDate
            banReason
            banned
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