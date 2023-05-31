import { Stack, Typography } from '@mui/material'
import { Logo } from '../../assets/Logo'
import { theme } from '../../styles/theme'

export const Header = () => {
  return (
    <Stack
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='row'
      bgcolor={theme.palette.secondary.light}
      marginBottom={2}
      paddingY={1}
    >
      <Logo />
      <Typography
        textAlign='center'
        color={theme.palette.primary.main}
        variant='h1'
      >
        Fitness Program Tracker
      </Typography>
    </Stack>
  )
}
