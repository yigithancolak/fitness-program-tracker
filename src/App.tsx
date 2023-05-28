import { CssBaseline, Unstable_Grid2 as Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { AppToastContainer } from './components/AppToastContainer/AppToastContainer'
import { ExercisesSection } from './components/ExercisesSection/ExercisesSection'
import { PlannedDaysSection } from './components/PlannedDaysSection/PlannedDaysSection'
import { UserDatePicker } from './components/UserDatePicker/UserDatePicker'
import { CalendarProvider } from './store/context'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <CalendarProvider>
        <AppToastContainer />
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
    </QueryClientProvider>
  )
}
