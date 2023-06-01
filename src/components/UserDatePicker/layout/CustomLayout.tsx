import { Box, Button } from '@mui/material'
import {
  DateView,
  PickersActionBarProps,
  PickersLayoutContentWrapper,
  PickersLayoutProps,
  PickersLayoutRoot,
  pickersCalendarHeaderClasses,
  pickersLayoutClasses,
  usePickerLayout
} from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { theme } from '../../../styles/theme'

export const ActionList = (props: PickersActionBarProps) => {
  const { onAccept } = props
  const actions = [
    // { text: 'Clear', method: onClear },
    // { text: 'Delete', method: onCancel },
    { text: 'Add', method: onAccept }
  ]
  return (
    <Box
      display='flex'
      padding={2}
      bgcolor={theme.palette.primary.main}
      justifyContent='flex-end'
      gap={1}
    >
      {actions.map(({ text, method }) => (
        <Button key={text} variant='contained' onClick={method} color='success'>
          {text}
        </Button>
      ))}
    </Box>
  )
}

export const CustomLayout = (
  props: PickersLayoutProps<Dayjs | null, Dayjs, DateView>
) => {
  const { toolbar, tabs, content, actionBar } = usePickerLayout(props)

  return (
    <PickersLayoutRoot
      ownerState={props}
      sx={{
        display: 'grid',
        [`.${pickersLayoutClasses.actionBar}`]: {
          bgcolor: theme.palette.primary.main,
          gridRow: 3,
          borderRadius: '0 0 10px 10px'
        },
        [`.${pickersLayoutClasses.toolbar}`]: {
          bgcolor: theme.palette.primary.main,
          gridRow: 1
        },
        [`.${pickersLayoutClasses.contentWrapper}`]: {
          gridRow: 2,
          bgcolor: theme.palette.secondary.light,
          [`.${pickersCalendarHeaderClasses.root}`]: {
            bgcolor: theme.palette.primary.main,
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
        {actionBar}
      </PickersLayoutContentWrapper>
    </PickersLayoutRoot>
  )
}
