import { PlanType } from '../components/UserDatePicker/UserDatePicker'

export const sortPlanByDate = (plan: PlanType[]): PlanType[] => {
  return plan.sort((a, b) => {
    const datePartsA = a.date.split('/')
    const dateA = new Date(+datePartsA[2], +datePartsA[1] - 1, +datePartsA[0])

    const datePartsB = b.date.split('/')
    const dateB = new Date(+datePartsB[2], +datePartsB[1] - 1, +datePartsB[0])

    return dateA.getTime() - dateB.getTime()
  })
}

export const buttonTextChanger = (text: string) => {
  return text.replace('_', ' ')
}
