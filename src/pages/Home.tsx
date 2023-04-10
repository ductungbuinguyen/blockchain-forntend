import AppHeaderWrapper from '../components/AppHeaderWrapper';
// import { useUsersQuery } from '../generated/graphql';
import { MdInput, MdOutlineOutput, MdStore } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { TbArrowsRightLeft } from 'react-icons/tb';
import { HiQrcode } from 'react-icons/hi';
import { SlArrowLeft } from 'react-icons/sl';
import { BiMoneyWithdraw, BiHistory } from 'react-icons/bi';
import AppAdItem from '../components/AppAdItem';
import { RiHomeHeartLine, RiQrScan2Line } from 'react-icons/ri';
import { IoMdWallet } from 'react-icons/io';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useContractContext } from '../contexts/ContractContext';
import { useAppSidebar } from '../contexts/AppSidebarContext';
import { Link } from 'react-router-dom';
import { useAppNoti } from '../contexts/AppNotiContext';

const HEADER_ITEMS = [
	{
		icon: MdInput,
		label: 'Nạp tiền',
		url: '/',
	},
	{
		icon: MdOutlineOutput,
		label: 'Rút tiền',
		url: '/',
	},
	{
		icon: TbArrowsRightLeft,
		label: 'chuyển tiền',
		url: 'transfer-money',
	},
	{
		icon: HiQrcode,
		label: 'Mã qr',
		url: '/',
	},
];

const SERVICE_ITEMS = [
	{
		icon: TbArrowsRightLeft,
		label: 'chuyển tiền',
	},
	{
		icon: BiMoneyWithdraw,
		label: 'Rút tiền',
	},
	{
		icon: MdInput,
		label: 'Nạp tiền',
	},
	{
		icon: MdStore,
		label: 'Nhà bán hàng',
	},
];

const Home = () => {
	const [isScanning, setIsScanning] = useState(false);
	const { accountBalance } = useContractContext();
	const { open } = useAppSidebar();
	const { open: openNoti} = useAppNoti()
	const handleScan = (result: any, error: any) => {
		console.log('result', result);
		console.log('error', error);
	};
	// const { data, loading } = useUsersQuery({ fetchPolicy: 'no-cache' });

	// if (loading) return <h1>Loading...</h1>;

	return isScanning ? (
		<div className='w-screen h-screen bg-gradient-to-b from-bcpayment-green-1 to-bcpayment-green-2 px-[25px] pt-[120px] py-[80px] relative'>
			<SlArrowLeft
				className='absolute top-10 left-[25px] text-white text-[20px] '
				onClick={() => setIsScanning(false)}
			/>
			<div className='w-full mt-10'>
				<QrReader
					scanDelay={300}
					onResult={handleScan}
					className='w-full h-[500px]'
					constraints={{}}
				/>
			</div>
		</div>
	) : (
		<div className='relative w-screen h-screen bg-bcpayment-green-4'>
			<AppHeaderWrapper bottomOffset={60}>
				<div>
					<FaBars
						className='text-white text-[30px] cursor-pointer'
						onClick={open}
					/>
				</div>
				<div className='flex justify-between w-full mt-5'>
					{HEADER_ITEMS.map(({ icon: Icon, label, url }, index) => (
						<Link to={url} key={index} className='flex flex-col items-center gap-2'>
								<div className='bg-bcpayment-green-3 rounded-lg flex items-center justify-center w-[50px] h-[50px]'>
									<Icon className='text-white text-[30px]' />
								</div>
								<p className='uppercase font-bold text-[12px] text-white'>
									{label}
								</p>
						</Link>
					))}
				</div>
			</AppHeaderWrapper>
			<div className='bg-white mx-[24px] rounded-xl p-6 uppercase'>
				<p className='font-bold text-bcpayment-orange text-[20px]'>
					· Tài khoản chính
				</p>
				<p className='font-bold text-[40px] bg-gradient-to-b from-white via-bcpayment-green-2 to-bcpayment-green-1 text-transparent bg-clip-text'>
					{`${accountBalance} BNB`}
				</p>
			</div>
			<div className='px-6 py-4 bg-white mx-[24px] rounded-t-xl mt-8'>
				<p className='uppercase text-bcpayment-green-1 font-extrabold text-[15px] mb-4'>
					Dịch vụ
				</p>
				<div className='flex justify-between w-full'>
					{SERVICE_ITEMS.map(({ icon: Icon, label }, index) => (
						<div key={index} className='flex flex-col items-center gap-2'>
							<div className='bg-bcpayment-green-3 rounded-lg flex items-center justify-center w-[50px] h-[50px]'>
								<Icon className='text-[30px] text-bcpayment-green-1' />
							</div>
							<p className='text-[10px] font-semibold max-w-[50px] text-center'>
								{label}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className='flex max-w-full px-[24px] overflow-x-scroll gap-4  mt-16'>
				{[1, 2, 3, 4, 5].map((value) => (
					<AppAdItem key={value} />
				))}
			</div>
			<button onClick={() => openNoti({
				description: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
				title: "simply dummy text of the"
			})}>test</button>
			<div className='bg-white flex justify-between px-[24px] py-2 absolute bottom-0 w-full'>
				<div className='flex flex-col items-center text-center text-bcpayment-green-1'>
					<span className='text-[35px]'>
						<RiHomeHeartLine />
					</span>
					<span className='font-extrabold text-[10px]'>Trang chính</span>
				</div>
				<div className='flex flex-col items-center text-bcpayment-green-1/60 max-w-[50px] text-center'>
					<span className='text-[35px]'>
						<IoMdWallet />
					</span>
					<span className='font-extrabold text-[10px]'>Ví</span>
				</div>
				<div className='w-[50px]'></div>
				<span
					className='text-[45px] p-2 rounded-xl text-white bg-gradient-to-b from-bcpayment-green-3/80 to-bcpayment-green-1 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4'
					onClick={() => setIsScanning(true)}
				>
					<RiQrScan2Line />
				</span>
				<div className='flex flex-col items-center text-bcpayment-green-1/60 max-w-[5	0px] text-center'>
					<span className='text-[35px]'>
						<MdStore />
					</span>
					<span className='font-extrabold text-[10px]'>Nhà bán hàng</span>
				</div>
				<div className='flex flex-col items-center text-bcpayment-green-1/60 max-w-[50px] text-center'>
					<span className='text-[35px]'>
						<BiHistory />
					</span>
					<span className='font-extrabold text-[10px]'>Lịch sử</span>
				</div>
			</div>
		</div>
	);
};

export default Home;
