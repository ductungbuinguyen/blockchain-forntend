import { useMemo } from "react"
import { useUserQuery } from "../generated/graphql"
import dayjs from "dayjs"

export const useGetActivityHistories = () => {
  const { data } = useUserQuery()
  const { activityHistoriesAsReceiver, activityHistoriesAsSender, ordersAsBuyer, contract } = data?.user ?? {}
  const activityHistories = useMemo(() => {
    const receiverHistories = activityHistoriesAsReceiver?.map(activityHistory => ({
      ...activityHistory,
      receiver: data?.user,
    })) ?? []
    const senderHistories = activityHistoriesAsSender?.map(activityHistory => ({
      ...activityHistory,
      sender: data?.user,
    })) ?? []
    const orderAsBuyerHistories = ordersAsBuyer?.map(order => order?.activityHistories?.map(activityHistory => ({
      ...activityHistory,
      targetOrder: order
    })) ?? []).flat() ?? []
    const orderAsSellerHistories = contract?.orders?.map(order => order?.activityHistories?.map(activityHistory => ({
      ...activityHistory,
      targetOrder: order
    })) ?? []).flat() ?? []
    const contractHistories = contract?.activityHistory ? [{
      ...contract?.activityHistory,
      targetContent: contract
    }] : []
    return [
      ...contractHistories,
      ...receiverHistories,
      ...senderHistories,
      ...orderAsSellerHistories,
      ...orderAsBuyerHistories,
    ].sort((a, b) => dayjs(b?.creationTime).valueOf() - dayjs(a?.creationTime).valueOf())
    .reduce((group: {
      timeString: string,
      activities: any[]
    }[], value) => {
      const { creationTime } = value ?? {}
      const time = dayjs(creationTime)
      const timeString = `Tháng ${time.month()}/${time.year()}`
      const lastGroupItem = group[group.length - 1]
      if(lastGroupItem?.timeString === timeString) {
        const newLastGroupItem = {
          timeString,
          activities: [
            ...lastGroupItem.activities,
            value
          ]
        }
        group[group.length - 1] = newLastGroupItem
      } else {
        group[group.length] = {
          timeString,
          activities: [value]
        }
      }
      return group;
    }, [])
  }, [activityHistoriesAsReceiver, activityHistoriesAsSender, ordersAsBuyer, contract])
  return activityHistories
}