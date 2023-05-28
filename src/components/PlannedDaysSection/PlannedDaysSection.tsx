import { DeleteOutline } from '@mui/icons-material'
import { Card, IconButton, Typography } from '@mui/material'
import { useContext } from 'react'
import { CalendarContext } from '../../store/context'
import { ActionTypes } from '../../store/reducer/actions'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '../../styles/sharedStyles'
import { PlanType } from '../UserDatePicker/UserDatePicker'
import { PlannedExercise } from './components/PlannedExercise'

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
          <Accordion key={plan.date} expanded={selectedDay === plan.date}>
            <AccordionSummary
              onClick={() =>
                dispatch({
                  type: ActionTypes.SET_SELECTED_DAY,
                  payload: plan.date
                })
              }
              sx={{
                background:
                  selectedDay === plan.date
                    ? 'linear-gradient(90deg, rgba(76,214,25,0.333858543417367) 1%, rgba(90,253,29,0.47111344537815125) 50%, rgba(193,252,69,0.1657913165266106) 100%)'
                    : null
              }}
            >
              <Typography display='flex' alignItems='center' width='100%'>
                {plan.date}
              </Typography>
              <IconButton
                onClick={() =>
                  dispatch({ type: ActionTypes.DELETE_DAY, payload: plan.date })
                }
              >
                <DeleteOutline />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              {plan.exercises.map((exercise, index) => (
                <PlannedExercise
                  key={index}
                  exerciseDate={plan.date}
                  exerciseName={exercise.exerciseName}
                  repeats={exercise.repeats}
                  sets={exercise.sets}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
    </Card>
  )
}
