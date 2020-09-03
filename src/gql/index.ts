import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { store } from '/~/shared/store/';

// @ts-ignore
const { VITE_API_URL, VITE_API_WS_URL } = import.meta.env;

const context = setContext(async (operation, { headers }) => {
    const token = await store.getters['auth/user'].getIdToken();

    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        }
    };
});

const httpLink = createHttpLink({uri: `${VITE_API_URL}/graphql`});


const wsLink = new WebSocketLink({
    uri: VITE_API_WS_URL,
    options: {
        reconnect: true
    }
});

// @ts-ignore
wsLink.subscriptionClient.use([{
    async applyMiddleware(options, next) {
        const token = await store.getters['auth/user'].getIdToken();

        options.context = {
            Authorization: `Bearer ${token}`,
        }

        next();
    }
}])


const link = split(({query}) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
}, wsLink, httpLink);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
    link: context.concat(link),
    cache,
    connectToDevTools: true,
});
