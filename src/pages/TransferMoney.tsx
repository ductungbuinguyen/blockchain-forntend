import { useMemo, useState } from 'react';
import SelectTransferType from '../components/TransferMoneyStep/SelectTransferType';
import { IStepHistory, TransferMoneyStep } from '../interfaces/transferMoney';
import TransferToWalletSelectDestinationStep from '../components/TransferMoneyStep/TransferToWalletSelectDestinationStep';
import TransferToWalletInputData from '../components/TransferMoneyStep/TransferToWalletInputData';

const TransferMoney = () => {
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
			const { searchValue } = currentStepData ?? {};
			return (
				<TransferToWalletSelectDestinationStep
					onBackButtonClick={onBackButtonClick}
					searchValue={searchValue}
					onSearchValueChange={(value) => {
            console.log("value", value);
            console.log("currentStepData", currentStepData);
						setStepHistory((prev) => {
              const changedCurrentStep = {
                key: currentStepKey,
                data: {
                  searchValue: value
                }
              }
              prev[prev.length - 1] = changedCurrentStep
              return [...prev]
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
      const { userId } = currentStepData ?? {};
      return <TransferToWalletInputData userId={userId} onBackButtonClick={onBackButtonClick} onSubmit={(values) => {console.log("submit", values)}}/>
		case TransferMoneyStep.CONFIRM_TRANSACTION:
			
		default:
			return <div>default</div>;
	}
};

export default TransferMoney;
