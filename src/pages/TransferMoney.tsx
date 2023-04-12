import { useMemo, useState } from 'react';
import SelectTransferType from '../components/TransferMoneyStep/SelectTransferType';
import { IStepHistory, TransferMoneyStep } from '../interfaces/transferMoney';
import TransferToWalletSelectDestinationStep from '../components/TransferMoneyStep/TransferToWalletSelectDestinationStep';
import TransferToWalletInputData from '../components/TransferMoneyStep/TransferToWalletInputData';
import ConfirmTransaction from '../components/TransferMoneyStep/ConfirmTransaction';
import { useContractContext } from '../contexts/ContractContext';
import TransferSuccess from '../components/TransferMoneyStep/TransferSuccess';
import TransferToAddress from '../components/TransferMoneyStep/TransferToAddress';

const TransferMoney = () => {
	const { transferMoney } = useContractContext();
	const [stepHistory, setStepHistory] = useState<IStepHistory>([
		{
			key: TransferMoneyStep.SELECT_TRANSFER_TYPE,
		},
	]);
	const { key: currentStepKey, data: currentStepData } = useMemo(() => {
		return stepHistory[stepHistory.length - 1];
	}, [stepHistory]);
	const onBackButtonClick = () => {
		setStepHistory((prev) => prev.splice(-1));
	};
	const { userId, amount, note, searchValue, transactionHash, address } =
		currentStepData ?? {};
	switch (currentStepKey) {
		case TransferMoneyStep.SELECT_TRANSFER_TYPE:
			return (
				<SelectTransferType
					onSelectTransferType={(type) => {
						if (type === 'wallet') {
							setStepHistory((prev) => [
								...prev,
								{
									key: TransferMoneyStep.TRANSFER_TO_WALLET_SELECT_DESTINATION,
								},
							]);
						} else {
							setStepHistory((prev) => [
								...prev,
								{
									key: TransferMoneyStep.TRANSFER_TO_ADDRESS,
								},
							]);
						}
					}}
				/>
			);
		case TransferMoneyStep.TRANSFER_TO_WALLET_SELECT_DESTINATION:
			return (
				<TransferToWalletSelectDestinationStep
					onBackButtonClick={onBackButtonClick}
					searchValue={searchValue}
					onSearchValueChange={(value) => {
						console.log('value', value);
						console.log('currentStepData', currentStepData);
						setStepHistory((prev) => {
							const changedCurrentStep = {
								key: currentStepKey,
								data: {
									searchValue: value,
								},
							};
							prev[prev.length - 1] = changedCurrentStep;
							return [...prev];
						});
					}}
					onSelectDestination={(userId) => {
						setStepHistory((prev) => [
							...prev,
							{
								key: TransferMoneyStep.TRANSFER_TO_WALLET_INPUT_DATA,
								data: {
									userId,
								},
							},
						]);
					}}
				/>
			);
		case TransferMoneyStep.TRANSFER_TO_WALLET_INPUT_DATA:
			return (
				<TransferToWalletInputData
					userId={currentStepData?.userId}
					onBackButtonClick={onBackButtonClick}
					onSubmit={(values) => {
						console.log('submit', values);
						const { amount, note } = values;
						setStepHistory((prev) => [
							...prev,
							{
								key: TransferMoneyStep.CONFIRM_TRANSACTION,
								data: {
									userId,
									amount,
									note,
								},
							},
						]);
					}}
				/>
			);
		case TransferMoneyStep.CONFIRM_TRANSACTION:
			return (
				<ConfirmTransaction
					amount={amount}
					note={note}
					userId={userId}
					address={address}
					onBackButtonClick={onBackButtonClick}
					onOkClick={async ({ receiver, value }) => {
						const result = await transferMoney({
							receiver,
							value,
						}).catch((error) => {
							console.error("error", error);
						});
						if(result) {
							setStepHistory((prev) => [
								...prev,
								{
									key: TransferMoneyStep.TRANSACTION_RESULT,
									data: {
										transactionHash: result,
										amount: value,
									},
								},
							]);
						}
					}}
				/>
			);
		case TransferMoneyStep.TRANSACTION_RESULT:
			return (
				<TransferSuccess amount={amount} transactionHash={transactionHash} />
			);
		case TransferMoneyStep.TRANSFER_TO_ADDRESS:
			return (
				<TransferToAddress
					onBackButtonClick={onBackButtonClick}
					onSubmit={(values) => {
						const { amount, address } = values;
						setStepHistory((prev) => [
							...prev,
							{
								key: TransferMoneyStep.CONFIRM_TRANSACTION,
								data: {
									amount,
									address,
								},
							},
						]);
					}}
				/>
			);
		default:
			return <div>default</div>;
	}
};

export default TransferMoney;
