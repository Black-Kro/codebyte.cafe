import gql from 'graphql-tag';

export const GET_NOTIFICATION_COUNT = gql`
    query NotificationCount {
        notificationCount
    },
`;
