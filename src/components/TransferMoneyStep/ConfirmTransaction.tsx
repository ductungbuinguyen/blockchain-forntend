import { User, useUsersQuery } from '../../generated/graphql';
import { ITransferMoneyParams } from '../../interfaces/contractContext';
import AppButtonPrimary from '../AppButtonPrimary';
import AppHeaderWrapper from '../AppHeaderWrapper';
import { SlArrowLeft } from 'react-icons/sl';

interface ConfirmTransactionProps {
	userId?: User['id'];
	amount?: number;
	note?: string;
  address?: string;
	onBackButtonClick: () => void;
	onOkClick: (params: ITransferMoneyParams) => void;
}

const ConfirmTransaction = ({
	amount,
	note,
	onBackButtonClick,
	userId,
  address,
	onOkClick,
}: ConfirmTransactionProps) => {
	const { data } = useUsersQuery();
	const user = data?.users?.find((user) => user?.id === userId) as User;
	const { fullName, email, metaMaskPublicKey, phoneNumber } = user ?? {};
	return (
		<div className='relative w-full h-screen bg-bcpayment-green-4'>
			<AppHeaderWrapper bottomOffset={30}>
				<div className='relative flex items-center justify-center py-6 text-white'>
					<SlArrowLeft
						className='text-[20px] absolute left-0 top-1/2 -translate-y-1/2'
						onClick={onBackButtonClick}
					/>
				</div>
			</AppHeaderWrapper>
			<div className='py-6 bg-white mx-[24px] rounded-xl px-[10px] justify-between shadow text-[15px]'>
				<p className='font-bold uppercase text-bcpayment-green-1'>
					CHI TIẾT GIAO DỊCH
				</p>
				<div className='grid grid-cols-3 mt-4 gap-y-2 gap-x-1'>
          {
            user && (
              <>
                <p className='font-semibold text-bcpayment-gray-1'>Chuyển đến</p>
                <p className='col-span-2 font-medium text-black'>{fullName}</p>
                <p className='font-semibold text-bcpayment-gray-1'>Số điện thoại</p>
                <p className='col-span-2 font-medium text-black'>{phoneNumber}</p>
                <p className='font-semibold text-bcpayment-gray-1'>gmail</p>
                <p className='col-span-2 font-medium text-black'>{email}</p>
                <p className='font-semibold text-bcpayment-gray-1'>Note</p>
                <p className='col-span-2 font-medium text-black'>{note}</p>
              </>
            )
          }
          <p className='font-semibold text-bcpayment-gray-1'>Địa chỉ ví</p>
					<p className='col-span-2 font-medium text-black break-words'>
						{metaMaskPublicKey || address}
					</p>
					<p className='font-semibold text-bcpayment-gray-1'>Số tiền</p>
					<p className='col-span-2 font-medium text-black'>{`${amount} BNB`}</p>
					<div className='col-span-full after:contents[""] h-[1px] bg-bcpayment-gray-2'></div>
					<p className='font-semibold text-bcpayment-gray-1'>Tổng tiền</p>
					<p className='col-span-2 font-medium text-black'>{`${amount} BNB`}</p>
				</div>
			</div>
			<div className='absolute bottom-0 left-0 w-full px-4 py-2 bg-white'>
				<AppButtonPrimary onClick={() => onOkClick({
          receiver: metaMaskPublicKey as string,
          value: String(amount),
        })}>Chuyển tiền</AppButtonPrimary>
			</div>
		</div>
	);
};

export default ConfirmTransaction;
