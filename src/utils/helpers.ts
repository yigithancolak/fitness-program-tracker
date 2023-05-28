type Exercise = {
  date: string
  exercises: any[] // Replace "any" with the actual type of your exercises if you have one
}

export const sortPlanByDate = (plan: Exercise[]): Exercise[] => {
  return plan.sort((a, b) => {
    const datePartsA = a.date.split('/')
    const dateA = new Date(+datePartsA[2], +datePartsA[1] - 1, +datePartsA[0])

    const datePartsB = b.date.split('/')
    const dateB = new Date(+datePartsB[2], +datePartsB[1] - 1, +datePartsB[0])

    return dateA.getTime() - dateB.getTime()
  })
}
