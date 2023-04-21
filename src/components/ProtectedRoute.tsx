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

const AuthenticatedWrapper = ({ children }: { children: JSX.Element }) => {
	const { cache } = useApolloClient();
	const { userId } = useAuthContext();
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
					const isBuyerOrder = userId === targetOrder?.buyer?.id;
					const targetOrderAsBuyerIndex = user.ordersAsBuyer?.findIndex((value: any) => value?.id === targetOrder?.id)
					const targetOrderAsBuyer = targetOrderAsBuyerIndex && user.ordersAsBuyer && user.ordersAsBuyer[targetOrderAsBuyerIndex]
					const targetOrderAsSellerIndex = user.contract?.orders?.findIndex((value: any) => value?.id === targetOrder?.id)
					const targetOrderAsSeller = targetOrderAsSellerIndex && user?.contract?.orders && user.contract.orders[targetOrderAsSellerIndex]
					let targetOrderValue = isBuyerOrder ? targetOrderAsBuyer : targetOrderAsSeller
					const newActivityFragment: any = {
						__typename: 'ActivityHistory',
						creationTime,
						id,
						transactionHash,
						type,						
					}
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
							} else {
								user.activityHistoriesAsReceiver = [
									...(user.activityHistoriesAsReceiver ?? []),
									{
										sender,
										...newActivityFragment,
									},
								];
							}
						break;
						case ActivityHistoryType.RegisterMerchant:
							user.contract = {
								...targetContract,
								__typename: "Contract",
								activityHistory: newActivityFragment,
								orders: [],
							}
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
							} else {
								user.contract && (user.contract.orders = [
									...user.contract.orders ?? [],
									{
										__typename: 'Order',
										activityHistories: [newActivityFragment]
									}
								])
							}
						break;
						case ActivityHistoryType.PayOrder:
							targetOrderValue && (targetOrderValue = {
								...targetOrderAsBuyer,
								__typename: 'Order',
								status: OrderStatus.Paid,
								activityHistories: [
									...targetOrderValue?.activityHistories ?? [],
									newActivityFragment
								]
							})
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
						break;
						case ActivityHistoryType.BuyerConfirmOrderShipped:
							targetOrderValue && (targetOrderValue = {
								...targetOrderAsBuyer,
								__typename: 'Order',
								status: OrderStatus.Shipping,
								activityHistories: [
									...targetOrderValue?.activityHistories ?? [],
									newActivityFragment
								]
							})
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
						break;
						case ActivityHistoryType.OrderCompleted:
							targetOrderValue && (targetOrderValue = {
								...targetOrderAsBuyer,
								__typename: 'Order',
								status: OrderStatus.Complete,
								activityHistories: [
									...targetOrderValue?.activityHistories ?? [],
									newActivityFragment
								]
							})
						break;
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
