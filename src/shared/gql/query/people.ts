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