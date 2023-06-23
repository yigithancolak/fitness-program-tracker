import dayjs from 'dayjs'
import { PlanType } from '../components/UserDatePicker/UserDatePicker'
import { dateFormat } from './constans'

export const sortPlanByDate = (plan: PlanType[]): PlanType[] => {
  return plan.sort((a, b) => {
    const dateA = dayjs(a.date, dateFormat)
    const dateB = dayjs(b.date, dateFormat)

    return dateA.isAfter(dateB) ? 1 : -1
  })
}

export const textChanger = (text: string | undefined) => {
  if (text) {
    return text.replace('_', ' ')
  }
}

// export const isDayAddedBefore = (plannedDays: PlanType[], newDate: string) => {
//   const addedDate = dayjs(newDate).format(dateFormat)
//   return plannedDays.some((plan) => plan.date === addedDate)
// }
