import { ApolloClient, HttpLink, InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { store } from '/@app/store/';

import introspectionQueryResultData from '../../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
})

console.log(introspectionQueryResultData);

const httpLink = new HttpLink({
    uri: 'https://api.codebyte.cafe/graphql',
});

const context = setContext(async (operation, { headers }) => {
    const token = await store.getters['auth/user'].getIdToken();

    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        }
    };
})

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: context.concat(httpLink),
    connectToDevTools: true,
});
