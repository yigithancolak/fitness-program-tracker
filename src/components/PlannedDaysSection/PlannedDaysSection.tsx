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
import { theme } from '../../styles/theme'
import { PlanType } from '../UserDatePicker/UserDatePicker'
import { PlannedExercise } from './components/PlannedExercise'

export const PlannedDaysSection = () => {
  const {
    state: { plannedDays, selectedDay },
    dispatch
  } = useContext(CalendarContext)

  const handleSelectedDay = (planId: string) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_DAY,
      payload: planId
    })
  }

  const handleDeleteDay = (planId: string) => {
    dispatch({ type: ActionTypes.DELETE_DAY, payload: planId })
  }

  return (
    <Card
      sx={{
        height: 524,
        overflow: 'auto'
      }}
    >
      <Typography
        textAlign='center'
        padding={2}
        bgcolor={theme.palette.primary.main}
        variant='body1'
      >
        Selected Days
      </Typography>
      {plannedDays &&
        plannedDays.map((plan: PlanType, index: number) => (
          <Accordion
            key={index}
            expanded={selectedDay === plan.id}
            sx={{ border: 1, borderColor: 'lightgrey' }}
          >
            <AccordionSummary
              onClick={() => handleSelectedDay(plan.id)}
              sx={{
                background:
                  selectedDay === plan.id ? theme.palette.success.light : null
              }}
            >
              <Typography display='flex' alignItems='center' width='100%'>
                {plan.date}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteDay(plan.id)
                }}
              >
                <DeleteOutline htmlColor={theme.palette.primary.dark} />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              {plan.exercises.length > 0 ? (
                plan.exercises.map((exercise, index) => (
                  <PlannedExercise
                    key={index}
                    exerciseDate={plan.date}
                    exerciseName={exercise.exerciseName}
                    repeats={exercise.repeats}
                    sets={exercise.sets}
                    exerciseId={exercise.id}
                    dayId={plan.id}
                  />
                ))
              ) : (
                <Typography color='GrayText'>
                  This section is empty please choose exercises
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Card>
  )
}
