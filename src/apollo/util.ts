import { ApolloLink } from '@apollo/client/core';
import WS from 'subscriptions-transport-ws';

const { SubscriptionClient } = WS;

export class WebSocketLink extends ApolloLink {
    public subscriptionClient: WS.SubscriptionClient;

    constructor(paramsOrClient) {
        super();
        if (paramsOrClient instanceof SubscriptionClient) {
            this.subscriptionClient = paramsOrClient;
        }
        else {
            this.subscriptionClient = new SubscriptionClient(paramsOrClient.uri, paramsOrClient.options, paramsOrClient.webSocketImpl);
        }
    }

    // @ts-ignore
    request(operation) {
        return this.subscriptionClient.request(operation);
    }
}
