import {
  Card,
  CssBaseline,
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import './App.css'
import { PlannedDaysSection } from './components/PlannedDaysSection/PlannedDaysSection'
import { UserDatePicker } from './components/UserDatePicker/UserDatePicker'
import { CalendarProvider } from './store/context'

export const App = () => {
  return (
    <>
      <CssBaseline />
      <CalendarProvider>
        <Grid container>
          {/* DATE PICKER */}
          <Grid xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <UserDatePicker />
            </LocalizationProvider>
          </Grid>
          {/* PLANNED DAYS SECTION */}
          <Grid xs={12} md={4}>
            <PlannedDaysSection />
          </Grid>
          {/* THIRD PART */}
          <Grid xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <Typography textAlign='center'>Third Part</Typography>
            </Card>
          </Grid>
        </Grid>
      </CalendarProvider>
    </>
  )
}
