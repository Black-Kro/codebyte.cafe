import { ApolloClient, InMemoryCache, createHttpLink, split, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from './util';
import { getMainDefinition } from '@apollo/client/utilities';
import { store } from '/~/shared/store';

// @ts-ignore
const { VITE_API_URL, VITE_API_WS_URL } = import.meta.env;

const authenticationLink = setContext(async (_, { headers }) => {
    const token = await store.getters['auth/user'].getIdToken();

    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`
        }
    }
});

const httpLink = createHttpLink({
    uri: `${VITE_API_URL}/graphql`,
});

const wsLink = new WebSocketLink({
    uri: VITE_API_WS_URL,
    options: {
        reconnect: true
    }
});

wsLink.subscriptionClient.use([{
    async applyMiddleware(options, next) {
        const token = await store.getters['auth/user'].getIdToken();

        options.context = {
            Authorization: `Bearer ${token}`,
        }

        next();
    }
}])

const link = ApolloLink.from([
    onError(({ networkError, response, graphQLErrors, forward, operation }) => {
        if (networkError && (networkError as any).result) {
            const { success, error, errors, banReason, banDate } = (networkError as any).result;
    
            console.log(Object.entries(networkError));
            if (error) {
                if (error === 'User is banned') {
                    store.commit('setNetworkError', {
                        hasError: true,
                        type: 'Ban',
                        message: banReason
                    });
                }
            } else if (errors) {
                const e = errors[0].message;
                console.log(e);
                if (e === 'This account no longer exists. Fuck you') {
                    store.dispatch('auth/signOut');
                }
            }

        } else {
            forward(operation);
        }
    }),
    split(({query}) => {
        const definition = getMainDefinition(query);
    
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
        // @ts-ignore
    }, wsLink, httpLink)
]);


export const client = new ApolloClient({
    link: authenticationLink.concat(link),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});
