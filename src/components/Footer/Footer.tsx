import { Stack, Typography } from '@mui/material'
import { theme } from '../../styles/theme'

export const Footer = () => {
  return (
    <Stack
      bgcolor={theme.palette.primary.main}
      display='flex'
      justifyContent='center'
      marginTop={1}
      padding={1}
    >
      <Typography variant='body1' textAlign='center'>
        &copy; {new Date().getFullYear()}
        <Typography color={theme.palette.secondary.light} component='span'>
          S Fitness Tracker
        </Typography>{' '}
        All rights reserved
      </Typography>
    </Stack>
  )
}
