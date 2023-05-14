import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	createHttpLink,
	defaultDataIdFromObject,
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
	uri: process.env.REACT_APP_API_URI,
	credentials: 'include',
});

const wsLink = new GraphQLWsLink(createClient({
  url: process.env.REACT_APP_WS_URI as string,
	lazy: true,
	retryAttempts: 4500,
	shouldRetry: () => true,
	connectionParams: {
		get authorization() {
			const token = JWTManager.getToken();
			const accessToken = token ? `Bearer ${token}` : '';
			return accessToken
		},
	},

}));

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
	(operation as Operation & { authToken: string | undefined }).authToken = accessToken
	return (forward as any)(operation);
})

const client = new ApolloClient({
	link: authLink.concat(splitLink),
	cache: new InMemoryCache({
		dataIdFromObject(responseObject) {
			switch (responseObject.__typename) {
				case 'UserInfoMetaData': return "UserInfoMetaData";
				default: return defaultDataIdFromObject(responseObject);
			}
		}	
	}),
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
