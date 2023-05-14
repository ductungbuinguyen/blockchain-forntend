import MetaMaskSDK from '@metamask/sdk';
import { CommunicationLayerPreference } from '@metamask/sdk-communication-layer';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { BigNumber, Contract, constants, providers, utils } from 'ethers';
import IEcommerceShop from '../assets/ABIs/IEcommerceShop.json';
import IEShopFactory from '../assets/ABIs/IEShopFactory.json';
import {
	IBuyParams,
	IContractContext,
	ITimeoutParams,
	ITransferMoneyParams,
} from '../interfaces/contractContext';
import { useUserLazyQuery } from '../generated/graphql';

new MetaMaskSDK({
	useDeeplink: false,
	communicationLayerPreference: CommunicationLayerPreference.SOCKET,
});

export const ContractContext = createContext<IContractContext>({
	accountBalance: 0,
	isConnectedWithRightChainAndRightAccount: false,
	buy: () => Promise.resolve(),
	buyerConfirmShipped: () => Promise.resolve(),
	sellerConfirmShipped: () => Promise.resolve(),
	connectWallet: () => Promise.resolve(),
	ship: () => Promise.resolve(),
	timeout: () => Promise.resolve(),
	transferMoney: () => Promise.resolve(),
	deployECommerceContract: () => Promise.resolve(),
});

export const useContractContext = () => useContext(ContractContext);

const ContractContextProvider = ({ children }: { children: ReactNode }) => {
	const [accountBalance, setAccountBalance] = useState(0);
	const [chain, setChain] = useState('');
	const [account, setAccount] = useState('');
	const accountRef = useRef(account);
	const ethereum = window?.ethereum as MetaMaskInpageProvider | undefined;
	const provider = useMemo(
		() => new providers.Web3Provider(window?.ethereum),
		[ethereum]
	);
	const signer = useMemo(() => provider.getSigner(), [provider]);

	useEffect(() => {
		if(ethereum) {
			ethereum.on('chainChanged', (chain) => {
				setChain(chain as string);
			});
			ethereum.on('accountsChanged', (accounts) => {
				setAccount((accounts as string[])?.[0]);
			});
		}
	}, [ethereum]);
	useEffect(() => {
		accountRef.current = account
	}, [account])

	
	useEffect(() => {
		const refreshBalance = async () => {
			const balance = accountRef.current
			? await provider.getBalance(accountRef.current, 'latest')
			: BigNumber.from(0);
			const etherFormattedBalance =
			Math.round(Number(utils.formatEther(balance)) * 1e4) / 1e4;
			setAccountBalance(etherFormattedBalance)
		}
		const interval = setInterval(refreshBalance, 1000);
    return () => clearInterval(interval);
  }, []);


	const [getData, { data }] = useUserLazyQuery();
	const { metaMaskPublicKey } = data?.user ?? {};

	const isConnectedWithRightChainAndRightAccount = useMemo(() => {
		return (
			Number(chain) === Number(process.env.REACT_APP_CHAIN_ID) &&
			account?.toLowerCase() === metaMaskPublicKey?.toLowerCase()
		);
	}, [chain, account, metaMaskPublicKey]);

	const connectWallet = () => {
		ethereum
			?.request({
				method: 'eth_requestAccounts',
				params: [],
			})
			.then(async (res: any) => {
				const account = res?.[0];
				setAccount(account);
				const chainId = (await ethereum.request({
					method: 'eth_chainId',
				})) as string;
				setChain(chainId);
				getData()
			})
			.catch((e) => console.log('request accounts ERR', e));
	};

	const buy = async ({
		contractAddress,
		amount,
		orderDecentralizedId,
	}: IBuyParams) => {
		const contract = new Contract(contractAddress, IEcommerceShop, signer);
		const result = await contract.buy(BigNumber.from(orderDecentralizedId), {
			value: utils.parseEther(amount),
			gasLimit: 1_000_000,
		});
		return result;
	};

	const timeout = async ({
		contractAddress,
		orderDecentralizedId,
	}: ITimeoutParams) => {
		const contract = new Contract(contractAddress, IEcommerceShop, signer);
		const result = await contract.timeout(BigNumber.from(orderDecentralizedId));
		return result;
	};

	const ship = async ({
		contractAddress,
		orderDecentralizedId,
	}: ITimeoutParams) => {
		const contract = new Contract(contractAddress, IEcommerceShop, signer);
		const nonce = await contract.getNonce();
		const result = contract.ship([BigNumber.from(orderDecentralizedId), nonce]);
		return result;
	};

	const buyerConfirmShipped = async ({
		contractAddress,
		orderDecentralizedId,
	}: ITimeoutParams) => {
		const contract = new Contract(contractAddress, IEcommerceShop, signer);
		const result = contract.buyerConfirm(BigNumber.from(orderDecentralizedId));
		return result;
	};

	const sellerConfirmShipped = async ({
		contractAddress,
		orderDecentralizedId,
	}: ITimeoutParams) => {
		const contract = new Contract(contractAddress, IEcommerceShop, signer);
		const nonce = await contract.getNonce();
		const result = contract.sellerConfirm(BigNumber.from(orderDecentralizedId), nonce);
		return result
	};

	const transferMoney = async ({ receiver, value }: ITransferMoneyParams) => {
		const params = [
			{
				from: account,
				to: receiver,
				value: utils.parseUnits(value, 'ether').toHexString(),
			},
		];
		const result = provider.send('eth_sendTransaction', params);
		
		return result;
	};

	const deployECommerceContract = async (merchantAddress: string, type: string = "online") => {
		const eShopContractFactoryAddress =
		process.env.REACT_APP_E_SHOP_CONTRACT_FACTORY_ADDRESS ||
		'0x9b5192E2C2554272454E91b0CC61bF2408d00fca';
		const contract = new Contract(
			eShopContractFactoryAddress,
			IEShopFactory,
			signer
		);
		const result = type === "online" ? await contract.deployEShop(merchantAddress, constants.AddressZero) : await contract.deployShop(merchantAddress, constants.AddressZero)
		return result;
	};

	return (
		<ContractContext.Provider
			value={{
				accountBalance,
				isConnectedWithRightChainAndRightAccount,
				deployECommerceContract,
				buy,
				buyerConfirmShipped,
				sellerConfirmShipped,
				connectWallet,
				ship,
				timeout,
				transferMoney,
			}}
		>
			{children}{' '}
		</ContractContext.Provider>
	);
};

export default ContractContextProvider;
