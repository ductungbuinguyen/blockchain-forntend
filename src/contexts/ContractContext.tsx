import MetaMaskSDK from '@metamask/sdk';
import { CommunicationLayerPreference } from '@metamask/sdk-communication-layer';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { useAuthContext } from './AuthContext';
import { BigNumber, Contract, providers, utils } from 'ethers';
import IEcommerceShop from '../assets/ABIs/IEcommerceShop.json';
import {
	IBuyParams,
	IContractContext,
	ITimeoutParams,
	ITransferMoneyParams,
} from '../interfaces/contractContext';

new MetaMaskSDK({
	useDeeplink: false,
	communicationLayerPreference: CommunicationLayerPreference.SOCKET,
});

export const ContractContext = createContext<IContractContext>({
	accountBalance: 0,
	isConnectedWithRightChainAndRightAccount: false,
	buy: () => Promise.resolve(),
	confirmShipping: () => Promise.resolve(),
	connectWallet: () => Promise.resolve(),
	ship: () => Promise.resolve(),
	timeout: () => Promise.resolve(),
	transferMoney: () => Promise.resolve(),
});

export const useContractContext = () => useContext(ContractContext);

const ContractContextProvider = ({ children }: { children: ReactNode }) => {
	const [accountBalance, setAccountBalance] = useState(0);
	const [chain, setChain] = useState('');
	const [account, setAccount] = useState('');
	const ethereum = window?.ethereum as MetaMaskInpageProvider | undefined;
	const provider = useMemo(
		() => new providers.Web3Provider(window?.ethereum),
		[ethereum]
	);
	const signer = useMemo(() => provider.getSigner(), [provider]);

	useEffect(() => {
		if(ethereum) {
			ethereum.on('chainChanged', (chain) => {
				console.log('chainChanged', chain);
				setChain(chain as string);
			});
			ethereum.on('accountsChanged', (accounts) => {
				setAccount((accounts as string[])?.[0]);
				console.log('accountsChanged', accounts);
			});
		}
	}, [ethereum]);
	useEffect(() => {
		const _getBalance = async (address: string) => {
			const balance = address
			? await provider.getBalance(address, 'latest')
			: BigNumber.from(0);
			const etherFormattedBalance =
			Math.round(Number(utils.formatEther(balance)) * 1e4) / 1e4;
			setAccountBalance(etherFormattedBalance)
		};
		_getBalance(account)
	}, [account])

	const { userInfo } = useAuthContext();

	const isConnectedWithRightChainAndRightAccount = useMemo(() => {
		console.log('account checker', account.toLowerCase());
		console.log(
			'metamask public key',
			userInfo?.metaMaskPublicKey?.toLowerCase()
		);
		console.log('inner chainID', Number(process.env.REACT_APP_CHAIN_ID));
		console.log('chainID', Number(chain));
		return (
			Number(chain) === Number(process.env.REACT_APP_CHAIN_ID) &&
			account?.toLowerCase() === userInfo?.metaMaskPublicKey?.toLowerCase()
		);
	}, [chain, account, userInfo?.metaMaskPublicKey]);

	const connectWallet = () => {
		ethereum
			?.request({
				method: 'eth_requestAccounts',
				params: [],
			})
			.then(async (res: any) => {
				const account = res?.[0];
				console.log('account connect', account);
				setAccount(account);
				const chainId = (await ethereum.request({
					method: 'eth_chainId',
				})) as string;
				setChain(chainId);
			})
			.catch((e) => console.log('request accounts ERR', e));
	};

	const buy = async ({
		contractAddress,
		amount,
		orderDecentralizedId,
	}: IBuyParams) => {
		const contract = new Contract(contractAddress, IEcommerceShop, signer);
		return contract.buy([amount, orderDecentralizedId]);
	};

	const timeout = async ({
		contractAddress,
		orderDecentralizedId,
	}: ITimeoutParams) => {
		const contract = new Contract(contractAddress, IEcommerceShop, signer);
		return contract.timeout([orderDecentralizedId]);
	};

	const transferMoney = async ({ receiver, value }: ITransferMoneyParams) => {
		const params = [
			{
				from: account,
				to: receiver,
				value: utils.parseUnits(value, 'ether').toHexString(),
			},
		];
		return provider.send('eth_sendTransaction', params);
	};

	return (
		<ContractContext.Provider
			value={{
				accountBalance,
				isConnectedWithRightChainAndRightAccount,
				buy,
				confirmShipping: () => Promise.resolve(),
				connectWallet,
				ship: () => Promise.resolve(),
				timeout,
				transferMoney,
			}}
		>
			{children}{' '}
		</ContractContext.Provider>
	);
};

export default ContractContextProvider;
