import {
  DateView,
  PickersLayoutContentWrapper,
  PickersLayoutProps,
  PickersLayoutRoot,
  pickersCalendarHeaderClasses,
  pickersLayoutClasses,
  usePickerLayout
} from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'

export const CustomLayout = (
  props: PickersLayoutProps<Dayjs | null, Dayjs, DateView>
) => {
  const { toolbar, tabs, content, actionBar, shortcuts } =
    usePickerLayout(props)

  return (
    <PickersLayoutRoot
      ownerState={props}
      sx={{
        display: 'grid',
        [`.${pickersLayoutClasses.actionBar}`]: {
          bgcolor: 'coral',
          gridRow: 3,
          borderRadius: '0 0 10px 10px'
        },
        [`.${pickersLayoutClasses.toolbar}`]: {
          bgcolor: 'coral',
          gridRow: 1
        },
        [`.${pickersLayoutClasses.contentWrapper}`]: {
          gridRow: 2,
          bgcolor: 'gainsboro',
          [`.${pickersCalendarHeaderClasses.root}`]: {
            bgcolor: 'coral',
            fontSize: 20,
            padding: 1
          }
        }
      }}
    >
      {toolbar}

      <PickersLayoutContentWrapper
        className={pickersLayoutClasses.contentWrapper}
      >
        {tabs}
        {content}
      </PickersLayoutContentWrapper>
      {actionBar}
    </PickersLayoutRoot>
  )
}
