import { Ref } from 'vue';

const capitalize = (input: string) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

interface DefaultPaginationUpdateQueryParams {
    fetchMoreResult?: any;
    subscriptionData?: any;
}

export const defaultPaginationUpdateQuery = (node: string, subscriptionNode?: string) => (previousResult, { fetchMoreResult, subscriptionData } : DefaultPaginationUpdateQueryParams) => {

    if (fetchMoreResult) {
        const next = fetchMoreResult[node].next;
        const nodes = fetchMoreResult[node].nodes;
        const hasNextPage = fetchMoreResult[node].hasNextPage;
    
        console.log('Running Fetch MOre', next, nodes, hasNextPage, node, fetchMoreResult)

        return next ? {
            [node]: {
                __typename: previousResult[node].__typename,
                nodes: [...previousResult[node].nodes, ...nodes],
                hasNextPage,
                next,
            }
        } : previousResult;
    }

    if (subscriptionData) {
        const newData = subscriptionData.data[subscriptionNode || `new${capitalize(node)}`];

        if (previousResult[node].nodes.filter(p => p.id === newData.id).length > 0)
            return previousResult;

        return {
            ...previousResult[node],
            nodes:  [
                newData,
                ...previousResult[node].nodes,
            ]
        }
    }

};

export const usePaginationResult = (result: Ref) => {

};