import { useMemo } from 'react'
import { ActivityHistory, ActivityHistoryType, Maybe } from '../generated/graphql';
import dayjs from 'dayjs'

interface AppActivityHistoryDetailProps {
  activityData: ActivityHistory
  title: string | undefined
}

const AppActivityHistoryDetail = ({ activityData, title }: AppActivityHistoryDetailProps) => {
  const activityHistoryDetailItems = useMemo<{
    name: string;
    content: Maybe<string> | undefined;
  }[]>(() => {
    const { sender, receiver, receiverAddress, targetOrder, type, amount, creationTime, targetContract, transactionHash } = activityData
    const contentItem = {
      name: 'Nội dung',
      content: title,
    }
    const timestampItem = {
      name: 'Thời gian',
      content: dayjs(creationTime).format('HH:MM DD/M/YYYY')
    }
    const transactionItem = {
      name: 'Mã giao dịch',
      content: transactionHash,
    }
    switch (type) {
      case ActivityHistoryType.TransferMoney:
        return [
          contentItem,
          {
            name: 'Người gửi',
            content: sender?.fullName
          },
          {
            name: 'Địa chỉ ví người gửi',
            content: sender?.metaMaskPublicKey
          },
          {
            name: 'Người nhận',
            content: receiver?.fullName
          },
          {
            name: 'Địa chỉ ví người nhận',
            content: receiverAddress || receiver?.metaMaskPublicKey
          },
          {
            name: 'Số tiền',
            content: `${amount} BNB`
          },
          timestampItem,
          transactionItem,
        ]
      case ActivityHistoryType.RegisterMerchant:
        return [
          contentItem,
          {
            name: 'Địa chỉ hợp đồng',
            content: targetContract?.address
          },
          timestampItem,
          transactionItem,
        ]
      default:
        return [
          contentItem,
          {
            name: 'Mã đơn hàng',
            content: targetOrder?.decentralizedId,
          },
          {
            name: 'Giá trị đơn hàng',
            content: targetOrder?.price,
          },
          {
            name: 'Đơn vị tạo đơn',
            content: targetOrder?.contract?.seller?.merchantMetaData?.companyName,
          },
          {
            name: 'Địa chỉ ví đơn vị tạo đơn',
            content: targetOrder?.contract?.seller?.metaMaskPublicKey,
          },
          {
            name: 'Người mua',
            content: targetOrder?.buyer?.fullName,
          },
          {
            name: 'Địa chỉ ví người mua',
            content: targetOrder?.buyer?.metaMaskPublicKey,
          },
          timestampItem,
          transactionItem,
        ]
    }
  }, [activityData, title])
  return (
    <>
    <p className='w-full text-center font-extrabold text-bcpayment-green-1 text-[24px]'>Chi tiết hoạt động</p>
    <div className='mt-4 flex flex-col gap-6 text-black'>
      {activityHistoryDetailItems.map(({ name, content }) => (
        <div>
        <p className='font-bold text-base'>{name}</p>
        <p className='font-medium text-base max-w-full break-words'>{content}</p>
      </div>
      ))}
    </div>
    </>
  )
}

export default AppActivityHistoryDetail