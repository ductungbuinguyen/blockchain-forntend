import { ReactNode, createContext, useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuthContext } from './AuthContext';
import { MdInput, MdOutlineOutput } from 'react-icons/md';
import { TbArrowsRightLeft } from 'react-icons/tb';
import { HiQrcode } from 'react-icons/hi';
import AppButtonPrimary from '../components/AppButtonPrimary';

const SIDEBAR_ACTIONS = [
	{
		icon: MdInput,
		label: 'Cài đặt ứng dụng',
	},
	{
		icon: MdOutlineOutput,
		label: 'Thông tin phần mềm',
	},
	{
		icon: TbArrowsRightLeft,
		label: 'Các điều khoản và thoả thuận',
	},
	{
		icon: HiQrcode,
		label: 'Trung tâm trợ giúp',
	},
];
interface IAppSidebarContext {
	open: () => void;
}

export const AppSidebarContext = createContext<IAppSidebarContext>({
	open: () => {},
});

export const useAppSidebar = () => useContext(AppSidebarContext);

const AppSidebarContextProvider = ({ children }: { children: ReactNode }) => {
	const [isShowSidebar, setIsShowSidebar] = useState(false);
	const { userInfo } = useAuthContext();
  const { logoutClient } = useAuthContext();
	const { fullName, email, phoneNumber } = userInfo ?? {};

	const open = () => {
		setIsShowSidebar(true);
	};
	return (
		<AppSidebarContext.Provider
			value={{
				open,
			}}
		>
			<div
				style={isShowSidebar ? {
					zIndex: 10,
				}: {
          zIndex: -5,
          transition: "z-index 0.5s step-end"
        }}
				className='absolute w-screen h-screen'
			>
				<div
					style={{
						opacity: isShowSidebar ? 100 : 0,
					}}
					className='absolute inset-0 transition-opacity duration-500 bg-slate-900/25 backdrop-blur-sm'
				></div>
				<div style={{
          transform: isShowSidebar ? 'translateX(0)' : 'translateX(-100%)'
        }} className='w-[80%] bg-gradient-to-b from-bcpayment-green-2 to-bcpayment-green-1 min-h-full z-10 relative px-[32px] pt-[60px] pb-[20px] text-white transition-transform duration-500'>
					<div className='flex items-center gap-8'>
						<AiOutlineClose className='text-[32px] font-bold' onClick={() => setIsShowSidebar(false)} />
						<p className='font-bold text-[32px]'>Tuỳ chọn</p>
					</div>
					<div className='flex items-center gap-2 mt-8'>
						<div className='rounded-full overflow-clip w-[60px] h-[60px]'>
							<img src='/avatar.jpg' />
						</div>
						<div className='flex flex-col'>
							<p className='text-[24px] font-bold'>{fullName}</p>
							<p className='text-[15px] font-medium'>{email}</p>
							<p className='text-[15px] font-medium'>{phoneNumber}</p>
						</div>
					</div>
					<div className='flex flex-col justify-between w-full gap-6 mt-20'>
						{SIDEBAR_ACTIONS.map(({ icon: Icon, label }, index) => (
							<div key={index} className='flex items-center gap-3'>
								<div className='bg-bcpayment-green-3 rounded-lg flex items-center justify-center min-w-[50px] min-h-[50px]'>
									<Icon className='text-white text-[30px]' />
								</div>
								<p className='font-bold text-[20px]'>{label}</p>
							</div>
						))}
					</div>
					<AppButtonPrimary onClick={() => {
            logoutClient();
            setIsShowSidebar(false);
            }} className='!from-white !to-white !text-bcpayment-green-1 mt-[170px]'>
						ĐĂNG XUẤT
					</AppButtonPrimary>
				</div>
			</div>
			{children}{' '}
		</AppSidebarContext.Provider>
	);
};

export default AppSidebarContextProvider;
