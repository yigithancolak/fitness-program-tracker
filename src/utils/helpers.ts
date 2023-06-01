import dayjs from 'dayjs'
import { DateType, PlanType } from '../components/UserDatePicker/UserDatePicker'
import { dateFormat } from './constans'

export const sortPlanByDate = (plan: PlanType[]): PlanType[] => {
  return plan.sort((a, b) => {
    const datePartsA = a.date.split('/')
    const dateA = new Date(+datePartsA[2], +datePartsA[1] - 1, +datePartsA[0])

    const datePartsB = b.date.split('/')
    const dateB = new Date(+datePartsB[2], +datePartsB[1] - 1, +datePartsB[0])

    return dateA.getTime() - dateB.getTime()
  })
}

export const textChanger = (text: string | undefined) => {
  if (text) {
    return text.replace('_', ' ')
  }
}

export const isDayAddedBefore = (
  plannedDays: PlanType[],
  newDate: DateType
) => {
  const addedDate = dayjs(newDate).format(dateFormat)
  return plannedDays.some((plan) => plan.date === addedDate)
}
