import ApolloClient from 'apollo-boost';
import { store } from '/@app/store/';

export const apolloClient = new ApolloClient({
    uri: 'https://api.codebyte.cafe/graphql',
    request: async (operation) => {
        const token = await store.getters['auth/user'].getIdToken();

        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
});
