import {
  CssBaseline,
  Unstable_Grid2 as Grid,
  ThemeProvider
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { AppToastContainer } from './components/AppToastContainer/AppToastContainer'
import { ExercisesSection } from './components/ExercisesSection/ExercisesSection'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { PlannedDaysSection } from './components/PlannedDaysSection/PlannedDaysSection'
import { UserDatePicker } from './components/UserDatePicker/UserDatePicker'
import { CalendarProvider } from './store/context'
import { theme } from './styles/theme'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <CalendarProvider>
          <Grid container>
            <AppToastContainer />
            {/* LOGO */}
            <Grid xs={12} md={12}>
              <Header />
            </Grid>
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

            <Grid xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </CalendarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
