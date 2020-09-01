import gql from 'graphql-tag';

export const SUBSCRIBE_TO_NOTIFICATION_COUNT = gql`
    subscription NotificationCountSubscription { 
        updatedNotificationCount
    },
`;
