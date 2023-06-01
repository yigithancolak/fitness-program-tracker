import { CheckCircleOutline } from '@mui/icons-material'
import { Badge, Card } from '@mui/material'
import {
  LocalizationProvider,
  PickersDay,
  StaticDatePicker
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { CalendarContext } from '../../store/context'
import { ActionTypes } from '../../store/reducer/actions'
import { theme } from '../../styles/theme'
import { dateFormat } from '../../utils/constans'
import { isDayAddedBefore } from '../../utils/helpers'
import { ActionList, CustomLayout } from './layout/CustomLayout'

export type ExerciseDetails = {
  id: string
  exerciseName: string
  sets: string
  repeats: string
}

export interface PlanType {
  id: string
  date: string
  exercises: ExerciseDetails[] | []
}

export type DateType = Date | null | Dayjs

export const UserDatePicker = () => {
  const {
    state: { plannedDays },
    dispatch
  } = useContext(CalendarContext)
  const [value, setValue] = useState<DateType>(new Date())

  const handleAddDay = (val: DateType) => {
    if (isDayAddedBefore(plannedDays, val)) {
      toast.error('Day has added before')
      return
    }

    dispatch({
      type: ActionTypes.ADD_DAY,
      payload: {
        id: uuidv4(),
        date: dayjs(val).format(dateFormat),
        exercises: []
      }
    })
  }

  return (
    <Card>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          openTo='day'
          defaultValue={dayjs(value)}
          disablePast
          orientation='portrait'
          onChange={(newValue: DateType) => {
            setValue(newValue)
          }}
          onAccept={(val: DateType) => handleAddDay(val)}
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
                        htmlColor={theme.palette.success.dark}
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
      </LocalizationProvider>
    </Card>
  )
}
