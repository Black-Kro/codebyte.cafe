import gql from 'graphql-tag';

export const UPDATE_PROFILE = gql`
    mutation updateProfile($displayName: String, $bio: String, $avatar: Uuid, $headerImage: Uuid) {
        updateProfile(input: {
            displayName: $displayName,
            bio: $bio,
            avatar: $avatar,
            headerImage: $headerImage,
        }) {
            id   
            displayName
            bio
            avatar
            headerImage
        }
    }
`;