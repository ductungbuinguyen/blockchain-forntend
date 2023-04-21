import { useMemo } from 'react'
import { ActivityHistory, ActivityHistoryType } from '../generated/graphql'
import { useAuthContext } from '../contexts/AuthContext'
import { IoMdSend } from 'react-icons/io'
import { GiConfirmed, GiReceiveMoney } from 'react-icons/gi'
import { MdLocalShipping, MdPaid, MdStore } from 'react-icons/md'
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { BsBagCheckFill } from 'react-icons/bs'
import { FaCalendarTimes } from 'react-icons/fa'
import { useAppModal } from '../contexts/AppModalContext'
import AppActivityHistoryDetail from './AppActivityHistoryDetail'

interface HistoryActivityBriefItemProps {
  activityData: ActivityHistory
}

const HistoryActivityBriefItem = ({ activityData }: HistoryActivityBriefItemProps) => {
  const { userId } = useAuthContext()
  const { open } = useAppModal()
  const { content, icon } = useMemo(() => {
    const { sender, receiver, receiverAddress , targetOrder, type } = activityData
    const isBuyerOrder = userId === targetOrder?.buyer?.id
    const sellerCompanyName = targetOrder?.contract?.seller?.merchantMetaData?.companyName
    const buyerFullName = targetOrder?.buyer?.fullName
    const orderName = targetOrder?.name
    let content, icon = null
    switch(type) {
      case ActivityHistoryType.TransferMoney:
        if(userId === sender?.id) {
          content = `Chuyển tiền đến ${receiverAddress ? receiverAddress : receiver?.fullName}`
          icon = <IoMdSend color='#F5555F'/>
        } else {
          content = `Nhận tiền từ ${sender?.fullName}`
          icon = <GiReceiveMoney color='#176980'/>
        }
        break;
      case ActivityHistoryType.RegisterMerchant:
        content = 'đăng kí trở thành nhà bán hàng'
        icon = <MdStore color='#176980'/>
        break;
      case ActivityHistoryType.CreateOrder:
        icon = <RiShoppingBag3Fill color='#176980'/>
        content = `${isBuyerOrder ? sellerCompanyName : ''} tạo đơn hàng ${orderName}`
        break;
      case ActivityHistoryType.PayOrder:
        icon = <MdPaid color='#176980'/>
        content = `${!isBuyerOrder ? buyerFullName : ''} thanh toán đơn hàng ${orderName}`
        break;
      case ActivityHistoryType.ShipOrder:
        icon = <MdLocalShipping color='#176980'/>
        content = `${isBuyerOrder ? sellerCompanyName : ''} đang vận chuyển đơn hàng ${orderName}`
        break;
      case ActivityHistoryType.BuyerConfirmOrderShipped:
        icon = <GiConfirmed color='#176980'/>
        content = `${!isBuyerOrder ? buyerFullName : ''} xác nhận đã vận chuyển đơn hàng ${orderName}`
        break;
      case ActivityHistoryType.SellerConfirmOrderShipped:
        icon = <GiConfirmed color='#176980'/>
        content = `${isBuyerOrder ? sellerCompanyName : ''} xác nhận đã vận chuyển đơn hàng ${orderName}`
        break;
      case ActivityHistoryType.OrderCompleted:
        icon = <BsBagCheckFill color='#176980'/>
        content = `đơn hàng ${orderName} đã hoàn thành`
        break;
      case ActivityHistoryType.TimeOutOrder:
        icon = <FaCalendarTimes color='#F5555F'/>
        content = `${!isBuyerOrder ? buyerFullName : ''} đã hủy đơn hàng ${orderName} vì trễ hạn`
    }
    return {
      content,
      icon,
    }
  }, [activityData])
  return (
    <div onClick={() => open(<AppActivityHistoryDetail activityData={activityData} title={content} />)} className='flex gap-2 p-3 items-center bg-bcpayment-green-4 rounded-xl'>
      <span className='text-[20px]'>{icon}</span>
      <p className='font-bold text-[11px] text-black'>{content}</p>
    </div>
  )
}

export default HistoryActivityBriefItem