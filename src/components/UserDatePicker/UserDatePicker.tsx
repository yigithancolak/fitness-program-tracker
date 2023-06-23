import { CheckCircleOutline } from '@mui/icons-material'
import { Badge, Button } from '@mui/material'
import {
  DatePicker,
  LocalizationProvider,
  PickersDay
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

export type ExerciseDetails = {
  id: string
  exerciseName: string
  sets: string
  repeats: string
}

export interface PlanType {
  id: string
  date: string
  exercises: ExerciseDetails[]
}

export const UserDatePicker = () => {
  const {
    state: { plannedDays },
    dispatch
  } = useContext(CalendarContext)

  const [selection, setSelection] = useState(dayjs(new Date()))

  const handleAddDay = (day: Dayjs) => {
    // if (isDayAddedBefore(plannedDays, day)) {
    //   toast.error('Day has added before')
    //   return
    // }

    if (!dayjs(day).isValid()) {
      toast.error('Choose a day from date picker')
      return
    }

    dispatch({
      type: ActionTypes.ADD_DAY,
      payload: {
        id: uuidv4(),
        date: dayjs(day).format(dateFormat),
        exercises: []
      }
    })
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          openTo='day'
          value={selection}
          disablePast
          onChange={(value) => {
            if (value) setSelection(value)
          }}
          slots={{
            // layout: CustomLayout,
            // actionBar: ActionList,
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
                    isSelected && (
                      <CheckCircleOutline
                        sx={{ width: 15, height: 15 }}
                        htmlColor={theme.palette.success.dark}
                      />
                    )
                  }
                >
                  <PickersDay {...props} />
                </Badge>
              )
            }
          }}
        />
      </LocalizationProvider>
      <Button
        variant='contained'
        sx={{ height: '100%' }}
        onClick={() => handleAddDay(selection)}
      >
        Select
      </Button>
    </>
  )
}
