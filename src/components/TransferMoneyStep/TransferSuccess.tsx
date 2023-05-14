import { SlArrowLeft } from 'react-icons/sl';
import AppHeaderWrapper from '../AppHeaderWrapper';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import AppAdItem from '../AppAdItem';
import { MdOutlineCheckCircle } from 'react-icons/md';

interface TransferSuccessProps {
	amount: number;
	transactionHash: string;
}

const TransferSuccess = ({ amount, transactionHash }: TransferSuccessProps) => {
	const navigate = useNavigate();
	return (
		<div className='relative w-full h-screen bg-bcpayment-green-4'>
			<AppHeaderWrapper bottomOffset={30}>
				<div className='relative flex items-center justify-center py-6 text-white'>
					<SlArrowLeft
						className='text-[20px] absolute left-0 top-1/2 -translate-y-1/2'
						onClick={() => navigate('/')}
					/>
				</div>
			</AppHeaderWrapper>
			<div className='py-6 bg-white mx-[24px] rounded-xl px-[10px] justify-between shadow text-black relative'>
				<span className='text-[50px] text-bcpayment-green-1 bg-white absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 border-spacing-2 border-white rounded-full overflow-clip'>
					<MdOutlineCheckCircle />
				</span>
				<p className='w-full text-[24px] font-medium text-center mt-6'>
					Giao dịch thành công
				</p>
				<p className='w-full text-[24px] font-bold text-center mt-1'>{`${amount} BNB`}</p>
				<div className='grid grid-cols-3 mt-1 gap-y-2 gap-x-1'>
					<p className='font-medium text-[16px]text-bcpayment-gray-1'>
						Thời gian thanh toán
					</p>
					<p className='col-span-2 font-bold text-[16px]'>
						{dayjs().format('HH:mm - DD/MM/YYYY')}
					</p>
					<p className='font-medium text-[16px]text-bcpayment-gray-1'>
						Mã giao dịch
					</p>
					<p className='col-span-2 font-bold text-[16px] break-words'>{`https://testnet.bscscan.com/tx/${transactionHash}`}</p>
				</div>
				<div className='flex max-w-full px-[24px] overflow-x-scroll gap-4 mt-6'>
					{[1, 2, 3, 4, 5].map((value) => (
						<AppAdItem key={value} />
					))}
				</div>
			</div>
		</div>
	);
};

export default TransferSuccess;
