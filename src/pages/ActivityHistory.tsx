import { SlArrowLeft } from 'react-icons/sl';
import AppHeaderWrapper from '../components/AppHeaderWrapper';
import { useNavigate } from 'react-router-dom';
import { useGetActivityHistories } from '../hooks/useGetActivityHistories';
import HistoryActivityBriefItem from '../components/HistoryActivityBriefItem';

const ActivityHistory = () => {
  const navigate = useNavigate();
  const activityHistories = useGetActivityHistories()
  return (
    <div className='relative w-full h-screen bg-bcpayment-green-4 overflow-clip'>
      <AppHeaderWrapper bottomOffset={30}>
				<div className='relative flex items-center justify-center py-8 text-white'>
					<SlArrowLeft
						className='text-[20px] absolute left-0 top-1/2 -translate-y-1/2'
						onClick={() => navigate('/')}
					/>
					<p className='font-bold text-[24px]'>Lịch sử hoạt động</p>
				</div>
			</AppHeaderWrapper>
      <div className='relative w-full px-[20px] h-[calc(100%-120px)]'>
				<div className='bg-white rounded-t-xl px-[15px] shadow w-full h-full'>
					<div className='flex flex-col h-full gap-6 pt-8 mb-8 overflow-x-visible overflow-y-scroll max-h-[calc(100%-20px)]'>
            {activityHistories.map(({timeString, activities}) => (
                <div key={timeString}>
                  <p className='font-extrabold uppercase text-bcpayment-green-1 text-[15px]'>{timeString}</p>
                  <div className='flex flex-col gap-6 mt-4'>
                  {activities.map((value) => <HistoryActivityBriefItem key={value?.id} activityData={value ?? {}}/>)}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityHistory