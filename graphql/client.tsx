import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
	split
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const URI = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

const authLink = setContext(async (_, headers) => {
	// Leer el token
	const token = await AsyncStorage.getItem('@TOKEN');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const httpLink = createHttpLink({
	uri: URI
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: URI
	})
);

const link = authLink.concat(httpLink);

export const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	link
);

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
});
