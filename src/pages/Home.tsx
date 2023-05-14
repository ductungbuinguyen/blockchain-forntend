import AppHeaderWrapper from '../components/AppHeaderWrapper';
// import { useUsersQuery } from '../generated/graphql';
import { MdStore } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { TbArrowsRightLeft } from 'react-icons/tb';
import { SlArrowLeft } from 'react-icons/sl';
import { BiMoneyWithdraw, BiHistory } from 'react-icons/bi';
import AppAdItem from '../components/AppAdItem';
import { RiHomeHeartLine, RiQrScan2Line } from 'react-icons/ri';
import { useState } from 'react';
import { useContractContext } from '../contexts/ContractContext';
import { useAppSidebar } from '../contexts/AppSidebarContext';
import { Link } from 'react-router-dom';
import Html5QrCodePlugin from '../components/Html5QrCodePlugin';
import { QrcodeSuccessCallback } from 'html5-qrcode';
import { BsPersonFill } from 'react-icons/bs';

// const HEADER_ITEMS = [
// 	{
// 		icon: MdInput,
// 		label: 'Nạp tiền',
// 		url: '/',
// 	},
// 	{
// 		icon: MdOutlineOutput,
// 		label: 'Rút tiền',
// 		url: '/',
// 	},
// 	{
// 		icon: TbArrowsRightLeft,
// 		label: 'chuyển tiền',
// 		url: 'transfer-money',
// 	},
// 	{
// 		icon: HiQrcode,
// 		label: 'Mã qr',
// 		url: '/',
// 	},
// ];

const SERVICE_ITEMS = [
	{
		icon: TbArrowsRightLeft,
		label: 'chuyển tiền',
		url: 'transfer-money',
	},
	{
		icon: BiMoneyWithdraw,
		label: 'orders',
		url: 'order-listing',
	},
	// {
	// 	icon: MdInput,
	// 	label: 'Nạp tiền',
	// 	url: '/',
	// },
	{
		icon: MdStore,
		label: 'Nhà bán hàng',
		url: 'merchant',
	},
];

const Home = () => {
	const [isScanning, setIsScanning] = useState(false);
	const { accountBalance, buy } = useContractContext();
	const { open } = useAppSidebar();
	// const { open: openNoti} = useAppNoti()
	const handleScan: QrcodeSuccessCallback = async (decodedText) => {
		if(decodedText) {
			const data = JSON.parse(decodedText)
			const { contractAddress, amount, orderDecentralizedId } = data ?? {};
			await buy({
				amount,
				contractAddress,
				orderDecentralizedId
			})
		}
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
				{/* <QrReader
					scanDelay={300}
					onResult={handleScan}
					className='w-full h-[500px]'
					constraints={{}}
				/> */}
				<Html5QrCodePlugin onScanningSuccess={handleScan}/>
			</div>
		</div>
	) : (
		<div className='relative w-screen h-screen bg-bcpayment-green-4'>
				<AppHeaderWrapper bottomOffset={40}>
					<div>
						<FaBars
							className='text-white text-[30px] cursor-pointer'
							onClick={open}
						/>
					</div>
					{/* <div className='flex justify-between w-full mt-5'>
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
					</div> */}
				</AppHeaderWrapper>
				<div className='bg-white mx-[24px] rounded-xl p-6 uppercase mb-8'>
					<p className='font-bold text-bcpayment-orange text-[20px]'>
						· Tài khoản chính
					</p>
					<p className='font-bold text-[40px] bg-gradient-to-b from-white via-bcpayment-green-2 to-bcpayment-green-1 text-transparent bg-clip-text'>
						{`${accountBalance} BNB`}
					</p>
				</div>
				<div className='max-h-[calc(100%-305px)] overflow-y-scroll'>
					<div className='px-6 py-4 bg-white mx-[24px] rounded-t-xl'>
						<p className='uppercase text-bcpayment-green-1 font-extrabold text-[15px] mb-4'>
							Dịch vụ
						</p>
						<div className='flex justify-between w-full'>
							{SERVICE_ITEMS.map(({ icon: Icon, label, url }, index) => (
								<Link to={url} key={index} className='flex flex-col items-center gap-2'>
									<div className='bg-bcpayment-green-3 rounded-lg flex items-center justify-center w-[70px] h-[70px]'>
										<Icon className='text-[40px] text-bcpayment-green-1' />
									</div>
									<p className='text-[10px] font-semibold max-w-[50px] text-center'>
										{label}
									</p>
								</Link>
							))}
						</div>
					</div>
					<div className='flex max-w-full ml-[24px] overflow-x-scroll gap-4  mt-16 w-[calc(100%-48px)]'>
						{[1, 2, 3, 4, 5].map((value) => (
							<AppAdItem key={value} />
						))}
					</div>
				</div>
			{/* <button onClick={() => openNoti({
				description: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
				title: "simply dummy text of the"
			})}>test</button> */}
			<div className='bg-white flex justify-between px-[24px] py-2 absolute bottom-0 w-full'>
				<Link to="/" className='flex flex-col items-center text-center text-bcpayment-green-1'>
					<span className='text-[35px]'>
						<RiHomeHeartLine />
					</span>
					<span className='font-extrabold text-[10px]'>Trang chính</span>
				</Link>
				<Link to="user-info" className='flex flex-col items-center text-bcpayment-green-1/60 max-w-[50px] text-center'>
					<span className='text-[35px]'>
						<BsPersonFill />
					</span>
					<span className='font-extrabold text-[10px]'>Cá nhân</span>
				</Link>
				<div className='w-[50px]'></div>
				<span
					className='text-[45px] p-2 rounded-xl text-white bg-gradient-to-b from-bcpayment-green-3/80 to-bcpayment-green-1 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4'
					onClick={() => setIsScanning(true)}
				>
					<RiQrScan2Line />
				</span>
				<Link to="merchant" className='flex flex-col items-center text-bcpayment-green-1/60 max-w-[5	0px] text-center'>
					<span className='text-[35px]'>
						<MdStore />
					</span>
					<span className='font-extrabold text-[10px]'>Nhà bán hàng</span>
				</Link>
				<Link to={'activity-history'} className='flex flex-col items-center text-bcpayment-green-1/60 max-w-[50px] text-center'>
					<span className='text-[35px]'>
						<BiHistory />
					</span>
					<span className='font-extrabold text-[10px]'>Lịch sử</span>
				</Link>
			</div>
		</div>
	);
};

export default Home;
