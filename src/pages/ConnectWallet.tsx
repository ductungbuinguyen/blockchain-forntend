import { useNavigate } from 'react-router-dom';
import AppButtonPrimary from '../components/AppButtonPrimary';
import { useContractContext } from '../contexts/ContractContext';
import { useAppSidebar } from '../contexts/AppSidebarContext';
import { useEffect } from 'react';

const ConnectWallet = () => {
	const { open } = useAppSidebar();
	const navigate = useNavigate();
	const { connectWallet, isConnectedWithRightChainAndRightAccount } =
		useContractContext();
	useEffect(() => {
		if (isConnectedWithRightChainAndRightAccount) navigate('/');
	}, [isConnectedWithRightChainAndRightAccount])
	return (
		<div className='flex items-center justify-center w-screen h-screen bg-bcpayment-green-4 px-[25px]'>
			<AppButtonPrimary
				onClick={() => {
					connectWallet();
				}}
			>
				Kết nối metamask
			</AppButtonPrimary>
			<button
				onClick={() =>
					open()
				}
			> click here </button>
		</div>
	);
};

export default ConnectWallet;
