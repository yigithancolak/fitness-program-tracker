import { CheckCircleOutline } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { PickersDay, StaticDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import { CalendarContext } from '../../store/context'
import { ActionTypes } from '../../store/reducer/actions'
import { dateFormat } from '../../utils/constans'
import { ActionList, CustomLayout } from './layout/CustomLayout'

export type ExerciseDetails = {
  exerciseName: string
  sets: string
  repeats: string
}

export interface PlanType {
  date: string
  exercises: ExerciseDetails[] | []
}

export const UserDatePicker = () => {
  const {
    state: { plannedDays },
    dispatch
  } = useContext(CalendarContext)
  const [value, setValue] = useState<Date | null>(new Date())

  return (
    <StaticDatePicker
      openTo='day'
      defaultValue={dayjs(new Date())}
      value={dayjs(value)}
      disablePast
      orientation='portrait'
      onChange={(newValue: any) => {
        setValue(newValue as any)
      }}
      onAccept={(val: any) => {
        const newPlan = {
          date: dayjs(val).format(dateFormat),
          exercises: []
        } as PlanType
        dispatch({
          type: ActionTypes.ADD_DAY,
          payload: newPlan
        })
      }}
      slots={{
        layout: CustomLayout,
        actionBar: ActionList,
        day: (props) => {
          const isSelected =
            !props.outsideCurrentMonth &&
            plannedDays.some(
              (plan) => plan.date === dayjs(props.day).format(dateFormat)
            )

          return (
            <Badge
              key={props.day.toString()}
              overlap='circular'
              badgeContent={
                isSelected ? (
                  <CheckCircleOutline
                    sx={{ width: 15, height: 15 }}
                    htmlColor='green'
                  />
                ) : null
              }
            >
              <PickersDay {...props} />
            </Badge>
          )
        }
      }}
    />
  )
}
