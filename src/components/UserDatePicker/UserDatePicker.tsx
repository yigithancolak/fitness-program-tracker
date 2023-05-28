import { CheckCircleOutline } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { PickersDay, StaticDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
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
  id: string
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
        dispatch({
          type: ActionTypes.ADD_DAY,
          payload: {
            id: uuidv4(),
            date: dayjs(val).format(dateFormat),
            exercises: []
          }
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
