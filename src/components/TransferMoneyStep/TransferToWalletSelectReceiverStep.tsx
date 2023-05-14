import { SlArrowLeft } from 'react-icons/sl';
import AppHeaderWrapper from '../AppHeaderWrapper';
import { User, useUserQuery, useUsersQuery } from '../../generated/graphql';

interface TransferToWalletSelectReceiverStepProps {
	searchValue: string;
	onSearchValueChange: (value: string) => void;
	onBackButtonClick: () => void;
	onSelectDestination: (userId: User['id']) => void;
}

const TransferToWalletSelectReceiverStep = ({
	onBackButtonClick,
	onSearchValueChange,
	searchValue,
	onSelectDestination,
}: TransferToWalletSelectReceiverStepProps) => {
	const { data: users, loading } = useUsersQuery();
	const { data } = useUserQuery();
	const { id } = data?.user ?? {}
	const ortherUsers = users?.users
		? users.users.filter((user) => {
      const isMatchSearchValue = searchValue ? user?.email?.toLowerCase()?.includes(searchValue?.toLowerCase()) || user?.phoneNumber?.toLowerCase()?.includes(searchValue?.toLowerCase()) : true
      return isMatchSearchValue && user?.id?.toString() !== id?.toString()
    })
		: [];
	if (loading) return <h1>Loading...</h1>;
	return (
		<div className='relative w-full h-screen bg-bcpayment-green-4'>
			<AppHeaderWrapper bottomOffset={30}>
				<div className='relative flex items-center justify-center py-8 text-white'>
					<SlArrowLeft
						className='text-[20px] absolute left-0 top-1/2 -translate-y-1/2'
						onClick={onBackButtonClick}
					/>
				</div>
			</AppHeaderWrapper>
			<div className='relative w-full px-[20px] h-[calc(100%-95px)] overflow-y-scroll'>
				<div className='pt-8 bg-white rounded-t-xl px-[15px] shadow w-full h-full'>
					<input
						className='bg-bcpayment-green-3 w-full py-1 px-3 text-white rounded-[15px] placeholder:text-white focus-visible:outline-none placeholder:text-center text-center'
						placeholder='Nhập gmail hoặc số điện thoại'
						value={searchValue}
						type='text'
						onChange={(event) => {
							onSearchValueChange(event.target.value);
						}}
					/>
					<div className='flex flex-col gap-6 pt-8 mb-8 overflow-y-scroll max-h-[calc(100%-45px)]'>
						{ortherUsers.map((user) => {
							const { id, phoneNumber, email, fullName, base64Avatar } =
								user ?? {};
							return (
								<div className='flex items-center gap-2 cursor-pointer' onClick={() => onSelectDestination(id)}>
									<div className='rounded-full overflow-clip min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px]'>
										<img src={base64Avatar ?? '/AvatarPlaceholder.svg'} />
									</div>
									<div className='flex flex-col max-w-[265px]'>
										<p className='font-bold text-black text-[15px]'>
											{fullName}
										</p>
                    <p className='text-[15px] font-medium text-bcpayment-green-3 break-words'>{email}</p>
                    <p className='text-[15px] font-medium text-bcpayment-green-3 break-words'>{phoneNumber}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransferToWalletSelectReceiverStep;
