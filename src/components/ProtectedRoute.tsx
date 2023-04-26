import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useContractContext } from '../contexts/ContractContext';
import {
	useActivityHistorySubscription,
	UserQuery,
	UserDocument,
	ActivityHistoryType,
	OrderStatus,
	useUserQuery,
} from '../generated/graphql';
import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { useAppNoti } from '../contexts/AppNotiContext';

const AuthenticatedWrapper = ({ children }: { children: JSX.Element }) => {
	const { cache } = useApolloClient();
	const { userId } = useAuthContext();
	const { open } = useAppNoti()
	const { data: dataSubscription } = useActivityHistorySubscription();
	const { data: dataUser } = useUserQuery();

	useEffect(() => {
		if (dataSubscription) {
			const {
				creationTime,
				id,
				receiver,
				receiverAddress,
				sender,
				targetContract,
				targetOrder,
				transactionHash,
				type,
			} = dataSubscription?.activityHistory ?? {};
			cache.updateQuery<Omit<UserQuery, '__typename'>>(
				{
					query: UserDocument,
				},
				(data) => {
					// let user = data?.user;
					let user = JSON.parse(JSON.stringify(data?.user));

					if (!user) return data;
					const isBuyerOrder = userId?.toString() === targetOrder?.buyer?.id?.toString();
					console.log("isBuyerOrder", isBuyerOrder)
					const targetOrderAsBuyerIndex = user.ordersAsBuyer?.findIndex((value: any) => value?.id?.toString() === targetOrder?.id?.toString())
					console.log("targetOrderAsBuyerIndex", targetOrderAsBuyerIndex)
					const targetOrderAsBuyer = targetOrderAsBuyerIndex && user.ordersAsBuyer && user.ordersAsBuyer[targetOrderAsBuyerIndex]
					console.log("targetOrderAsBuyer", targetOrderAsBuyer)
					const targetOrderAsSellerIndex = user.contract?.orders?.findIndex((value: any) => value?.id?.toString() === targetOrder?.id?.toString())
					console.log("targetOrderAsSellerIndex", targetOrderAsSellerIndex)
					const targetOrderAsSeller = targetOrderAsSellerIndex && user?.contract?.orders && user.contract.orders[targetOrderAsSellerIndex]
					console.log("targetOrderAsSeller", targetOrderAsSeller)
					let targetOrderValue = isBuyerOrder ? targetOrderAsBuyer : targetOrderAsSeller
					const newActivityFragment: any = {
						__typename: 'ActivityHistory',
						creationTime,
						id,
						transactionHash,
						type,
						targetOrder: targetOrderValue || targetOrder
					}
					console.log("newActivityFragment", newActivityFragment)
					switch (type) {
						case ActivityHistoryType.TransferMoney:
							const isSender = userId === sender?.id;
							if (isSender) {
								user.activityHistoriesAsSender = [
									...(user.activityHistoriesAsSender ?? []),
									{
										receiver,
										receiverAddress,
										...newActivityFragment,
									},
								];
								open({
									title: `Chuyển đến ${receiverAddress ? receiverAddress : receiver?.fullName}`,
									description: 'Xem chi tiết tại lịch sử giao dịch',
								})
							} else {
								user.activityHistoriesAsReceiver = [
									...(user.activityHistoriesAsReceiver ?? []),
									{
										sender,
										...newActivityFragment,
									},
								];
								open({
									title: `Nhận tiền từ ${sender?.fullName}`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							}
						break;
						case ActivityHistoryType.RegisterMerchant:
							user.contract = {
								...targetContract,
								__typename: "Contract",
								activityHistory: newActivityFragment,
								orders: [],
							}
							open({
								title: 'Đăng kí trở thành nhà bán hàng thành công',
								description: 'Xem chi tiết tại lịch sử giao dịch'
							})
						break;
						case ActivityHistoryType.CreateOrder:
							if(isBuyerOrder) {
								user.ordersAsBuyer = [
									...user.ordersAsBuyer ?? [],
									{
										...targetOrder,
										__typename: 'Order',
										activityHistories: [newActivityFragment]
									}
								]
								open({
									title: `Tạo đơn hàng ${targetOrder?.name} thành công`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
								console.log("ordersAsBuyer", user.ordersAsBuyer)
							} else {
								user.contract && (user.contract.orders = [
									...user.contract.orders ?? [],
									{
										...targetOrder,
										__typename: 'Order',
										activityHistories: [newActivityFragment]
									}
								])
								open({
									title: `Đơn hàng ${targetOrder?.name} đã được tạo`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							}
						break;
						case ActivityHistoryType.PayOrder:
							targetOrderValue && (targetOrderValue = {
								...targetOrderValue,
								__typename: 'Order',
								status: OrderStatus.Paid,
								activityHistories: [
									...targetOrderValue?.activityHistories ?? [],
									newActivityFragment
								]
							})
							if(isBuyerOrder) {
								open({
									title: `Thanh toán đơn hàng ${targetOrder?.name} thành công`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							} else {
								open({
									title: `Đơn hàng ${targetOrder?.name} đã được thanh toán`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							}
						break;
						case ActivityHistoryType.ShipOrder:
							targetOrderValue && (targetOrderValue = {
								...targetOrderAsBuyer,
								__typename: 'Order',
								status: OrderStatus.Shipping,
								activityHistories: [
									...targetOrderValue?.activityHistories ?? [],
									newActivityFragment
								]
							})
							if(isBuyerOrder) {
								open({
									title: `Đơn hàng ${targetOrder?.name} đã được vận chuyển`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							} else {
								open({
									title: `Đem vận chuyển đơn hàng ${targetOrder?.name} thành công`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							}
						break;
						case ActivityHistoryType.OrderCompleted:
						case ActivityHistoryType.BuyerConfirmOrderShipped:
							targetOrderValue && (targetOrderValue = {
								...targetOrderAsBuyer,
								__typename: 'Order',
								status: OrderStatus.Complete,
								activityHistories: [
									...targetOrderValue?.activityHistories ?? [],
									newActivityFragment
								]
							})
							if(isBuyerOrder) {
								open({
									title: `Xác thực đã nhận đơn hàng ${targetOrder?.name} thành công`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})								
							} else {
								open({
									title: `Khách hàng đã xác thực đã nhận đơn hàng ${targetOrder?.name}`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							}
						break;
						case ActivityHistoryType.SellerConfirmOrderShipped:
							targetOrderValue && (targetOrderValue = {
								...targetOrderAsBuyer,
								__typename: 'Order',
								status: OrderStatus.Shipping,
								activityHistories: [
									...targetOrderValue?.activityHistories ?? [],
									newActivityFragment
								]
							})
							if(isBuyerOrder) {
								open({
									title: `Người bán xác nhận đã chuyển đơn hàng ${targetOrder?.name} thành công`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							} else {
								open({
									title: `Xác nhận đã chuyển đơn hàng ${targetOrder?.name} thành công`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							}
						break;
						// case ActivityHistoryType.OrderCompleted:
						// 	targetOrderValue && (targetOrderValue = {
						// 		...targetOrderAsBuyer,
						// 		__typename: 'Order',
						// 		status: OrderStatus.Complete,
						// 		activityHistories: [
						// 			...targetOrderValue?.activityHistories ?? [],
						// 			newActivityFragment
						// 		]
						// 	})
						// break;
						case ActivityHistoryType.TimeOutOrder:
							targetOrderValue && (targetOrderValue = {
								...targetOrderAsBuyer,
								__typename: 'Order',
								status: OrderStatus.Canceled,
								activityHistories: [
									...targetOrderValue?.activityHistories ?? [],
									newActivityFragment
								]
							})
							if(isBuyerOrder) {
								open({
									title: `Hủy ${targetOrder?.name} thành công`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							} else {
								open({
									title: `Khách hàng đã hủy đơn hàng ${targetOrder?.name}`,
									description: 'Xem chi tiết tại lịch sử giao dịch'
								})
							}
						break;
					}
					console.log("edittedUser", user)
					return { user }
				}
			);
		}
	}, [dataSubscription])
	console.log("dataUser", dataUser)
	console.log("dataSubscription", dataSubscription)
	return children;
};

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const { isAuthenticated } = useAuthContext();
	console.log('isAuthenticated', isAuthenticated);
	const { isConnectedWithRightChainAndRightAccount } = useContractContext();
	console.log(
		'isConnectedWithRightChainAndRightAccount',
		isConnectedWithRightChainAndRightAccount
	);
	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}
	if (!isConnectedWithRightChainAndRightAccount)
		return <Navigate to='/connect-wallet' />;
	return <AuthenticatedWrapper>{children}</AuthenticatedWrapper>;
};
