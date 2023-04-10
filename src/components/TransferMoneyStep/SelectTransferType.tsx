import { IoMdWallet } from 'react-icons/io';
import AppHeaderWrapper from '../AppHeaderWrapper'
import { SlArrowLeft } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom';
import {MdOutlineSettingsEthernet} from 'react-icons/md'
import AppAdItem from '../AppAdItem';

export interface SelectTransferTypeProps {
  onSelectTransferType: (type: "wallet" | "address") => void;
}

const SelectTransferType = ({
  onSelectTransferType
}: SelectTransferTypeProps) => {
  const navigate = useNavigate();
  return (
    <div className='relative w-full h-screen bg-bcpayment-green-4'>
      <AppHeaderWrapper bottomOffset={30}>
        <div className='relative flex items-center justify-center py-8 text-white'>
          <SlArrowLeft className='text-[20px] absolute left-0 top-1/2 -translate-y-1/2' onClick={() => navigate('/')}/>
          <p className='font-bold text-[24px]'>Chuyển tiền</p>
        </div>
      </AppHeaderWrapper>
      <div className='py-6 bg-white mx-[24px] rounded-xl px-[30px] flex justify-between shadow'>
        <div className='flex flex-col items-center cursor-pointer max-w-[100px]' onClick={() => onSelectTransferType("wallet")}>
          <span className='text-[40px] text-bcpayment-green-1'><IoMdWallet/></span>
          <p className='text-[15px] text-black font-medium text-center'>Đến ví bằng gmail/ SDT</p>
        </div>
        <div className='flex flex-col items-center' onClick={() => onSelectTransferType("address")}>
          <span className='text-[40px] text-bcpayment-green-1'><MdOutlineSettingsEthernet/></span>
          <p className='text-[15px] text-black font-medium'>Đến địa chỉ</p>
        </div>
      </div>
      <div className='bg-white shadow h-[185px] mt-8 rounded-xl mx-[24px] px-4 py-4'>
        <p className='uppercase font-extrabold text-[15px] text-bcpayment-green-1'>TIỆN ÍCH</p>
      </div>
      <div className='flex max-w-full px-[24px] overflow-x-scroll gap-4  mt-10'>
				{[1, 2, 3, 4, 5].map((value) => (
					<AppAdItem key={value} />
				))}
			</div>
    </div>
  )
}

export default SelectTransferType