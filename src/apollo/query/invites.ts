import gql from 'graphql-tag';
import { UserFragment, InviteCodeFragment } from '/~/apollo/fragments';

export const GET_INVITES = gql`
    query Invites {
        invites {
            next
            count
            hasNextPage
            nodes {
                ...InviteCodeFragment
            }
        }
    }
    ${InviteCodeFragment}
`;

