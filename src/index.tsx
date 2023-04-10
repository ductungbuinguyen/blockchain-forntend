import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import JWTManager from './utils/jwt';
import AuthContextProvider from './contexts/AuthContext';
import './index.css';
import ContractContextProvider from './contexts/ContractContext';
import AppNotiContextProvider from './contexts/AppNotiContext';
import AppSidebarContextProvider from './contexts/AppSidebarContext';

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from JWTManager if it exists
	const token = JWTManager.getToken();
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<AuthContextProvider>
			<ContractContextProvider>
				<div className='relative w-screen h-screen'>
					<AppNotiContextProvider>
						<AppSidebarContextProvider>
							<React.StrictMode>
								<div className='relative w-full'>
									<App />
								</div>
							</React.StrictMode>
						</AppSidebarContextProvider>
					</AppNotiContextProvider>
				</div>
			</ContractContextProvider>
		</AuthContextProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
