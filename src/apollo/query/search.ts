import gql from 'graphql-tag';
import { UserFragment } from '/~/apollo/fragments';

export const SEARCH_USERS = gql`
    query Search($query: String!) {
        search(query: $query) {
            nodes {
                ...UserFragment
            }
        }
    }
    ${UserFragment}
`;
