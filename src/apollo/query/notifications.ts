import gql from 'graphql-tag';
import { UserFragment } from '/~/apollo/fragments';

export const GET_NOTIFICATION_COUNT = gql`
    query NotificationCount {
        notificationCount
    },
`;

export const GET_NOTIFICATIONS = gql`
    query Notifications($after: String, $all: Boolean, $take: Int = 5) {
        notifications(after: $after, all: $all, take: $take) {
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