import { useState } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useAppModal } from '../contexts/AppModalContext';
import { useUserQuery } from '../generated/graphql';
import AppHeaderWrapper from './AppHeaderWrapper';
import AppOrderDetail from './AppOrderDetail';
import dayjs from 'dayjs';

interface AppOrderListingProps {
	type: 'buy' | 'sell';
}

const AppOrderListing = ({ type }: AppOrderListingProps) => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	const { open } = useAppModal();
	const { data } = useUserQuery();
	const { ordersAsBuyer, contract } = data?.user ?? {};
	const { orders: ordersAsSeller } = contract ?? {};
	const filteredOrdersAsBuyer = (ordersAsBuyer ?? []).filter((order) => {
		const searValueLowerCase = searchValue.toLowerCase();
		return (
			order?.name?.toLowerCase()?.includes(searValueLowerCase) ||
			order?.contract?.seller?.fullName
				?.toLowerCase()
				?.includes(searValueLowerCase)
		);
	});
	const filteredOrdersAsSeller = (ordersAsSeller ?? []).filter((order) => {
		const searValueLowerCase = searchValue.toLowerCase();
		return (
			order?.name?.toLowerCase()?.includes(searValueLowerCase) ||
			order?.buyer?.fullName?.toLowerCase()?.includes(searValueLowerCase)
		);
	});
	return (
		<div className='relative w-full h-screen bg-bcpayment-green-4 overflow-clip'>
			<AppHeaderWrapper bottomOffset={30}>
				<div className='relative flex items-center justify-center py-8 text-white'>
					<SlArrowLeft
						className='text-[20px] absolute left-0 top-1/2 -translate-y-1/2'
						onClick={() => navigate('/')}
					/>
					<p className='font-bold text-[24px]'>{`Đơn hàng ${type === 'buy' ? 'mua' : 'bán'}`}</p>
				</div>
			</AppHeaderWrapper>
			<div className='relative w-full px-[20px] h-full'>
				<div className='pt-8 bg-white rounded-t-xl px-[15px] shadow w-full h-full'>
					<input
						className='bg-bcpayment-green-3 w-full py-1 px-3 text-white rounded-[15px] placeholder:text-white focus-visible:outline-none placeholder:text-center text-center'
						placeholder='Tìm kiếm  đơn hàng'
						value={searchValue}
						type='text'
						onChange={(event) => {
							setSearchValue(event.target.value);
						}}
					/>
					<div className='flex flex-col h-full gap-6 pt-8 mb-8 overflow-x-visible overflow-y-scroll max-h-[650px]'>
						{type === 'buy'
							? filteredOrdersAsBuyer.map((order) => {
									const { price, contract, creationTime, name, id } =
										order ?? {};
									const { fullName, base64Avatar } = contract?.seller ?? {};

									return (
										<div
											onClick={() => open(<AppOrderDetail orderId={id} />)}
											className='grid w-full grid-cols-3 gap-1 rounded-md bg-bcpayment-green-4 overflow-clip min-h-[80px]'
										>
											<div className='grid grid-cols-3 col-span-2 gap-1 border-r-2 border-bcpayment-green-3'>
												<div className='rounded-full overflow-clip w-[60px] h-[60px] self-center ml-2'>
													<img src={base64Avatar || '/avatar.jpg'} />
												</div>
												<div className='flex flex-col justify-between h-full col-span-2 px-2 py-1 '>
													<p className='text-black font-semibold text-[15px] truncate	'>
														{name || 'Apple MacBook Pro 2018'}
													</p>
													<p className='text-black font-medium text-[10px]'>
														{fullName || 'Phạm Nguyễn Khánh Chi'}
													</p>
													<p className='text-bcpayment-gray-2 font-medium text-[10px]'>
														{dayjs(creationTime).format('DD/MM/YYYY')}
													</p>
												</div>
											</div>
											<p className='font-bold text-bcpayment-green-1 text-center text-[20px] self-center'>{`${price} BNB`}</p>
										</div>
									);
							  })
							: filteredOrdersAsSeller.map((order) => {
									const { price, buyer, creationTime, name, id } = order ?? {};
									const { fullName, base64Avatar } = buyer ?? {};

									return (
										<div
											onClick={() => open(<AppOrderDetail orderId={id} />)}
											className='grid w-full grid-cols-3 gap-1 rounded-md bg-bcpayment-green-4 overflow-clip min-h-[80px]'
										>
											<div className='grid grid-cols-3 col-span-2 gap-1 border-r-2 border-bcpayment-green-3'>
												<div className='rounded-full overflow-clip w-[60px] h-[60px] self-center ml-2'>
													<img src={base64Avatar || '/avatar.jpg'} />
												</div>
												<div className='flex flex-col justify-between h-full col-span-2 px-2 py-1 '>
													<p className='text-black font-semibold text-[15px] truncate	'>
														{name || 'Apple MacBook Pro 2018'}
													</p>
													<p className='text-black font-medium text-[10px]'>
														{fullName || 'Phạm Nguyễn Khánh Chi'}
													</p>
													<p className='text-bcpayment-gray-2 font-medium text-[10px]'>
														{dayjs(creationTime).format('DD/MM/YYYY')}
													</p>
												</div>
											</div>
											<p className='font-bold text-bcpayment-green-1 text-center text-[20px] self-center'>{`${price} BNB`}</p>
										</div>
									);
							  })}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppOrderListing;
