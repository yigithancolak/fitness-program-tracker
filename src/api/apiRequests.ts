import axios from 'axios'
import { fitnesApiKey } from '../utils/envVariables'

export const getExercises = (muscle: string) => {
  axios
    .get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
      headers: { 'X-Api-Key': fitnesApiKey }
    })
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.error('Error: ', error)
    })
}
