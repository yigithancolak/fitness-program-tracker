import { STORAGE_HIGHLIGHTED_DAYS } from './constans'

export const getStorageDays = () => {
  const storedDays = localStorage.getItem(STORAGE_HIGHLIGHTED_DAYS)
  return storedDays ? JSON.parse(storedDays) : []
}

export const setStorageDays = (newDays: string[]) => {
  localStorage.setItem(STORAGE_HIGHLIGHTED_DAYS, JSON.stringify(newDays))
}
