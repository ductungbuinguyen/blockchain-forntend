export interface IBuyParams {
	contractAddress: string;
	amount: string;
	orderDecentralizedId: string;
}

export interface ITimeoutParams {
	contractAddress: string;
	orderDecentralizedId: string;
}

export interface ITransferMoneyParams {
	receiver: string
	value: string;
}

export interface IContractContext {
	isConnectedWithRightChainAndRightAccount: boolean;
	accountBalance: number;
	connectWallet: () => void;
	transferMoney: (params: ITransferMoneyParams) => Promise<any>;
	buy: (params: IBuyParams) => Promise<any>;
	buyerConfirmShipped: (params: ITimeoutParams) => Promise<void>;
	sellerConfirmShipped: (params: ITimeoutParams) => Promise<void>;
	ship: (params: ITimeoutParams) => Promise<void>;
	timeout: (params: ITimeoutParams) => Promise<any>;
	deployECommerceContract: (merchantAddress: string, type: string) => Promise<any>;
}