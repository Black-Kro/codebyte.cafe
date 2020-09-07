import gql from 'graphql-tag';
import { ReportFragment } from '/~/apollo/fragments';

export const GET_REPORTS = gql`
    query Reports {
        reports {
            next
            count
            hasNextPage
            nodes {
                ...ReportFragment
            }
        }
    }
    ${ReportFragment}
`;

export const GET_REPORT = gql`
    query Reports($id: String!) {
        report(id: $id) {
            ...ReportFragment
        }
    }
    ${ReportFragment}
`;

