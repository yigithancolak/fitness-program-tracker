import { Card, Typography } from '@mui/material'
import { useContext } from 'react'
import { CalendarContext } from '../../store/context'

export const PlannedDaysSection = () => {
  const {
    state: { plannedDays }
  } = useContext(CalendarContext)
  return (
    <Card sx={{ height: '100%' }}>
      <Typography>Selected Days</Typography>
      {plannedDays &&
        plannedDays.map((date: string, index: number) => (
          <Typography key={index}>{date}</Typography>
        ))}
    </Card>
  )
}
