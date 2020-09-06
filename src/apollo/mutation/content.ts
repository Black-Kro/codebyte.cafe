import gql from 'graphql-tag';
import { ReportFragment } from '/~/apollo/fragments';

export const CREATE_REPORT = gql`
    mutation CreateReport($content: String!, $contentId: String!, $reportType: String!) {
        createReport(content: $content, contentId: $contentId, reportType: $reportType) {
            ...ReportFragment
        }
    }
    ${ReportFragment}
`;