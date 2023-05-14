import { Order, OrderStatus, useUserQuery } from '../generated/graphql';
import dayjs from 'dayjs';
import AppButtonPrimary from './AppButtonPrimary';
import { useContractContext } from '../contexts/ContractContext';
import { useMemo } from 'react';

interface AppOrderDetailProps {
	orderId: Order["id"];
	type: 'buy' | 'sell';
}

const AppOrderDetail = ({ orderId, type }: AppOrderDetailProps) => {
	const { data } = useUserQuery();
	const { ordersAsBuyer, contract: sellerContract } = data?.user ?? {};
	const { orders: ordersAsSeller } = sellerContract ?? {};
	const orderData = [
		...ordersAsBuyer ?? [],
		...ordersAsSeller ?? []
	].find(order => order?.id?.toString() === orderId?.toString())
	if(!orderData) return <></>
	const {
		name,
		price,
		contract: targetContract,
		creationTime,
		status,
		base64QrCode,
		buyer,
		confirmDeadline,
		decentralizedId,
		shipDeadline,
		isSellerConfirm,
	} = orderData as any;
	const { seller } = targetContract as any ?? {};
	const { buy, ship, timeout, buyerConfirmShipped, sellerConfirmShipped } =
		useContractContext();
	const OrderActionButton = () => {
		switch (status) {
			case OrderStatus.Created:
				if (type === 'buy')
					return (
						<AppButtonPrimary
							onClick={() =>
								buy({
									amount: price ?? '',
									contractAddress: targetContract?.address ?? '',
									orderDecentralizedId: decentralizedId ?? '',
								})
							}
						>
							Thanh toán đơn hàng
						</AppButtonPrimary>
					);
				else
					return (
						<AppButtonPrimary disabled>Đợi khách thanh toán</AppButtonPrimary>
					);
			case OrderStatus.Paid:
				if (type === 'buy') {
					if (dayjs().isBefore(dayjs(shipDeadline!*1000)))
						return (
							<AppButtonPrimary disabled>
								Đợi đơn hàng vận chuyển
							</AppButtonPrimary>
						);
					return (
						<AppButtonPrimary
							onClick={() =>
								timeout({
									contractAddress: targetContract?.address ?? '',
									orderDecentralizedId: decentralizedId ?? '',
								})
							}
						>
							Hủy đơn hàng
						</AppButtonPrimary>
					);
				} else
					return (
						<AppButtonPrimary
							onClick={() =>
								ship({
									contractAddress: sellerContract?.address ?? '',
									orderDecentralizedId: decentralizedId ?? '',
								})
							}
						>
							Vận chuyển đơn
						</AppButtonPrimary>
					);
			case OrderStatus.Shipping:
				if (type === 'buy')
					return (
						<AppButtonPrimary
							onClick={() =>
								buyerConfirmShipped({
									contractAddress: targetContract?.address ?? '',
									orderDecentralizedId: decentralizedId ?? '',
								})
							}
						>
							Xác nhận đã nhận đơn
						</AppButtonPrimary>
					);
				else if (!isSellerConfirm) {
					return (
						<AppButtonPrimary
							disabled={dayjs().isBefore(dayjs(confirmDeadline!*1000))}
							onClick={() =>
								sellerConfirmShipped({
									contractAddress: sellerContract?.address ?? '',
									orderDecentralizedId: decentralizedId ?? '',
								})
							}
						>
							Xác nhận vận chuyển xong
						</AppButtonPrimary>
					);
				} else {
					return (
						<AppButtonPrimary disabled>Đợi khách xác nhận</AppButtonPrimary>
					);
				}
			default:
				return <></>;
		}
	};
  const statusText = useMemo(() => {
    switch (status) {
      case OrderStatus.Created: return "Đã tạo đơn"
      case OrderStatus.Paid: return "Đã thanh toán"
      case OrderStatus.Shipping: return "Đang vận chuyển"
      case OrderStatus.Complete: return "Hoàn tất"
      case OrderStatus.Canceled: return "Đã hủy"
    }
    return ""
  }, [status])
	return (
		<>
			<p className='w-full text-center font-extrabold text-bcpayment-green-1 text-[24px]'>
				Chi tiết đơn hàng
			</p>
			<div className='mt-4 flex flex-col gap-6 text-black'>
				<div>
					<p className='font-bold text-base'>Tên đơn hàng</p>
					<p className='font-medium text-base'>{name}</p>
				</div>
				<div>
					<p className='font-bold text-base'>Mã đơn hàng</p>
					<p className='font-medium text-base'>{decentralizedId}</p>
				</div>
				<div>
					<p className='font-bold text-base'>Giá</p>
					<p className='font-medium text-base'>{`${price} BNB`}</p>
				</div>
				{type === 'sell' && (
					<div>
						<p className='font-bold text-base'>Người mua</p>
						<p className='font-medium text-base'>{buyer?.fullName}</p>
					</div>
				)}
				{type === 'buy' && (
					<div>
						<p className='font-bold text-base'>Đơn vị bán</p>
						<p className='font-medium text-base'>
							{seller?.merchantMetaData?.companyName}
						</p>
					</div>
				)}
				<div>
					<p className='font-bold text-base'>Email</p>
					<p className='font-medium text-base'>
						{type === 'buy' ? seller?.email : buyer?.email}
					</p>
				</div>
				<div>
					<p className='font-bold text-base'>SDT</p>
					<p className='font-medium text-base'>
						{type === 'buy' ? seller?.phoneNumber : buyer?.phoneNumber}
					</p>
				</div>
				<div>
					<p className='font-bold text-base'>Ngày khởi tạo đơn</p>
					<p className='font-medium text-base'>
						{dayjs(creationTime).format('HH:MM DD/M/YYYY')}
					</p>
				</div>
				<div>
					<p className='font-bold text-base'>Deadline vận chuyển</p>
					<p className='font-medium text-base'>
						{dayjs(shipDeadline!*1000).format('HH:MM DD/M/YYYY')}
					</p>
				</div>
				<div>
					<p className='font-bold text-base'>Deadline xác nhận đã vận chuyển</p>
					<p className='font-medium text-base'>
						{dayjs(confirmDeadline!*1000).format('HH:MM DD/M/YYYY')}
					</p>
				</div>
				<div>
					<p className='font-bold text-base'>Trạng thái đơn hàng</p>
					<p className='font-medium text-base'>{statusText}</p>
				</div>
				{base64QrCode && (
					<div>
						<p className='font-bold text-base'>Mã QR</p>
						<div className='w-full flex items-center justify-center'>
							<img width={200} height={200} src={base64QrCode} />
						</div>
					</div>
				)}
				{status !== OrderStatus.Canceled && status !== OrderStatus.Complete && (
					<div className='w-full flex items-center justify-center'>
						<OrderActionButton />
					</div>
				)}
			</div>
		</>
	);
};

export default AppOrderDetail;
