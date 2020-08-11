import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { store } from '/@app/store/';

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
    cache: new InMemoryCache(),
    link: context.concat(httpLink),
    connectToDevTools: true,
});
