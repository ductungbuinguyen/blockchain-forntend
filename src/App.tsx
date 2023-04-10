import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Authentications/Login';
import Register from './pages/Authentications/Register';
import { useAuthContext } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import ConnectWallet from './pages/ConnectWallet';
import TransferMoney from './pages/TransferMoney';

function App() {
	const [loading, setLoading] = useState(true);
	const { checkAuth } = useAuthContext();

	useEffect(() => {
		const authenticate = async () => {
			await checkAuth();
			setLoading(false);
		};

		authenticate();
	}, [checkAuth]);

	if (loading) return <h1>LOADING....</h1>;
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'>
					<Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
					<Route path='transfer-money' element={<ProtectedRoute><TransferMoney /></ProtectedRoute>} />
					<Route path='connect-wallet' element={<ConnectWallet/>}/>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
