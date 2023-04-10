export interface IBuyParams {
	contractAddress: string;
	amount: number;
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
	confirmShipping: () => Promise<void>;
	ship: () => Promise<void>;
	timeout: (params: ITimeoutParams) => Promise<any>;
}