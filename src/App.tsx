import { CssBaseline, Unstable_Grid2 as Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import './App.css'
import { ExercisesSection } from './components/ExercisesSection/ExercisesSection'
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
            <ExercisesSection />
          </Grid>
        </Grid>
      </CalendarProvider>
    </>
  )
}
