import React from 'react'
import { User, useUsersQuery } from '../../generated/graphql'
import AppHeaderWrapper from '../AppHeaderWrapper'
import { SlArrowLeft } from 'react-icons/sl'

interface ConfirmTransactionProps {
  userId: User["id"]
  amount: number
  note: string
  onBackButtonClick: () => void
}

const ConfirmTransaction = ({
  amount,
  note,
  onBackButtonClick,
  userId
}: ConfirmTransactionProps) => {
  const { data } = useUsersQuery();
	const user = data?.users?.find((user) => user?.id === userId) as User;
  const { fullName, email, metaMaskPublicKey, phoneNumber } = user
  return (
    <div className='relative w-full h-screen bg-bcpayment-green-4'>
      <AppHeaderWrapper bottomOffset={20}>
      <div className='relative flex items-center justify-center py-8 text-white'>
          <SlArrowLeft className='text-[20px] absolute left-0 top-1/2 -translate-y-1/2' onClick={onBackButtonClick}/>
        </div>
      </AppHeaderWrapper>
      <div className='py-6 bg-white mx-[24px] rounded-xl px-[30px] flex justify-between shadow text-[15px]'>
        <p className='font-bold uppercase text-bcpayment-green-1'>CHI TIẾT GIAO DỊCH</p>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-bcpayment-gray-1'>Chuyển đến</p>
          <p className='font-medium text-black'></p>
        </div>
      </div>
    </div>
  )
}

export default ConfirmTransaction