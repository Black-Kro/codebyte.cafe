import gql from 'graphql-tag';
import { InviteCodeFragment } from '/~/apollo/fragments';

export const CREATE_INVITES = gql`
    mutation CreateInvites($codesCount: Float, $initialRoles: [String]) {
        generateInviteCode(codesCount: $codesCount, initialRoles: $initialRoles) {
            ...InviteCodeFragment
        }
    }
    ${InviteCodeFragment}
`;

export const DELETE_INVITE = gql`
    mutation DeleteInvite($id: String!) {
        deleteInviteCode(id: $id)
    }
`