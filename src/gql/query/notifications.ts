import gql from 'graphql-tag';
import { UserFragment } from '/~/gql/fragments';

export const GET_NOTIFICATION_COUNT = gql`
    query NotificationCount {
        notificationCount
    },
`;

export const GET_NOTIFICATIONS = gql`
    query Notifications($after: String, $all: Boolean) {
        notifications(after: $after, all: $all) {
            count
            next
            hasNextPage
            nodes {
                id
                source
                from {
                    ...UserFragment
                }
                notificationType
                read
                readAt
                created
            }
        }
    }
  ${UserFragment}
`;