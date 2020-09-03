import gql from 'graphql-tag';

export const MARK_NOTIFICATIONS_AS_READ = gql`
    mutation MarkAllNotificationsAsRead {
        markAllNotificationsAsRead   
    }
`;