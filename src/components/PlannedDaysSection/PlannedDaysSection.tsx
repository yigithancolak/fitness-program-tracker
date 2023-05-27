import { Card, Typography } from '@mui/material'
import { useContext } from 'react'
import { CalendarContext } from '../../store/context'
import { ActionTypes } from '../../store/reducer/actions'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '../../styles/sharedStyles'
import { PlanType } from '../UserDatePicker/UserDatePicker'

export const PlannedDaysSection = () => {
  const {
    state: { plannedDays, selectedDay },
    dispatch
  } = useContext(CalendarContext)
  return (
    <Card sx={{ height: '100%' }}>
      <Typography>Selected Days</Typography>
      {plannedDays &&
        plannedDays.map((plan: PlanType, index: number) => (
          <Accordion
            key={plan.date}
            expanded={selectedDay === plan.date}
            onClick={() =>
              dispatch({
                type: ActionTypes.SET_SELECTED_DAY,
                payload: plan.date
              })
            }
          >
            <AccordionSummary
              sx={{ bgcolor: selectedDay === plan.date ? 'green' : null }}
            >
              {plan.date}
            </AccordionSummary>
            <AccordionDetails>Hey</AccordionDetails>
          </Accordion>
        ))}
    </Card>
  )
}
