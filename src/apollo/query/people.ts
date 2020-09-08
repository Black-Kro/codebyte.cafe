import gql from 'graphql-tag';
import { UserFragment } from '/~/apollo/fragments';

export const GET_PERSON = gql`
    query Person($id: String, $username: String) {
        user(id: $id, username: $username) {
            ...UserFragment
        }
    },
    ${UserFragment}
`;

export const GET_PEOPLE = gql`
    query People($after: String, $take: Int = 10) {
        users(after: $after, take: $take) {
            next
            hasNextPage
            nodes {
                ...UserFragment
            }
        }
    },
    ${UserFragment}
`;

export const GET_ME = gql`
    query Me {
        me {
            ...UserFragment
        }
    },
    ${UserFragment}
`;
