import { CheckCircleOutline } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { PickersDay, StaticDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import { CalendarContext } from '../../store/context'
import { ActionTypes } from '../../store/reducer/actions'
import { dateFormat } from '../../utils/constans'
import { setStorageDays } from '../../utils/localStorage'
import { CustomLayout } from './layout/CustomLayout'

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
          payload: dayjs(val).format(dateFormat)
        })
        setStorageDays([...plannedDays, dayjs(val).format(dateFormat)])
      }}
      slots={{
        layout: CustomLayout,
        day: (props) => {
          const isSelected =
            !props.outsideCurrentMonth &&
            plannedDays.includes(props.day.format(dateFormat))

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
