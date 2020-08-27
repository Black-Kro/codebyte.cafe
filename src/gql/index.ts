import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { store } from '/~/shared/store/';

const {
    VITE_API_URL
// @ts-ignore
} = import.meta.env;

const httpLink = new HttpLink({
    uri: `${VITE_API_URL}/graphql`,
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
