import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
	Operation,
	split,
} from '@apollo/client';
import JWTManager from './utils/jwt';
import AuthContextProvider from './contexts/AuthContext';
import './index.css';
import ContractContextProvider from './contexts/ContractContext';
import AppNotiContextProvider from './contexts/AppNotiContext';
import AppSidebarContextProvider from './contexts/AppSidebarContext';
import AppModalContextProvider from './contexts/AppModalContext';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include',
});
console.log("httpLink", httpLink)

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
	lazy: true,
	retryAttempts: 4500,
	shouldRetry: () => true,
	connectionParams: {
		get authorization() {
			const token = JWTManager.getToken();
			console.log("token", token);
			const accessToken = token ? `Bearer ${token}` : '';
			return accessToken
		},
	}
}));
console.log("wsLink", wsLink)

const splitLink = split(	
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const authLink = new ApolloLink((operation, forward) => {
	const token = JWTManager.getToken();
	const accessToken = token ? `Bearer ${token}` : '';
	operation.setContext({
		headers: {
			authorization: accessToken,
		}
	});
	console.log('operation', operation);
	(operation as Operation & { authToken: string | undefined }).authToken = accessToken
	return (forward as any)(operation);
})

const client = new ApolloClient({
	link: authLink.concat(splitLink),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<AuthContextProvider>
			<ContractContextProvider>
				<div className='relative w-screen h-screen'>
					<AppNotiContextProvider>
						<AppSidebarContextProvider>
							<AppModalContextProvider>
								<React.StrictMode>
									<div className='relative w-full'>
										<App />
									</div>
								</React.StrictMode>
							</AppModalContextProvider>
						</AppSidebarContextProvider>
					</AppNotiContextProvider>
				</div>
			</ContractContextProvider>
		</AuthContextProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
