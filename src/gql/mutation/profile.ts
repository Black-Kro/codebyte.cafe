import gql from 'graphql-tag';
import { UserFragment } from '/~/gql/fragments';

export const UPDATE_PROFILE = gql`
    mutation UpdateUser($displayName: String, $bio: String, $header: String, $avatar: String) {
        updateUser(
            nickname: $displayName,
            bio: $bio,
            header: $header,
            avatar: $avatar, 
        ) {
            ...UserFragment    
        }
    }
    ${UserFragment}
`;
