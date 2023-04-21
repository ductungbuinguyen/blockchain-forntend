import { Order, useUserQuery } from '../generated/graphql';
import dayjs from 'dayjs';

interface AppOrderDetailProps {
	orderId: Order['id'];
}

const AppOrderDetail = ({ orderId }: AppOrderDetailProps) => {
  const { data } = useUserQuery()
  const { ordersAsBuyer } = data?.user ?? {}
  const { name, contract, price, creationTime, status } = ordersAsBuyer?.find(order => order?.id === orderId) ?? {}
  const { email, fullName, phoneNumber } = contract?.seller ?? {}
	return (
    <>
      <p className='w-full text-center font-extrabold text-bcpayment-green-1 text-[24px]'>Chi tiết đơn hàng</p>
      <div className='mt-4 flex flex-col gap-6 text-black'>
        <div>
          <p className='font-bold text-base'>Tên đơn hàng</p>
          <p className='font-medium text-base'>{name || "Apple MacBook Pro 13 Touch Bar M1 256GB 2020"}</p>
        </div>
        <div>
          <p className='font-bold text-base'>Người mua</p>
          <p className='font-medium text-base'>{fullName || 'Phạm Nguyễn Khánh Chi'}</p>
        </div>
        <div>
          <p className='font-bold text-base'>Gmail</p>
          <p className='font-medium text-base'>{email || "tom@tom.com"}</p>
        </div>
        <div>
          <p className='font-bold text-base'>SDT</p>
          <p className='font-medium text-base'>{phoneNumber || "0987654321"}</p>
        </div>
        <div>
          <p className='font-bold text-base'>Giá</p>
          <p className='font-medium text-base'>{`${price || "3.5"} BNB`}</p>
        </div>
        <div>
          <p className='font-bold text-base'>Ngày khởi tạo đơn</p>
          <p className='font-medium text-base'>{dayjs(creationTime).format('DD/M/YYYY')}</p>
        </div>
        <div>
          <p className='font-bold text-base'>Trạng thái đơn hàng</p>
          <p className='font-medium text-base'>{status || "Đang vận chuyển"}</p>
        </div>
      </div>
    </>
  )
};

export default AppOrderDetail;
