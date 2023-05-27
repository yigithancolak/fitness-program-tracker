import { PlanType } from '../components/UserDatePicker/UserDatePicker'
import { STORAGE_HIGHLIGHTED_DAYS } from './constans'

export const getStorageDays = () => {
  const storedDays = localStorage.getItem(STORAGE_HIGHLIGHTED_DAYS)
  return storedDays ? JSON.parse(storedDays) : []
}

export const setStorageDays = (newDays: PlanType[]) => {
  localStorage.setItem(STORAGE_HIGHLIGHTED_DAYS, JSON.stringify(newDays))
}
